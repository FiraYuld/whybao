/**
 * Конвертирует PNG/JPG в WebP без потери качества.
 * Запуск: node scripts/optimize-images.js
 * Требует: npm install sharp (devDependency)
 */

const fs = require("fs");
const path = require("path");

const EXTENSIONS = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];
const PUBLIC_DIR = path.join(__dirname, "..", "public");

async function convertToWebP(inputPath) {
  const sharp = require("sharp");
  const ext = path.extname(inputPath).toLowerCase();
  const webpPath = inputPath.replace(/\.[^.]+$/i, ".webp");

  if (inputPath === webpPath) return;

  const buffer = fs.readFileSync(inputPath);
  const isPng = ext === ".png";

  await sharp(buffer)
    .webp(
      isPng
        ? { lossless: true }
        : { quality: 100 }
    )
    .toFile(webpPath);

  const origSize = fs.statSync(inputPath).size;
  const newSize = fs.statSync(webpPath).size;
  const name = path.relative(PUBLIC_DIR, inputPath);
  console.log(`  ${name} → ${path.relative(PUBLIC_DIR, webpPath)} (${(origSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB)`);
}

function walkDir(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkDir(full, files);
    else if (EXTENSIONS.includes(path.extname(e.name))) files.push(full);
  }
  return files;
}

async function main() {
  try {
    require.resolve("sharp");
  } catch {
    console.error("Установите sharp: npm install sharp --save-dev");
    process.exit(1);
  }

  const productDir = path.join(PUBLIC_DIR, "products");
  const heroDir = path.join(PUBLIC_DIR, "hero");
  const images = [
    ...walkDir(productDir),
    ...walkDir(heroDir),
    ...(fs.existsSync(path.join(PUBLIC_DIR, "logo.png")) ? [path.join(PUBLIC_DIR, "logo.png")] : []),
  ];

  if (images.length === 0) {
    console.log("Изображений для конвертации не найдено.");
    return;
  }

  console.log(`Найдено изображений: ${images.length}\n`);

  for (const file of images) {
    try {
      await convertToWebP(file);
    } catch (err) {
      console.error(`Ошибка ${file}:`, err.message);
    }
  }

  console.log("\nГотово. Замените в коде пути .png/.jpg на .webp и при необходимости удалите исходные файлы.");
}

main();
