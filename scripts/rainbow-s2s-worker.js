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

        // Cache the bubble object (needed for openConversationForBubble)
        bubbleCache.set(bubble.id, bubble);

        // Respond IMMEDIATELY so the bridge doesn't time out
        // NOTE: Do NOT call joinRoom or openConversationForBubble here —
        // the bot is already the bubble owner, and openConversation creates
        // a visible "conversation" entity that appears as a second bubble
        // in the agent's Rainbow app. Conversation is opened lazily on
        // first send_message instead.
        respond(id, { ok: true, bubbleId: bubble.id, bubbleJid: bubble.jid });

        break;
      }

      case "invite_agents": {
        console.log(`${LOG} Inviting agents to bubble ${cmd.bubbleId}: ${(cmd.emails || []).join(", ")}`);
        let bubble = bubbleCache.get(cmd.bubbleId);
        if (!bubble) {
          try {
            bubble = await sdk.bubbles.getBubbleById(cmd.bubbleId);
          } catch (e) {
            console.warn(`${LOG} getBubbleById failed:`, e.message || e);
          }
        }
        if (!bubble) {
          console.warn(`${LOG} Bubble ${cmd.bubbleId} not found`);
          respond(id, { ok: false, error: "Bubble not found" });
          break;
        }
        for (const email of (cmd.emails || [])) {
          try {
            // Look up the contact, then add directly (withInvitation=false → auto-accept)
            const contact = await sdk.contacts.getContactByLoginEmail(email);
            if (contact) {
              await sdk.bubbles.inviteContactToBubble(contact, bubble, false, false, "ALE Support");
              console.log(`${LOG} Added ${email} directly (no invitation needed)`);
            } else {
              // Fallback: invite by email (requires manual accept)
              await sdk.bubbles.inviteContactsByEmailsToBubble([email], bubble);
              console.log(`${LOG} Invited ${email} (contact not found — sent invitation)`);
            }
          } catch (err) {
            console.warn(`${LOG} Could not add/invite ${email}:`, err.message || err);
          }
        }
        respond(id, { ok: true });
        break;
      }

      case "send_message": {
        console.log(`${LOG} Sending message to bubble ${cmd.bubbleId || cmd.bubbleJid}: ${(cmd.body || "").slice(0, 50)}...`);

        // ONLY use s2s.sendMessageInConversation — the im.sendMessageToConversation
        // adds an "urgency" field that causes 400206 errors on the UCS REST API.
        const conversation = cmd.bubbleId ? await getConversation(cmd.bubbleId) : null;
        const convDbId = conversation?.dbId;

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
          // dbId not available even after waiting — cannot send
          console.error(`${LOG} No conversation dbId for bubble ${cmd.bubbleId} after waiting`);
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
      autoLoadContacts: false,
      autoInitialGetBubbles: true,
      autoInitialBubblePresence: true,
      storeMessages: false,
    },
    servicesToStart: {
      bubbles: { start_up: true },
      s2s: { start_up: true },
      telephony: { start_up: false },
      channels: { start_up: false },
      admin: { start_up: false },
      fileServer: { start_up: false },
      fileStorage: { start_up: false },
      calllog: { start_up: false },
      favorites: { start_up: false },
    },
  });

  sdk.events.on("rainbow_onready", () => {
    console.log(`${LOG} SDK ready — callback registered at ${HOST_CALLBACK}`);
    const user = sdk.connectedUser;
    if (user) {
      botUserId = user.id;
      console.log(`${LOG} Connected as: ${user.displayName || user.loginEmail}`);
      console.log(`${LOG} User ID: ${user.id}`);
    }
    // Log available services for debugging
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
