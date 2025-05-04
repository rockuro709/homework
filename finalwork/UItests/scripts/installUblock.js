// utils/installUblock.js
import fs from "fs";
import path from "path";
import unzipper from "unzipper";

const ZIP_URL =
  "https://github.com/uBlockOrigin/uBOL-home/releases/download/uBOLite_2025.4.27.1394/uBOLite_2025.4.27.1394.chromium.mv3.zip";
const OUT_DIR = path.resolve(process.cwd(), "extensions/ublockOriginLite");

async function downloadAndUnzip() {
  // 1. Создаём папку (рекурсивно) если надо
  await fs.promises.mkdir(OUT_DIR, { recursive: true });

  // 2. Скачиваем ZIP
  const res = await fetch(ZIP_URL);
  if (!res.ok) {
    throw new Error(`Failed to download: ${res.status} ${res.statusText}`);
  }

  // 3. Читаем весь ответ как ArrayBuffer → Buffer
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 4. Открываем ZIP из буфера и распаковываем в OUT_DIR
  const directory = await unzipper.Open.buffer(buffer);
  await directory.extract({ path: OUT_DIR });

  console.log("uBlockOriginLite установлен в", OUT_DIR);
}

downloadAndUnzip().catch((err) => {
  console.error(err);
  process.exit(1);
});
