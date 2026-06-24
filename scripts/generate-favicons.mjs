import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const sourcePng = path.join(root, 'public/images/rose-favicon.png');
const publicDir = path.join(root, 'public');
const imagesDir = path.join(publicDir, 'images');

await fs.mkdir(imagesDir, { recursive: true });

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

function iconPipeline(source, size) {
  return source
    .clone()
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png();
}

const rose = await loadTransparentRose();

await rose
  .clone()
  .png()
  .toFile(path.join(imagesDir, 'rose-favicon.png'));

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
];

for (const { name, size } of sizes) {
  await iconPipeline(rose, size).toFile(path.join(publicDir, name));
}

await iconPipeline(rose, 180).toFile(path.join(publicDir, 'apple-touch-icon.png'));
await iconPipeline(rose, 32).toFile(path.join(publicDir, 'favicon.ico'));

console.log('Generated transparent favicons from public/images/rose-favicon.png');
