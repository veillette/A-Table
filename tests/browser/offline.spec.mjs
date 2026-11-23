// Browser tests for installability and offline use under a deployment subpath.
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
const mount = '/A-Table/';
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
    const pathname = new URL(req.url, 'http://x').pathname;
    if (!pathname.startsWith(mount)) {
      res.writeHead(404).end('not found');
      return;
    }
    const path = normalize(decodeURIComponent(pathname.slice(mount.length)) || 'index.html');
    const file = join(dist, path);
    if (!file.startsWith(dist) || !existsSync(file) || statSync(file).isDirectory()) {
      res.writeHead(404).end('not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(readFileSync(file));
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}${mount}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  await new Promise((resolve) => server?.close(resolve));
});

test('Chromium finds the app installable and recipes and fonts work offline after one visit', async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(baseUrl, { waitUntil: 'load' });
    await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
    const session = await context.newCDPSession(page);
    const manifest = await session.send('Page.getAppManifest');
    assert.equal(manifest.url, new URL('manifest.webmanifest', baseUrl).href);
    const { installabilityErrors } = await session.send('Page.getInstallabilityErrors');
    assert.deepEqual(installabilityErrors, []);

    await context.setOffline(true);
    await page.reload({ waitUntil: 'load' });
    assert.equal(await page.locator('.card').count(), recipes.length, 'every recipe card renders offline');
    await page.locator('.card .open-recipe').first().click();
    assert.ok(await page.locator('dialog[open] .ingredients').isVisible(), 'recipe ingredients open offline');

    const loadedFonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return [...document.fonts].filter((face) => face.status === 'loaded').map((face) => face.family);
    });
    assert.ok(loadedFonts.includes('DM Sans'), 'DM Sans loads offline');
    assert.ok(loadedFonts.includes('Libre Caslon Display'), 'Libre Caslon Display loads offline');

    const featured = recipes.find((recipe) => recipe.featured);
    await page.goto(new URL('?recipe=' + featured.id, baseUrl).href);
    await page.getByRole('dialog').waitFor();
    assert.equal(await page.locator('#recipe-title').textContent(), featured.name);
  } finally {
    await context.close();
  }
});

test('recipe card images loaded under the service worker are available offline', async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  // Wait for the service worker to take control before requesting the card images again.
  await page.goto(baseUrl, { waitUntil: 'load' });
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);

  // Reload under the service worker so it can cache the card images as they load.
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

  assert.deepEqual(errors, [], 'no uncaught page errors offline');
  await context.close();
});
