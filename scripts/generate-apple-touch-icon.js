/**
 * Генерирует apple-touch-icon 180x180 из логотипа.
 * Запуск: node scripts/generate-apple-touch-icon.js
 * Требует: sharp (devDependency)
 */

const path = require("path");
const fs = require("fs");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const LOGO = path.join(PUBLIC_DIR, "logo.webp");
const OUT = path.join(PUBLIC_DIR, "apple-touch-icon.png");
const SIZE = 180;

async function main() {
  if (!fs.existsSync(LOGO)) {
    console.error("Не найден public/logo.webp");
    process.exit(1);
  }
  const sharp = require("sharp");
  await sharp(LOGO)
    .resize(SIZE, SIZE)
    .png()
    .toFile(OUT);
  console.log(`Создан ${path.relative(process.cwd(), OUT)} (${SIZE}×${SIZE})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
