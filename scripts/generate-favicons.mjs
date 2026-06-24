import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourcePng = path.join(root, 'public/images/rose-favicon.png');
const publicDir = path.join(root, 'public');

/** Site cream — gives line art enough contrast for Google SERP thumbnails */
const ICON_BG = { r: 244, g: 241, b: 235, alpha: 1 };

async function loadTransparentRose() {
  const trimmed = await sharp(sourcePng)
    .trim({ threshold: 12 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = trimmed;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 235 && g > 235 && b > 235) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function iconWithBackground(source, size) {
  const roseSize = Math.round(size * 0.8);
  const rose = await source
    .clone()
    .resize(roseSize, roseSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  const offset = Math.round((size - roseSize) / 2);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: ICON_BG,
    },
  })
    .composite([{ input: rose, left: offset, top: offset }])
    .png({ compressionLevel: 9, effort: 10 });
}

const rose = await loadTransparentRose();

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'favicon-144x144.png', size: 144 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of sizes) {
  const pipeline = await iconWithBackground(rose, size);
  await pipeline.toFile(path.join(publicDir, name));
}

const applePipeline = await iconWithBackground(rose, 180);
await applePipeline.toFile(path.join(publicDir, 'apple-touch-icon.png'));
const icoPipeline = await iconWithBackground(rose, 48);
await icoPipeline.toFile(path.join(publicDir, 'favicon.ico'));

console.log('Generated favicons from public/images/rose-favicon.png');
