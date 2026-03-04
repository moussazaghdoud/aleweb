#!/usr/bin/env node
/**
 * Rainbow S2S Worker — standalone Node.js process (NOT bundled by Next.js).
 *
 * Connects to Rainbow via the official SDK in S2S mode, registers our
 * webhook callback URL, and handles bubble + chat operations.
 *
 * Communication with Next.js:
 * - stdin:  JSON commands (create_bubble, send_message, invite_agents, close_bubble)
 * - stdout: JSON responses and status logs
 * - HTTP POST to webhook: forwards incoming agent messages to Next.js
 *
 * IMPORTANT: In S2S mode, sdk.im.sendMessageToBubbleJid() is XMPP-only
 * and does NOT work. We must use:
 *   1. sdk.conversations.openConversationForBubble(bubble) → get conversation
 *   2. sdk.s2s.sendMessageInConversation(conversation.dbId, msg) → send via REST
 */

const LOG = "[RainbowS2S]";

// ── Config from env ──────────────────────────────────────
const APP_ID = process.env.RAINBOW_APP_ID;
const APP_SECRET = process.env.RAINBOW_APP_SECRET;
const HOST_CALLBACK = process.env.RAINBOW_HOST_CALLBACK;
const LOGIN = process.env.RAINBOW_BOT_LOGIN;
const PASSWORD = process.env.RAINBOW_BOT_PASSWORD;
const HOST = process.env.RAINBOW_HOST || "official";
const WEBHOOK_URL = `http://localhost:${process.env.PORT || 3000}/api/chat/rainbow-webhook`;

if (!APP_ID || !APP_SECRET || !HOST_CALLBACK || !LOGIN || !PASSWORD) {
  console.log(`${LOG} Missing Rainbow env vars — worker disabled`);
  process.exit(0);
}

let sdk = null;
let botUserId = null;
let s2sConnectionId = null; // S2S connection ID for direct REST API calls
let authToken = null;       // Auth token for direct REST API calls
let rainbowHost = null;     // Rainbow API host

// In-memory stores for bubble objects and their conversation dbIds
const bubbleCache = new Map();       // bubbleId → bubble object
const conversationCache = new Map(); // bubbleId → conversation.dbId

// ── Dummy Express engine ─────────────────────────────────
// The SDK tries to create a local Express server for S2S callbacks,
// but we handle callbacks via our own Next.js route. Passing a no-op
// Express app avoids the path-to-regexp v8 incompatibility.
function createNoopExpress() {
  const noop = () => noop;
  const app = function () {};
  app.use = noop;
  app.get = noop;
  app.post = noop;
  app.put = noop;
  app.delete = noop;
  app.all = noop;
  app.listen = (port, cb) => { if (cb) cb(); return { close: noop }; };
  app.set = noop;
  app.engine = noop;
  return app;
}

// ── Extract SDK internals after connection ────────────────
function extractSdkInfo() {
  try {
    // Try common paths in rainbow-node-sdk internals
    s2sConnectionId = sdk._core?._s2s?._connectionId
      || sdk._core?.s2s?.connectionId
      || sdk.s2s?._connectionId
      || sdk.s2s?.connectionId
      || null;
    authToken = sdk._core?._rest?.token
      || sdk._core?.token
      || null;
    rainbowHost = sdk._core?._rest?.host
      || sdk._core?.host
      || "openrainbow.com";
    console.log(`${LOG} S2S info: cnxId=${s2sConnectionId || "NOT FOUND"}, token=${authToken ? "OK" : "NOT FOUND"}, host=${rainbowHost}`);
  } catch (err) {
    console.warn(`${LOG} Could not extract SDK internals:`, err.message);
  }
}

// ── Direct REST: Create S2S conversation for a room ───────
async function createS2SConversation(bubbleId) {
  if (!s2sConnectionId || !authToken) {
    console.warn(`${LOG} Cannot create S2S conversation — missing cnxId or token`);
    return null;
  }
  try {
    const url = `https://${rainbowHost}/api/rainbow/ucs/v1.0/connections/${s2sConnectionId}/conversations`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conversation: { peerId: bubbleId } }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn(`${LOG} createS2SConversation failed (${resp.status}):`, text.slice(0, 200));
      return null;
    }
    const data = await resp.json();
    const cvId = data?.data?.id || data?.id;
    console.log(`${LOG} Created S2S conversation for bubble ${bubbleId}: cvId=${cvId}`);
    return cvId;
  } catch (err) {
    console.warn(`${LOG} createS2SConversation error:`, err.message);
    return null;
  }
}

// ── Direct REST: Add user to room with auto-accept ────────
async function addUserToRoom(roomId, userId) {
  if (!authToken) return false;
  try {
    const url = `https://${rainbowHost}/api/rainbow/enduser/v1.0/rooms/${roomId}/users`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, status: "accepted", privilege: "user" }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      console.warn(`${LOG} addUserToRoom failed (${resp.status}):`, text.slice(0, 200));
      return false;
    }
    console.log(`${LOG} Added user ${userId} to room ${roomId} with auto-accept`);
    return true;
  } catch (err) {
    console.warn(`${LOG} addUserToRoom error:`, err.message);
    return false;
  }
}

// ── Forward message to Next.js webhook ───────────────────
async function forwardToWebhook(eventData) {
  try {
    const resp = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    console.log(`${LOG} Forwarded message to webhook → ${resp.status}`);
  } catch (err) {
    console.error(`${LOG} Failed to forward to webhook:`, err.message);
  }
}

// ── Get or create conversation object for a bubble ───────
async function getConversation(bubbleId) {
  // Check cache first
  if (conversationCache.has(bubbleId)) {
    const cached = conversationCache.get(bubbleId);
    // If cached but still missing dbId, poll again briefly
    if (!cached.dbId) {
      for (let i = 0; i < 6; i++) {
        await new Promise(r => setTimeout(r, 500));
        if (cached.dbId) break;
      }
    }
    return cached;
  }

  const bubble = bubbleCache.get(bubbleId);
  if (!bubble) {
    console.warn(`${LOG} No cached bubble object for ${bubbleId}`);
    return null;
  }

  try {
    const conversation = await sdk.conversations.openConversationForBubble(bubble);

    // dbId may not be set immediately — poll for up to 5 seconds
    if (!conversation.dbId) {
      console.log(`${LOG} Waiting for conversation.dbId...`);
      for (let i = 0; i < 10; i++) {
        await new Promise(r => setTimeout(r, 500));
        if (conversation.dbId) {
          console.log(`${LOG} dbId ready after ${(i + 1) * 500}ms: ${conversation.dbId}`);
          break;
        }
      }
    }

    console.log(`${LOG} Conversation for bubble ${bubbleId}: id=${conversation.id}, dbId=${conversation.dbId || "(not set after 5s)"}`);
    conversationCache.set(bubbleId, conversation);
    return conversation;
  } catch (err) {
    console.error(`${LOG} Failed to open conversation for bubble ${bubbleId}:`, err.message || err);
    return null;
  }
}

// ── Handle incoming message ──────────────────────────────
function handleMessage(msg) {
  const content = msg.content || msg.data || "";
  if (!content.trim()) return;

  // Echo prevention
  if (content.startsWith("[Visitor]:")) return;
  if (content.startsWith("--- Conversation history ---")) return;

  // Skip bot's own messages
  const fromId = msg.fromUserId || (msg.from && msg.from.id) || "";
  if (fromId && fromId === botUserId) return;

  const bubbleJid = msg.fromBubbleJid || "";
  const bubbleId = msg.fromBubbleId || "";
  if (!bubbleJid && !bubbleId) return; // Not a bubble message

  console.log(`${LOG} Agent message in bubble ${bubbleJid || bubbleId}: ${content.slice(0, 80)}`);

  forwardToWebhook({
    type: "message",
    data: {
      body: content,
      roomJid: bubbleJid,
      roomId: bubbleId,
      fromUserId: fromId,
    },
  });
}

// ── Handle stdin commands from Next.js ───────────────────
let stdinBuffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  stdinBuffer += chunk;
  const lines = stdinBuffer.split("\n");
  stdinBuffer = lines.pop() || "";

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const cmd = JSON.parse(line);
      handleCommand(cmd);
    } catch (err) {
      console.error(`${LOG} Invalid command:`, err.message);
    }
  }
});

async function handleCommand(cmd) {
  const id = cmd.id || ""; // For matching responses

  try {
    switch (cmd.cmd) {
      case "create_bubble": {
        console.log(`${LOG} Creating bubble: ${cmd.name}`);
        const bubble = await sdk.bubbles.createBubble(
          cmd.name,
          cmd.description || "",
          "all"
        );
        console.log(`${LOG} Bubble created: id=${bubble.id}, jid=${bubble.jid}`);
        bubbleCache.set(bubble.id, bubble);

        // Create S2S conversation via REST API — gives us the dbId immediately
        // instead of waiting for the /conversation webhook callback.
        let conversationDbId = null;
        try {
          conversationDbId = await createS2SConversation(bubble.id);
        } catch (err) {
          console.warn(`${LOG} S2S conversation creation failed:`, err.message);
        }

        respond(id, { ok: true, bubbleId: bubble.id, bubbleJid: bubble.jid, conversationDbId });
        break;
      }

      case "invite_agents": {
        console.log(`${LOG} Inviting agents to bubble ${cmd.bubbleId}: ${(cmd.emails || []).join(", ")}`);
        for (const email of (cmd.emails || [])) {
          try {
            // Look up user by email to get userId
            const contact = await sdk.contacts.getContactByLoginEmail(email);
            const userId = contact?.id || contact?.userId;

            if (userId) {
              // Direct REST: add user to room with status "accepted" (auto-accept)
              const added = await addUserToRoom(cmd.bubbleId, userId);
              if (added) {
                console.log(`${LOG} Added ${email} (userId=${userId}) with auto-accept`);
                continue;
              }
              // Fallback: SDK method with withInvitation=false
              const bubble = bubbleCache.get(cmd.bubbleId);
              if (bubble && contact) {
                await sdk.bubbles.inviteContactToBubble(contact, bubble, false, false, "ALE Support");
                console.log(`${LOG} Added ${email} via SDK (no invitation)`);
                continue;
              }
            }

            // Last resort: invite by email (requires manual accept)
            const bubble = bubbleCache.get(cmd.bubbleId) || await sdk.bubbles.getBubbleById(cmd.bubbleId);
            if (bubble) {
              await sdk.bubbles.inviteContactsByEmailsToBubble([email], bubble);
              console.log(`${LOG} Invited ${email} by email (manual accept needed)`);
            }
          } catch (err) {
            console.warn(`${LOG} Could not add/invite ${email}:`, err.message || err);
          }
        }
        respond(id, { ok: true });
        break;
      }

      case "send_message": {
        console.log(`${LOG} Sending message: ${(cmd.body || "").slice(0, 50)}...`);

        // Use conversationDbId directly if provided (from /conversation webhook callback).
        // In S2S mode, openConversationForBubble() does NOT populate dbId — the only
        // source of the dbId is the webhook callback handled by the bridge.
        let convDbId = cmd.conversationDbId || null;

        // Fallback: try getConversation (works if SDK has populated dbId)
        if (!convDbId && cmd.bubbleId) {
          const conversation = await getConversation(cmd.bubbleId);
          convDbId = conversation?.dbId || null;
        }

        if (convDbId) {
          const result = await sdk.s2s.sendMessageInConversation(convDbId, {
            message: {
              body: cmd.body,
              lang: "en",
              contents: [{ type: "text/markdown", data: cmd.body }],
            },
          });
          console.log(`${LOG} Message sent via S2S (dbId=${convDbId}), result:`, result ? "ok" : "no result");
          respond(id, { ok: true, conversationDbId: convDbId });
        } else {
          console.error(`${LOG} No conversation dbId available`);
          respond(id, { ok: false, error: "No conversation dbId available", conversationDbId: null });
        }

        break;
      }

      case "close_bubble": {
        try {
          const bubble = bubbleCache.get(cmd.bubbleId) || await sdk.bubbles.getBubbleById(cmd.bubbleId);
          if (bubble) {
            await sdk.bubbles.closeAndDeleteBubble(bubble);
            console.log(`${LOG} Bubble ${cmd.bubbleId} closed and deleted`);
          }
        } catch (err) {
          console.warn(`${LOG} close_bubble error:`, err.message || err);
        }
        // Clean up caches
        bubbleCache.delete(cmd.bubbleId);
        conversationCache.delete(cmd.bubbleId);
        respond(id, { ok: true });
        break;
      }

      default:
        respond(id, { ok: false, error: `Unknown command: ${cmd.cmd}` });
    }
  } catch (err) {
    console.error(`${LOG} Command ${cmd.cmd} failed:`, err.message || err);
    respond(id, { ok: false, error: err.message || String(err) });
  }
}

function respond(id, data) {
  const msg = JSON.stringify({ id, ...data });
  // Write to stdout as a JSON line (Next.js reads this)
  process.stdout.write(`__RESP__${msg}\n`);
}

// ── Start SDK ────────────────────────────────────────────
async function start() {
  console.log(`${LOG} Starting Rainbow SDK in S2S mode...`);
  console.log(`${LOG} Host: ${HOST}, Callback: ${HOST_CALLBACK}`);

  const RainbowSDK = require("rainbow-node-sdk").default || require("rainbow-node-sdk");

  sdk = new RainbowSDK({
    rainbow: { host: HOST, mode: "s2s" },
    s2s: {
      hostCallback: HOST_CALLBACK,
      locallistenningport: "0",
      expressEngine: createNoopExpress(),
    },
    credentials: { login: LOGIN, password: PASSWORD },
    application: { appID: APP_ID, appSecret: APP_SECRET },
    logs: {
      enableConsoleLogs: false,
      enableFileLogs: false,
      color: false,
      level: "warn",
    },
    im: {
      sendReadReceipt: true,
      sendMessageToConnectedUser: false,
      autoLoadConversations: true,
      autoLoadContacts: true,
      autoInitialGetBubbles: true,
      autoInitialBubblePresence: true,
      storeMessages: false,
    },
    servicesToStart: {
      bubbles: { start_up: true },
      s2s: { start_up: true },
      telephony: { start_up: false },
      channels: { start_up: false },
      admin: { start_up: true },
      fileServer: { start_up: false },
      fileStorage: { start_up: false },
      calllog: { start_up: false },
      favorites: { start_up: false },
    },
  });

  sdk.events.on("rainbow_onready", async () => {
    console.log(`${LOG} SDK ready — callback registered at ${HOST_CALLBACK}`);
    const user = sdk.connectedUser;
    if (user) {
      botUserId = user.id;
      console.log(`${LOG} Connected as: ${user.displayName || user.loginEmail}`);
      console.log(`${LOG} User ID: ${user.id}`);
    }

    // Extract connection ID and auth token for direct REST API calls
    extractSdkInfo();

    // CRITICAL (from S2S docs): Set presence to online
    try {
      if (sdk.presence && typeof sdk.presence.setPresenceTo === 'function') {
        await sdk.presence.setPresenceTo('online');
        console.log(`${LOG} Presence set to ONLINE via SDK`);
      } else if (s2sConnectionId && authToken) {
        await fetch(`https://${rainbowHost}/api/rainbow/ucs/v1.0/connections/${s2sConnectionId}/presences`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${authToken}`, "Content-Type": "application/json" },
          body: JSON.stringify({ presence: { show: "online", status: "Bot ready" } }),
        });
        console.log(`${LOG} Presence set to ONLINE via REST`);
      }
    } catch (err) {
      console.warn(`${LOG} Failed to set presence:`, err.message || err);
    }

    // CRITICAL (from S2S docs): Join all rooms the bot is member of
    try {
      if (s2sConnectionId && authToken) {
        await fetch(`https://${rainbowHost}/api/rainbow/ucs/v1.0/connections/${s2sConnectionId}/rooms/join`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${authToken}`, "Content-Type": "application/json" },
          body: "{}",
        });
        console.log(`${LOG} Joined all rooms via REST`);
      }
    } catch (err) {
      console.warn(`${LOG} Failed to join rooms:`, err.message || err);
    }

    console.log(`${LOG} Services: s2s=${!!sdk.s2s}, im=${!!sdk.im}, bubbles=${!!sdk.bubbles}, conversations=${!!sdk.conversations}`);
  });

  sdk.events.on("rainbow_onconnected", () => {
    console.log(`${LOG} SDK connected`);
  });

  sdk.events.on("rainbow_onmessagereceived", (msg) => {
    console.log(`${LOG} [EVENT] message received — from: ${msg.fromUserId || "?"}, bubble: ${msg.fromBubbleJid || msg.fromBubbleId || "N/A"}, content: ${(msg.content || msg.data || "").slice(0, 80)}`);
    try {
      handleMessage(msg);
    } catch (err) {
      console.error(`${LOG} Error processing message:`, err);
    }
  });

  sdk.events.on("rainbow_onbubbleaffiliationchanged", (bubble) => {
    console.log(`${LOG} [EVENT] bubble affiliation changed: ${bubble?.name || bubble?.id}`);
  });

  sdk.events.on("rainbow_onbubbleinvitationreceived", (bubble) => {
    console.log(`${LOG} [EVENT] bubble invitation received: ${bubble?.name || bubble?.id}`);
  });

  sdk.events.on("rainbow_onstopped", () => {
    console.warn(`${LOG} SDK stopped — restarting in 30s`);
    setTimeout(() => start(), 30000);
  });

  sdk.events.on("rainbow_onfailed", () => {
    console.error(`${LOG} SDK login failed — retrying in 30s`);
    setTimeout(() => start(), 30000);
  });

  try {
    await sdk.start();
    console.log(`${LOG} SDK started successfully`);
  } catch (err) {
    console.error(`${LOG} Failed to start SDK:`, err.message);
    console.log(`${LOG} Retrying in 30s...`);
    setTimeout(() => start(), 30000);
  }
}

// Wait for Next.js server to be ready
setTimeout(() => start(), 5000);
