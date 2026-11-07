const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fryDir = 'C:/Users/HP/OneDrive/Documents/fry';
const publicFramesDir = path.resolve(__dirname, '../public/frames');
const publicSeqDir = path.resolve(__dirname, '../public/sequence');

async function getFryList() {
  const files = fs.readdirSync(fryDir).filter(f => f.endsWith('.png'));
  return files.map(f => {
    const m = f.match(/-(\d+)\.png$/);
    const n = parseInt(m[1], 10);
    return {
      source: path.join(fryDir, f),
      frameNumber: n, // 1 to 239
    };
  }).sort((a, b) => a.frameNumber - b.frameNumber);
}

async function processFryFrame(item) {
  const pad4 = String(item.frameNumber).padStart(4, '0');
  const pad3 = String(item.frameNumber).padStart(3, '0');

  // Upscale to 4K (3840x2160) with Lanczos3 and subtle sharpening
  const webpBuffer = await sharp(item.source)
    .resize(3840, 2160, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
    .webp({ quality: 85, effort: 4 })
    .toBuffer();

  const jpgBuffer = await sharp(item.source)
    .resize(3840, 2160, { kernel: 'lanczos3' })
    .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  // Targets in public/frames
  fs.writeFileSync(path.join(publicFramesDir, `${pad4}.webp`), webpBuffer);
  fs.writeFileSync(path.join(publicFramesDir, `${pad4}.jpg`), jpgBuffer);
  fs.writeFileSync(path.join(publicFramesDir, `frame-${pad3}.webp`), webpBuffer);
  fs.writeFileSync(path.join(publicFramesDir, `frame-${pad3}.jpg`), jpgBuffer);

  // Targets in public/sequence
  fs.writeFileSync(path.join(publicSeqDir, `${pad4}.webp`), webpBuffer);
  fs.writeFileSync(path.join(publicSeqDir, `${pad4}.jpg`), jpgBuffer);
  fs.writeFileSync(path.join(publicSeqDir, `frame-${pad3}.webp`), webpBuffer);
  fs.writeFileSync(path.join(publicSeqDir, `frame-${pad3}.jpg`), jpgBuffer);
}

async function main() {
  const items = await getFryList();
  console.log(`Starting 4K upscaling for ${items.length} fry frames (frame 1 to 239)...`);
  const startTime = Date.now();

  const CONCURRENCY = 6;
  let completed = 0;
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      try {
        await processFryFrame(current);
        completed++;
        if (completed % 25 === 0 || completed === items.length) {
          const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
          console.log(`Progress: ${completed}/${items.length} fry frames upscaled (${elapsed}s)`);
        }
      } catch (err) {
        console.error(`Error processing fry frame ${current.frameNumber}:`, err);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Successfully upscaled all ${completed} fry frames to 4K in ${totalTime}s!`);
}

main().catch(console.error);
