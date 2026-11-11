import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const read = (file) => readFileSync(join(dist, file), 'utf8');

// PNG files store width and height as big-endian 32-bit integers at bytes 16 and 20.
function pngSize(file) {
  const bytes = readFileSync(join(dist, file));
  assert.equal(bytes.subarray(1, 4).toString('ascii'), 'PNG', `${file} is not a PNG`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

// Reads the SHELL array from sw.js. It is written as JSON so it can be parsed directly.
function shellList() {
  const match = read('sw.js').match(/const SHELL = (\[[\s\S]*?\]);/);
  assert.ok(match, 'sw.js must declare SHELL as an array literal');
  return JSON.parse(match[1]);
}

describe('web app manifest', () => {
  const manifest = JSON.parse(read('manifest.webmanifest'));

  test('has the fields browsers need to install the app', () => {
    assert.equal(manifest.short_name, 'À Table');
    assert.equal(manifest.display, 'standalone');
    assert.ok(manifest.start_url);
    assert.ok(manifest.scope);
    assert.match(manifest.background_color, /^#[0-9a-f]{6}$/i);
    assert.match(manifest.theme_color, /^#[0-9a-f]{6}$/i);
  });

  test('declares icons that exist and have the stated size', () => {
    const sizes = manifest.icons.map((icon) => icon.sizes);
    assert.ok(sizes.includes('192x192'), 'a 192px icon is required');
    assert.ok(sizes.includes('512x512'), 'a 512px icon is required');
    assert.ok(manifest.icons.some((icon) => icon.purpose === 'maskable'), 'a maskable icon is required');
    for (const icon of manifest.icons) {
      const [w, h] = icon.sizes.split('x').map(Number);
      assert.deepEqual(pngSize(icon.src), { width: w, height: h }, `${icon.src} size`);
    }
  });

  test('is linked from the page with an apple touch icon', () => {
    const html = read('index.html');
    assert.match(html, /<link rel="manifest" href="manifest\.webmanifest">/);
    assert.match(html, /<link rel="apple-touch-icon" href="icons\/apple-touch-icon\.png">/);
    assert.deepEqual(pngSize('icons/apple-touch-icon.png'), { width: 180, height: 180 });
  });

  test('registers the service worker from the page', () => {
    assert.match(read('pwa.js'), /serviceWorker\.register\('\.\/sw\.js'\)/);
    assert.match(read('index.html'), /<script src="pwa\.js" defer><\/script>/);
  });
});

describe('service worker precache', () => {
  const shell = shellList();

  test('every precached file exists', () => {
    for (const path of shell) {
      const file = path === './' ? 'index.html' : path.replace(/^\.\//, '');
      assert.ok(existsSync(resolve(dist, file)), `${path} is listed in SHELL but missing`);
    }
  });

  test('includes every script and stylesheet, so the app works offline', () => {
    const listed = new Set(shell.map((path) => relative(dist, resolve(dist, path)).split(sep).join('/')));
    const assets = walk(dist)
      .map((file) => relative(dist, file).split(sep).join('/'))
      .filter((file) => /\.(js|css)$/.test(file) && file !== 'sw.js');
    for (const asset of assets) {
      assert.ok(listed.has(asset), `${asset} must be added to SHELL in sw.js`);
    }
  });

  test('SHELL_VERSION is bumped whenever SHELL changes', () => {
    // tests/shell.lock.json holds the version and a hash of SHELL. If SHELL changes, bump
    // SHELL_VERSION in sw.js and update the lock: set "version" to the new value and "hash"
    // to the sha256 printed in the failure message.
    const version = read('sw.js').match(/const SHELL_VERSION = '([^']+)'/)[1];
    const lock = JSON.parse(readFileSync(new URL('./shell.lock.json', import.meta.url), 'utf8'));
    const hash = createHash('sha256').update(JSON.stringify(shell)).digest('hex');
    assert.equal(
      hash,
      lock.hash,
      `SHELL changed. Bump SHELL_VERSION in sw.js and set tests/shell.lock.json to {"version": "<new>", "hash": "${hash}"}`,
    );
    assert.equal(version, lock.version, 'SHELL_VERSION in sw.js must match tests/shell.lock.json');
  });
});
