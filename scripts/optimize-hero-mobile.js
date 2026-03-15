/**
 * Сжимает мобильные hero (hero_*_mobile.webp) для быстрого LCP на телефонах.
 * Макс. ширина 720px, WebP quality 85. Запуск: node scripts/optimize-hero-mobile.js
 */

const fs = require("fs");
const path = require("path");

const HERO_DIR = path.join(__dirname, "..", "public", "hero");
const MAX_WIDTH = 720;
const QUALITY = 90;

async function main() {
  const sharp = require("sharp");
  const files = fs.readdirSync(HERO_DIR).filter((f) => f.endsWith("_mobile.webp"));
  if (files.length === 0) {
    console.log("Нет файлов *_mobile.webp в public/hero/");
    return;
  }
  for (const name of files) {
    const inputPath = path.join(HERO_DIR, name);
    const buf = fs.readFileSync(inputPath);
    const before = buf.length;
    await sharp(buf)
      .resize(MAX_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(inputPath);
    const after = fs.statSync(inputPath).size;
    console.log(`  ${name}: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`);
  }
  console.log("Готово.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
