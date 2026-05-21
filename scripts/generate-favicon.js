/**
 * Generate public/favicon.ico from branding logo (binary-safe, no shell redirect).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function main() {
  const root = path.join(__dirname, "..");
  const src = path.join(root, "public/branding/logo.png");
  const outIco = path.join(root, "public/favicon.ico");
  const outIcon = path.join(root, "app/icon.png");
  const outApple = path.join(root, "app/apple-icon.png");
  const logPath = path.join(root, "debug-ffdd01.log");

  const png32 = await sharp(src).resize(32, 32).png().toBuffer();
  await sharp(src).resize(32, 32).png().toFile(outIcon);
  await sharp(src).resize(180, 180).png().toFile(outApple);

  const { default: pngToIco } = await import("png-to-ico");
  const ico = await pngToIco([png32]);
  fs.writeFileSync(outIco, ico);

  const magic = ico.slice(0, 4).toString("hex");
  const entry = JSON.stringify({
    sessionId: "ffdd01",
    hypothesisId: "H1",
    location: "scripts/generate-favicon.js",
    message: "favicon generated",
    data: { icoSize: ico.length, magic, png32Size: png32.length },
    timestamp: Date.now(),
    runId: "fix",
  });
  fs.appendFileSync(logPath, entry + "\n");
  console.log("Wrote", outIco, "bytes:", ico.length, "magic:", magic);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
