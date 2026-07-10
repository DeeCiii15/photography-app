/**
 * Compresses images in public/images/blog/{post-slug}/ for faster loading.
 * Uses the same settings as gallery sync (2400px max edge, 85% JPEG quality).
 *
 * Run: npm run blog:sync
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatMb, IMAGE_RE, optimizeImage } from './lib/compress-image.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogRoot = path.join(__dirname, '..', 'public', 'images', 'blog');

async function compressPostFolder(dir) {
  const files = fs
    .readdirSync(dir)
    .filter((name) => IMAGE_RE.test(name) && fs.statSync(path.join(dir, name)).isFile());

  let optimized = 0;
  let skipped = 0;
  let saved = 0;

  for (const name of files) {
    const filePath = path.join(dir, name);
    const result = await optimizeImage(filePath);

    if (result.skipped) {
      skipped += 1;
    } else if (result.optimized) {
      optimized += 1;
      saved += Math.max(0, result.before - result.after);
    }
  }

  return { optimized, skipped, saved, count: files.length };
}

async function main() {
  if (!fs.existsSync(blogRoot)) {
    console.log('No blog images folder yet:', blogRoot);
    return;
  }

  let totalOptimized = 0;
  let totalSaved = 0;

  const entries = fs.readdirSync(blogRoot, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const result = await compressPostFolder(path.join(blogRoot, entry.name));
    if (result.count === 0) continue;

    totalOptimized += result.optimized;
    totalSaved += result.saved;

    const savedNote =
      result.saved > 0 ? `, saved ${formatMb(result.saved)}` : '';

    console.log(
      `blog/${entry.name}: ${result.count} images (${result.optimized} compressed${savedNote})`,
    );
  }

  if (totalOptimized > 0) {
    console.log(
      `Compressed ${totalOptimized} blog images — total space saved: ${formatMb(totalSaved)}`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
