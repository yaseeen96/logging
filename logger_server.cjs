// this is a webhook server for winston

const express = require("express");
const { Client, LocalAuth } = require("whatsapp-web.js");

const path = require("path");

const client = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth({
    dataPath: "auth",
  }),
});

// whatsapp web initialize
client.on("qr", (qr) => {
  // Generate and scan this code with your phone
  console.log("QR RECEIVED", qr);
});

client.on("ready", async () => {
  await client.sendMessage("918867507653@c.us", "Server is running ");
  const app = express();

  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("webhook server is running");
  });

  app.post("/webhook", async (req, res) => {
    const { level, message } = req.body;
    console.log("Client is ready!");
    console.log(req.body);

    const phoneNumber = "918867507653@c.us";
    const chatMessage = `Log from server: ${level} ${message}`;
    try {
      await client.sendMessage(phoneNumber, chatMessage);
    } catch (error) {
      console.log(error);
    }
    res.send("Hello World");
  });

  app.listen(3002, () => {
    console.log("Server is running on port 3002");
  });
});

client.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
});

client.initialize();

process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  await client.destroy();
  process.exit(0);
});

// whatsapp web complete
