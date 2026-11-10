import sharp from "sharp";
import crypto from "crypto";
import https from "https";
import fs from "fs";
import path from "path";

const CLOUD_NAME = "ddelf4odl";
const API_KEY = "132361873749274";
const API_SECRET = "bP21BUjumVGHRNE0EFM74TZn3xg";
const FRAMES_DIR = "C:\\Users\\HP\\OneDrive\\Documents\\try";
const CONCURRENCY = 6;

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
              const parsed = JSON.parse(data);
              resolve(parsed.secure_url);
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
  console.log("Reading frames from:", FRAMES_DIR);
  const rawFiles = fs.readdirSync(FRAMES_DIR);

  const frameFiles = [];
  for (const f of rawFiles) {
    const m = f.match(/-(\d+)\.png$/);
    if (m) {
      frameFiles.push({ file: f, num: parseInt(m[1], 10) });
    }
  }

  frameFiles.sort((a, b) => a.num - b.num);
  console.log(`Found ${frameFiles.length} frames (1 to ${frameFiles[frameFiles.length - 1].num}).`);

  let completed = 0;
  const totalTasks = frameFiles.length * 2; // hd + lo

  const tasks = [];
  for (const item of frameFiles) {
    const pad = String(item.num).padStart(4, "0");
    const filePath = path.join(FRAMES_DIR, item.file);

    // Full HD tier
    tasks.push(async () => {
      const buf = await sharp(filePath).resize(1920).webp({ quality: 82, effort: 4 }).toBuffer();
      await uploadToCloudinary(buf, `try_frames/hd/${pad}`, "webp");
      completed++;
      if (completed % 20 === 0 || completed === totalTasks) {
        console.log(`Progress: ${completed}/${totalTasks} uploaded (${Math.round((completed / totalTasks) * 100)}%)`);
      }
    });

    // Lo keyframe tier
    tasks.push(async () => {
      const buf = await sharp(filePath).resize(640).webp({ quality: 55, effort: 4 }).toBuffer();
      await uploadToCloudinary(buf, `try_frames/lo/${pad}`, "webp");
      completed++;
      if (completed % 20 === 0 || completed === totalTasks) {
        console.log(`Progress: ${completed}/${totalTasks} uploaded (${Math.round((completed / totalTasks) * 100)}%)`);
      }
    });
  }

  console.log(`Starting upload of ${totalTasks} assets with concurrency ${CONCURRENCY}...`);
  const start = Date.now();

  let index = 0;
  async function worker() {
    while (index < tasks.length) {
      const currentTask = tasks[index++];
      let retries = 3;
      while (retries > 0) {
        try {
          await currentTask();
          break;
        } catch (err) {
          retries--;
          console.error(`Error uploading task, retries left: ${retries}`, err.message);
          if (retries === 0) throw err;
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`Successfully uploaded all ${totalTasks} frames to Cloudinary in ${elapsed}s!`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
