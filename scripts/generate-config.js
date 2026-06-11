const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outputPath = path.join(root, "config.js");

const config = {
  name: process.env.CARD_NAME || "Your Name",
  title: process.env.CARD_TITLE || "Web Developer",
  tagline:
    process.env.CARD_TAGLINE ||
    "Technology and art sparks a unique mix of creativity.",
  email: process.env.CARD_EMAIL || "you@example.com",
  phone: process.env.CARD_PHONE || "",
};

const envKeys = ["CARD_NAME", "CARD_TITLE", "CARD_TAGLINE", "CARD_EMAIL", "CARD_PHONE"];
const hasConfigEnv = envKeys.some((key) => process.env[key]);

if (!hasConfigEnv && fs.existsSync(outputPath)) {
  console.log("No CARD_* env vars set; keeping existing config.js");
  process.exit(0);
}

const content = `window.CARD_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
fs.writeFileSync(outputPath, content);
console.log("Generated config.js");
