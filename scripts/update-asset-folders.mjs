import https from "https";

const CLOUD_NAME = "ddelf4odl";
const API_KEY = "132361873749274";
const API_SECRET = "bP21BUjumVGHRNE0EFM74TZn3xg";
const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

async function updateAssetFolder(publicId, folderName) {
  const postData = JSON.stringify({ asset_folder: folderName });
  return new Promise((resolve) => {
    const req = https.request(
      {
        hostname: "api.cloudinary.com",
        path: `/v1_1/${CLOUD_NAME}/resources/image/upload/${encodeURIComponent(publicId)}`,
        method: "POST",
        headers: {
          Authorization: `Basic ${AUTH}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let d = "";
        res.on("data", (chunk) => (d += chunk));
        res.on("end", () => {
          resolve(res.statusCode === 200);
        });
      }
    );
    req.on("error", () => resolve(false));
    req.write(postData);
    req.end();
  });
}

async function updateBatch(prefix, folderName, total = 239) {
  console.log(`Setting asset_folder "${folderName}" for ${prefix}...`);
  const tasks = [];
  for (let i = 1; i <= total; i++) {
    const pad = String(i).padStart(4, "0");
    tasks.push(`${prefix}/hd/${pad}`);
    tasks.push(`${prefix}/lo/${pad}`);
  }

  let index = 0;
  let done = 0;
  async function worker() {
    while (index < tasks.length) {
      const pid = tasks[index++];
      await updateAssetFolder(pid, folderName);
      done++;
      if (done % 50 === 0 || done === tasks.length) {
        console.log(`  [${folderName}] ${done}/${tasks.length} updated`);
      }
    }
  }

  await Promise.all(Array.from({ length: 10 }, () => worker()));
}

async function main() {
  await updateBatch("try_frames", "try_frames");
  await updateBatch("dry_frames", "dry_frames");
  await updateBatch("fry_frames", "fry_frames");
  console.log("All asset folders updated in Cloudinary DAM!");
}

main();
