const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const fryDir = 'C:/Users/HP/OneDrive/Documents/fry';
const tryDir = 'C:/Users/HP/OneDrive/Documents/try';
const dryDir = 'C:/Users/HP/OneDrive/Documents/dry';
const publicFramesDir = path.resolve(__dirname, '../public/frames');
const publicSeqDir = path.resolve(__dirname, '../public/sequence');

// Ensure output directories exist
if (!fs.existsSync(publicFramesDir)) fs.mkdirSync(publicFramesDir, { recursive: true });
if (!fs.existsSync(publicSeqDir)) fs.mkdirSync(publicSeqDir, { recursive: true });

async function getFullList() {
  const fryFiles = fs.readdirSync(fryDir).filter(f => f.endsWith('.png'));
  const fryItems = fryFiles.map(f => {
    const m = f.match(/-(\d+)\.png$/);
    const n = parseInt(m[1], 10);
    return {
      source: path.join(fryDir, f),
      frameNumber: n, // 1 to 239
    };
  });

  const tryFiles = fs.readdirSync(tryDir).filter(f => f.endsWith('.png'));
  const tryItems = tryFiles.map(f => {
    const m = f.match(/-(\d+)\.png$/);
    const n = parseInt(m[1], 10);
    return {
      source: path.join(tryDir, f),
      frameNumber: 239 + n, // 240 to 478
    };
  });

  const dryFiles = fs.readdirSync(dryDir).filter(f => f.includes('4K_upscaled') && f.endsWith('.png'));
  const dryItems = dryFiles.map(f => {
    const m = f.match(/-(\d+)\.png$/);
    const n = parseInt(m[1], 10);
    return {
      source: path.join(dryDir, f),
      frameNumber: 478 + n, // 479 to 717
    };
  });

  return [...fryItems, ...tryItems, ...dryItems].sort((a, b) => a.frameNumber - b.frameNumber);
}

async function processOptimizedFrame(item) {
  const pad4 = String(item.frameNumber).padStart(4, '0');
  const pad3 = String(item.frameNumber).padStart(3, '0');

  // Downsample/sharpen to pristine 1920x1080 for buttery 60-120fps scrolling
  const webpBuffer = await sharp(item.source)
    .resize(1920, 1080, { fit: 'cover', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.8, m2: 1.5 })
    .webp({ quality: 88, effort: 3 })
    .toBuffer();

  const jpgBuffer = await sharp(item.source)
    .resize(1920, 1080, { fit: 'cover', kernel: 'lanczos3' })
    .sharpen({ sigma: 0.8, m1: 0.8, m2: 1.5 })
    .jpeg({ quality: 85, mozjpeg: true })
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
  const items = await getFullList();
  console.log(`Starting optimized conversion for all ${items.length} frames (1 to 717)...`);
  const startTime = Date.now();

  const CONCURRENCY = 8;
  let completed = 0;
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      try {
        await processOptimizedFrame(current);
        completed++;
        if (completed % 50 === 0 || completed === items.length) {
          const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
          console.log(`Progress: ${completed}/${items.length} frames optimized (${elapsed}s)`);
        }
      } catch (err) {
        console.error(`Error processing frame ${current.frameNumber}:`, err);
      }
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Successfully optimized all ${completed} frames in ${totalTime}s!`);
}

main().catch(console.error);
