// Browser test: after one visit, the site must load with the network switched off.
// It needs a Chromium build, so it runs separately from `npm test`:
//   npx playwright install chromium   (first time)
//   npm run test:offline
// (Named *.spec.mjs so `npm run test:unit` does not pick it up.)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { recipes } from '../../dist/recipes.js';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

let server;
let browser;
let baseUrl;

before(async () => {
  server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
    let file = join(dist, path.endsWith('/') ? path + 'index.html' : path);
    if (!file.startsWith(dist) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}/`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await new Promise((resolve) => server?.close(resolve));
});

test('the site loads offline after one visit, with recipes, images and fonts', async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  // First visit: the service worker installs and precaches the app shell and fonts. It only
  // controls the page from the next load, so images from this first load are not cached yet.
  await page.goto(baseUrl, { waitUntil: 'load' });
  await page.evaluate(() => navigator.serviceWorker.ready);

  // Second load runs under the service worker, which caches the card images as they load.
  await page.reload({ waitUntil: 'load' });
  await page.waitForSelector('.card');
  await page.waitForFunction(() =>
    [...document.querySelectorAll('.card img')].slice(0, 3).every((img) => img.complete && img.naturalWidth > 0),
  );

  await context.setOffline(true);
  await page.reload({ waitUntil: 'load' });

  await page.waitForSelector('.card');
  assert.equal(await page.locator('.card').count(), recipes.length, 'every recipe card renders offline');

  const loadedImages = await page.evaluate(() =>
    [...document.querySelectorAll('.card img')].slice(0, 3).filter((img) => img.complete && img.naturalWidth > 0).length,
  );
  assert.equal(loadedImages, 3, 'the first card images come from the cache');

  const loadedFonts = await page.evaluate(async () => {
    await document.fonts.ready;
    return [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family);
  });
  assert.ok(loadedFonts.includes('DM Sans'), 'DM Sans loads offline');
  assert.ok(loadedFonts.includes('Libre Caslon Display'), 'Libre Caslon Display loads offline');

  assert.deepEqual(errors, [], 'no uncaught page errors offline');
  await context.close();
});
