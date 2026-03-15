/**
 * Генерирует apple-touch-icon 180x180 и favicon.ico из логотипа.
 * Запуск: node scripts/generate-apple-touch-icon.js
 * Требует: sharp, to-ico (devDependencies)
 */

const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "app");
const LOGO = path.join(PUBLIC_DIR, "logo.webp");
const APPLE_ICON = path.join(PUBLIC_DIR, "apple-touch-icon.png");
const FAVICON_PUBLIC = path.join(PUBLIC_DIR, "favicon.ico");
const FAVICON_APP_ICON = path.join(APP_DIR, "icon.ico");
const FAVICON_APP_FAVICON = path.join(APP_DIR, "favicon.ico");

async function main() {
  if (!fs.existsSync(LOGO)) {
    console.error("Не найден public/logo.webp");
    process.exit(1);
  }
  const sharp = require("sharp");
  const toIco = require("to-ico");

  await sharp(LOGO)
    .resize(180, 180)
    .png()
    .toFile(APPLE_ICON);
  console.log(`Создан ${path.relative(process.cwd(), APPLE_ICON)} (180×180)`);

  const png16 = await sharp(LOGO).resize(16, 16).png().toBuffer();
  const png32 = await sharp(LOGO).resize(32, 32).png().toBuffer();
  const ico = await toIco([png16, png32]);
  fs.writeFileSync(FAVICON_PUBLIC, ico);
  fs.writeFileSync(FAVICON_APP_ICON, ico);
  fs.writeFileSync(FAVICON_APP_FAVICON, ico);
  console.log(`Создан public/favicon.ico, app/icon.ico, app/favicon.ico (ICO 16×16, 32×32)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
