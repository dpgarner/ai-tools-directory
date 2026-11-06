/* AI Atlas — static audit: external refs, emoji, raw colors, reference integrity.
   Run: node tools/audit.mjs */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const dir = path.dirname(url.fileURLToPath(import.meta.url));
const site = path.resolve(dir, '../site');
const read = (p) => fs.readFileSync(path.join(site, p), 'utf8');

const files = {
  'index.html': read('index.html'),
  'styles.css': read('assets/styles.css'),
  'app.js': read('assets/app.js'),
  'data.js': read('assets/data.js'),
  'favicon.svg': read('assets/favicon.svg')
};

let failures = 0;
const ok = (cond, msg) => {
  console.log((cond ? 'PASS ' : 'FAIL ') + msg);
  if (!cond) failures++;
};

/* 1 · external references */
ok((files['index.html'].match(/https?:\/\//g) || []).length === 0,
  `index.html external URL literals: ${(files['index.html'].match(/https?:\/\//g) || []).length} (expect 0)`);
ok((files['styles.css'].match(/https?:\/\//g) || []).length === 0,
  `styles.css external URL literals: ${(files['styles.css'].match(/https?:\/\//g) || []).length} (expect 0)`);
ok((files['app.js'].match(/https?:\/\//g) || []).length === 0,
  `app.js external URL literals: ${(files['app.js'].match(/https?:\/\//g) || []).length} (expect 0)`);
const urlFieldCount = (files['data.js'].match(/url:\s*"https:\/\//g) || []).length;
ok(urlFieldCount === 103, `data.js tool-url fields: ${urlFieldCount} (expect 103)`);
const badSrcHref = files['index.html'].match(/(src|href)\s*=\s*["'](https?:)?\/\//g) || [];
ok(badSrcHref.length === 0, `html src/href external or protocol-relative: ${badSrcHref.length} (expect 0)`);
ok(!/@import/.test(files['styles.css']), 'styles.css has no @import');
const cssUrls = files['styles.css'].match(/url\([^)]+\)/g) || [];
const badCssUrls = cssUrls.filter((u) => !/^url\(["']?fonts\//.test(u));
ok(badCssUrls.length === 0, `css url() refs not local fonts: ${badCssUrls.length} (expect 0)`);
ok((files['app.js'].match(/fetch\s*\(|XMLHttpRequest/g) || []).length === 0,
  `app.js fetch/XHR usage: ${(files['app.js'].match(/fetch\s*\(|XMLHttpRequest/g) || []).length} (expect 0)`);

/* 2 · emoji / marker scan */
const emojiRe = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}]/gu;
for (const [name, text] of Object.entries(files)) {
  const hits = text.match(emojiRe) || [];
  ok(hits.length === 0, `${name} emoji/arrow chars: ${hits.length} (expect 0)`);
}

/* 3 · raw color audit in css (outside :root) */
const noRoot = files['styles.css'].replace(/:root\s*\{[^}]*\}/g, '');
const hexOut = noRoot.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
const fnOut = noRoot.match(/\b(rgb|rgba|hsl|hsla|oklch|oklab|lab|lch)\(/g) || [];
ok(hexOut.length === 0, `css raw hex outside :root: ${hexOut.length} (expect 0)`);
ok(fnOut.length === 0, `css raw color functions outside :root: ${fnOut.length} (expect 0)`);

/* 4 · reference integrity */
const skip = (ref) => /^(https?:|mailto:|data:|#)/.test(ref);
const htmlRefs = [...files['index.html'].matchAll(/(?:href|src)="([^"]*)"/g)].map((m) => m[1]).filter((r) => r && !skip(r));
const missingHtml = htmlRefs.filter((r) => !fs.existsSync(path.join(site, r)));
ok(missingHtml.length === 0, `index.html local refs missing: ${missingHtml.join(', ') || 'none'}`);

const cssRefs = [...files['styles.css'].matchAll(/url\(["']?([^"')]+)["']?\)/g)].map((m) => m[1]).filter((r) => !skip(r));
const missingCss = cssRefs.filter((r) => !fs.existsSync(path.join(site, 'assets', r)));
ok(missingCss.length === 0, `styles.css local url() refs missing: ${missingCss.join(', ') || 'none'}`);

console.log('local refs checked: html=' + htmlRefs.length + ' css=' + cssRefs.length);
console.log(failures ? `\nAUDIT FAILED (${failures})` : '\nAUDIT PASSED');
process.exit(failures ? 1 : 0);
