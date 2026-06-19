/**

 * Scans public/images/galleries/ and writes src/lib/galleryManifest.json.

 * Renames gallery files to 01.jpg, 02.jpg, … (cover.jpg / cover.jpeg stay separate).

 * Compresses oversized images for faster web loading (galleries only).

 *

 * Run: npm run galleries:sync

 */

import fs from 'fs';

import path from 'path';

import { fileURLToPath } from 'url';

import sharp from 'sharp';



const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectRoot = path.join(__dirname, '..');

const galleriesRoot = path.join(projectRoot, 'public', 'images', 'galleries');

const manifestPath = path.join(projectRoot, 'src', 'lib', 'galleryManifest.json');



const IMAGE_RE = /\.(jpe?g|png|webp|gif)$/i;

const COVER_PREFERENCE = ['cover.jpg', 'cover.jpeg'];



/** Long edge cap — plenty for grid + lightbox */

const COMPRESS_MAX_EDGE = 2400;

const COMPRESS_QUALITY = 85;

/** Skip re-encoding when already web-sized (avoids quality loss on repeat syncs) */

const SKIP_IF_UNDER_BYTES = 1.5 * 1024 * 1024;



function isCoverFile(name) {

  return /^cover\./i.test(name);

}



function findCoverFile(files) {

  const covers = files.filter(isCoverFile);

  if (covers.length === 0) return null;



  for (const preferred of COVER_PREFERENCE) {

    const match = covers.find((f) => f.toLowerCase() === preferred);

    if (match) return match;

  }



  return covers[0];

}



function renameCoverCase(dir, current, canonical) {

  const src = path.join(dir, current);

  const dest = path.join(dir, canonical);

  const temp = path.join(dir, `_tmp_${canonical}`);

  fs.renameSync(src, temp);

  fs.renameSync(temp, dest);

  return canonical;

}



/** Normalize cover.* to cover.jpg or cover.jpeg (keeps .jpeg when that's what you uploaded). */

function normalizeCoverFile(dir, cover) {

  const ext = path.extname(cover).toLowerCase();



  if (ext === '.jpg') {

    return cover === 'cover.jpg'

      ? 'cover.jpg'

      : renameCoverCase(dir, cover, 'cover.jpg');

  }



  if (ext === '.jpeg') {

    return cover === 'cover.jpeg'

      ? 'cover.jpeg'

      : renameCoverCase(dir, cover, 'cover.jpeg');

  }



  const target = path.join(dir, 'cover.jpg');

  fs.copyFileSync(path.join(dir, cover), target);

  if (cover.toLowerCase() !== 'cover.jpg') {

    try {

      fs.unlinkSync(path.join(dir, cover));

    } catch {

      /* ignore */

    }

  }

  return 'cover.jpg';

}



function removeExtraCoverFiles(dir, keepName) {

  for (const name of fs.readdirSync(dir)) {

    if (!isCoverFile(name) || name === keepName) continue;

    try {

      fs.unlinkSync(path.join(dir, name));

    } catch {

      /* ignore */

    }

  }

}



function toJpgName(index) {

  return `${String(index).padStart(2, '0')}.jpg`;

}



function formatMb(bytes) {

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

}



/**

 * Resize & JPEG-encode gallery images. Skips files already under size/dimension limits.

 */

async function optimizeGalleryImage(filePath) {

  const stat = fs.statSync(filePath);

  const ext = path.extname(filePath).toLowerCase();

  const meta = await sharp(filePath).metadata();

  const maxDim = Math.max(meta.width || 0, meta.height || 0);

  const isJpeg = ext === '.jpg' || ext === '.jpeg';



  if (

    stat.size < SKIP_IF_UNDER_BYTES &&

    maxDim <= COMPRESS_MAX_EDGE &&

    isJpeg

  ) {

    return { skipped: true, before: stat.size, after: stat.size };

  }



  const before = stat.size;

  const tempPath = `${filePath}.compressing`;

  let pipeline = sharp(filePath).rotate();



  if (maxDim > COMPRESS_MAX_EDGE) {

    pipeline = pipeline.resize(COMPRESS_MAX_EDGE, COMPRESS_MAX_EDGE, {

      fit: 'inside',

      withoutEnlargement: true,

    });

  }



  const jpegOpts = { quality: COMPRESS_QUALITY, mozjpeg: true };

  const outputPath =

    ext === '.jpeg' ? filePath : filePath.replace(/\.[^.]+$/i, '.jpg');



  await pipeline.jpeg(jpegOpts).toFile(tempPath);



  if (outputPath !== filePath && fs.existsSync(filePath)) {

    fs.unlinkSync(filePath);

  }

  fs.renameSync(tempPath, outputPath);



  const after = fs.statSync(outputPath).size;

  return { optimized: true, before, after, path: outputPath };

}



async function compressShootImages(dir, cover, photos) {

  const names = new Set();

  if (cover) names.add(cover);

  for (const photo of photos) names.add(photo);



  let saved = 0;

  let optimized = 0;

  let skipped = 0;



  for (const name of names) {

    const filePath = path.join(dir, name);

    if (!fs.existsSync(filePath)) continue;



    const result = await optimizeGalleryImage(filePath);

    if (result.skipped) {

      skipped += 1;

    } else if (result.optimized) {

      optimized += 1;

      saved += Math.max(0, result.before - result.after);

    }

  }



  return { saved, optimized, skipped };

}



async function syncShootFolder(dir) {

  const files = fs

    .readdirSync(dir)

    .filter((f) => IMAGE_RE.test(f) && fs.statSync(path.join(dir, f)).isFile());



  let cover = findCoverFile(files);

  if (cover) {

    cover = normalizeCoverFile(dir, cover);

    removeExtraCoverFiles(dir, cover);

  }



  const galleryFiles = fs

    .readdirSync(dir)

    .filter(

      (f) =>

        IMAGE_RE.test(f) &&

        fs.statSync(path.join(dir, f)).isFile() &&

        !isCoverFile(f),

    )

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



  const compression = await compressShootImages(dir, cover, photos);



  return {

    cover: cover ?? photos[0] ?? null,

    photos,

    compression,

  };

}



async function main() {

  const manifest = {};

  let totalSaved = 0;

  let totalOptimized = 0;



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

      const result = await syncShootFolder(shootPath);

      if (result.photos.length > 0 || result.cover) {

        manifest[categoryFolder.name][shootFolder.name] = {

          cover: result.cover,

          photos: result.photos,

        };

        totalSaved += result.compression.saved;

        totalOptimized += result.compression.optimized;

        const savedNote =

          result.compression.saved > 0

            ? `, saved ${formatMb(result.compression.saved)}`

            : '';

        console.log(

          `${categoryFolder.name}/${shootFolder.name}: ${result.photos.length} photos (${result.compression.optimized} compressed${savedNote})`,

        );

      }

    }

  }



  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log('Wrote', manifestPath);

  if (totalOptimized > 0) {

    console.log(

      `Compressed ${totalOptimized} images — total space saved: ${formatMb(totalSaved)}`,

    );

  }

}



main().catch((err) => {

  console.error(err);

  process.exit(1);

});


