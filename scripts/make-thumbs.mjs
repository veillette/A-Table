// Creates card thumbnails from the full-size photos with ImageMagick.
// Usage: npm run thumbs            (only missing thumbnails)
//        npm run thumbs -- --force (rebuild every thumbnail)
//        npm run thumbs -- salmon pasta (only the named recipe ids)
import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = join(root, 'dist', 'images');
const thumbsDir = join(imagesDir, 'thumbs');

const args = process.argv.slice(2);
const force = args.includes('--force');
const onlyIds = new Set(args.filter((arg) => !arg.startsWith('--')));

try {
  execFileSync('magick', ['-version'], { stdio: 'ignore' });
} catch {
  console.error('ImageMagick (the `magick` command) is required. Install it, then run this again.');
  process.exitCode = 1;
}

if (!process.exitCode) {
  const ids = readdirSync(imagesDir)
    .filter((file) => file.endsWith('.webp'))
    .map((file) => file.slice(0, -'.webp'.length))
    .filter((id) => onlyIds.size === 0 || onlyIds.has(id));

  let made = 0;
  for (const id of ids) {
    const target = join(thumbsDir, `${id}.webp`);
    if (existsSync(target) && !force) continue;
    execFileSync(
      'magick',
      [
        join(imagesDir, `${id}.webp`),
        '-resize', '720x720>',
        '-quality', '72',
        '-define', 'webp:method=6',
        target,
      ],
      { stdio: 'inherit' },
    );
    made += 1;
    console.log(`thumbs/${id}.webp`);
  }
  console.log(made === 0 ? 'All thumbnails are up to date.' : `Created ${made} thumbnail(s).`);
}
