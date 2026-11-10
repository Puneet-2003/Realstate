import sharp from "sharp";
import crypto from "crypto";
import https from "https";
import fs from "fs";
import path from "path";

const CLOUD_NAME = "ddelf4odl";
const API_KEY = "132361873749274";
const API_SECRET = "bP21BUjumVGHRNE0EFM74TZn3xg";
const CONCURRENCY = 10;

const FOLDERS = [
  { id: "1st", dir: "C:\\Users\\HP\\OneDrive\\Documents\\1st mobile" },
  { id: "2nd", dir: "C:\\Users\\HP\\OneDrive\\Documents\\2nd mobile" },
  { id: "3rd", dir: "C:\\Users\\HP\\OneDrive\\Documents\\3rd mobile" },
];

function signParams(params, secret) {
  const keys = Object.keys(params)
    .filter((k) => k !== "file" && k !== "api_key" && k !== "resource_type")
    .sort();
  const toSign = keys.map((k) => `${k}=${params[k]}`).join("&") + secret;
  return crypto.createHash("sha1").update(toSign).digest("hex");
}

async function uploadToCloudinary(buffer, publicId, format = "webp") {
  const base64Data = `data:image/${format};base64,` + buffer.toString("base64");
  const timestamp = Math.floor(Date.now() / 1000);

  const params = {
    asset_folder: "mobile_frames",
    overwrite: "true",
    public_id: publicId,
    timestamp: String(timestamp),
  };

  const signature = signParams(params, API_SECRET);

  const postData = JSON.stringify({
    ...params,
    file: base64Data,
    api_key: API_KEY,
    signature,
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "api.cloudinary.com",
        path: `/v1_1/${CLOUD_NAME}/image/upload`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(data).secure_url);
            } catch (e) {
              resolve(data);
            }
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      }
    );

    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}

async function main() {
  const tasks = [];

  for (const { id, dir } of FOLDERS) {
    console.log(`Scanning mobile folder ${id}: ${dir}`);
    const files = fs.readdirSync(dir);
    const sorted = [];
    for (const f of files) {
      const m = f.match(/-(\d+)\.png$/);
      if (m) {
        sorted.push({ file: f, num: parseInt(m[1], 10) });
      }
    }
    sorted.sort((a, b) => a.num - b.num);
    console.log(`  -> Found ${sorted.length} frames (1 to ${sorted[sorted.length - 1].num})`);

    for (const item of sorted) {
      const pad = String(item.num).padStart(4, "0");
      const filePath = path.join(dir, item.file);

      // HD tier (1080x1920)
      tasks.push(async () => {
        const buf = await sharp(filePath)
          .resize(1080)
          .webp({ quality: 80, effort: 4 })
          .toBuffer();
        await uploadToCloudinary(buf, `mobile_frames/${id}/hd/${pad}`, "webp");
      });

      // Lo tier (540x960)
      tasks.push(async () => {
        const buf = await sharp(filePath)
          .resize(540)
          .webp({ quality: 55, effort: 4 })
          .toBuffer();
        await uploadToCloudinary(buf, `mobile_frames/${id}/lo/${pad}`, "webp");
      });
    }
  }

  const totalTasks = tasks.length;
  console.log(`Starting upload of ${totalTasks} mobile assets with concurrency ${CONCURRENCY}...`);

  let completed = 0;
  let index = 0;
  const start = Date.now();

  async function worker() {
    while (index < tasks.length) {
      const currentTask = tasks[index++];
      let retries = 3;
      while (retries > 0) {
        try {
          await currentTask();
          completed++;
          if (completed % 50 === 0 || completed === totalTasks) {
            const pct = Math.round((completed / totalTasks) * 100);
            console.log(`Progress: ${completed}/${totalTasks} uploaded (${pct}%)`);
          }
          break;
        } catch (err) {
          retries--;
          console.error(`Error uploading, retries left: ${retries}`, err.message);
          if (retries === 0) throw err;
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`Successfully uploaded all ${totalTasks} mobile frames to Cloudinary in ${elapsed}s!`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
