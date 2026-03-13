const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const lockPath = path.join(__dirname, "..", ".next", "dev", "lock");
if (fs.existsSync(lockPath)) {
  try {
    fs.unlinkSync(lockPath);
    console.log("⚠️  Удалён старый lock-файл (предыдущий процесс не завершился)\n");
  } catch {}
}

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

const ip = getLocalIP();
if (ip) {
  const url = `http://${ip}:3000`;
  console.log("\n" + "=".repeat(50));
  console.log("  📱 Доступ с телефона (в той же Wi-Fi):");
  console.log("  " + url);
  console.log("=".repeat(50) + "\n");
} else {
  console.log("\n⚠️  Локальный IP не найден. Используй localhost:3000\n");
}

const nextBin = path.join(__dirname, "..", "node_modules", "next", "dist", "bin", "next");
const useWebpack = process.argv.includes("--webpack");
const args = ["dev", "-H", "0.0.0.0", "--webpack"];
const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: "inherit",
});

child.on("exit", (code) => process.exit(code ?? 0));
