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

  console.log(`${LOG} Agent message in bubble ${bubbleJid || bubbleId}: ${content.slice(0, 50)}...`);

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
        respond(id, { ok: true, bubbleId: bubble.id, bubbleJid: bubble.jid });
        break;
      }

      case "invite_agents": {
        const bubble = sdk.bubbles.getBubbleById(cmd.bubbleId);
        if (!bubble) {
          respond(id, { ok: false, error: "Bubble not found" });
          break;
        }
        for (const email of (cmd.emails || [])) {
          try {
            await sdk.bubbles.inviteContactsByEmailsToBubble([email], bubble);
          } catch (err) {
            console.warn(`${LOG} Could not invite ${email}:`, err.message);
          }
        }
        respond(id, { ok: true });
        break;
      }

      case "send_message": {
        console.log(`${LOG} Sending message to bubble ${cmd.bubbleJid}: ${(cmd.body || "").slice(0, 50)}...`);
        const result = await sdk.im.sendMessageToBubbleJid(cmd.body, cmd.bubbleJid, "en");
        console.log(`${LOG} Message sent, result:`, result ? "ok" : "no result");
        respond(id, { ok: true });
        break;
      }

      case "close_bubble": {
        const bubble = sdk.bubbles.getBubbleById(cmd.bubbleId);
        if (bubble) {
          await sdk.bubbles.closeAndDeleteBubble(bubble);
        }
        respond(id, { ok: true });
        break;
      }

      default:
        respond(id, { ok: false, error: `Unknown command: ${cmd.cmd}` });
    }
  } catch (err) {
    console.error(`${LOG} Command ${cmd.cmd} failed:`, err.message);
    respond(id, { ok: false, error: err.message });
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
      autoLoadConversations: false,
      autoLoadContacts: false,
      storeMessages: false,
    },
    servicesToStart: {
      bubbles: { start_up: true },
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
  });

  sdk.events.on("rainbow_onconnected", () => {
    console.log(`${LOG} SDK connected`);
  });

  sdk.events.on("rainbow_onmessagereceived", (msg) => {
    try {
      handleMessage(msg);
    } catch (err) {
      console.error(`${LOG} Error processing message:`, err);
    }
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
