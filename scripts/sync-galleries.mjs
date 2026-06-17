/**
 * Scans public/images/galleries/ and writes src/lib/galleryManifest.json.
 * Renames gallery files to 01.jpg, 02.jpg, … (cover.jpg stays separate).
 *
 * Run: npm run galleries:sync
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const galleriesRoot = path.join(projectRoot, 'public', 'images', 'galleries');
const manifestPath = path.join(projectRoot, 'src', 'lib', 'galleryManifest.json');

const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;

function isCoverFile(name) {
  return /^cover\./i.test(name);
}

function toJpgName(index) {
  return `${String(index).padStart(2, '0')}.jpg`;
}

function syncShootFolder(dir) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f) && fs.statSync(path.join(dir, f)).isFile());

  let cover = files.find((f) => isCoverFile(f)) ?? null;
  if (cover) {
    const target = path.join(dir, 'cover.jpg');
    const src = path.join(dir, cover);
    if (cover.toLowerCase() !== 'cover.jpg') {
      fs.copyFileSync(src, target);
      if (cover !== 'cover.jpg') {
        try {
          fs.unlinkSync(src);
        } catch {
          /* ignore */
        }
      }
    } else if (cover !== 'cover.jpg') {
      const temp = path.join(dir, '_tmp_cover.jpg');
      fs.renameSync(src, temp);
      fs.renameSync(temp, target);
    }
    cover = 'cover.jpg';
  }

  const galleryFiles = files
    .filter((f) => !isCoverFile(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const photos = [];
  galleryFiles.forEach((file, index) => {
    const target = toJpgName(index + 1);
    const srcPath = path.join(dir, file);
    const destPath = path.join(dir, target);

    if (file.toLowerCase() !== target.toLowerCase()) {
      if (fs.existsSync(destPath) && path.resolve(destPath) !== path.resolve(srcPath)) {
        fs.unlinkSync(destPath);
      }
      fs.renameSync(srcPath, destPath);
    } else if (file !== target) {
      const tempPath = path.join(dir, `_tmp_${target}`);
      fs.renameSync(srcPath, tempPath);
      fs.renameSync(tempPath, destPath);
    }

    photos.push(target);
  });

  return {
    cover: cover ?? photos[0] ?? null,
    photos,
  };
}

function main() {
  const manifest = {};

  if (!fs.existsSync(galleriesRoot)) {
    console.error('No galleries folder:', galleriesRoot);
    process.exit(1);
  }

  for (const categoryFolder of fs.readdirSync(galleriesRoot, { withFileTypes: true })) {
    if (!categoryFolder.isDirectory()) continue;
    const categoryPath = path.join(galleriesRoot, categoryFolder.name);
    manifest[categoryFolder.name] = {};

    for (const shootFolder of fs.readdirSync(categoryPath, { withFileTypes: true })) {
      if (!shootFolder.isDirectory()) continue;
      const shootPath = path.join(categoryPath, shootFolder.name);
      const result = syncShootFolder(shootPath);
      if (result.photos.length > 0 || result.cover) {
        manifest[categoryFolder.name][shootFolder.name] = result;
        console.log(
          `${categoryFolder.name}/${shootFolder.name}: ${result.photos.length} photos`,
        );
      }
    }
  }

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log('Wrote', manifestPath);
}

main();
