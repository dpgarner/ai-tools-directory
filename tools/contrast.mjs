/* AI Atlas — contrast gate for the token pairings that carry text.
   Run: node tools/contrast.mjs */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const dir = path.dirname(url.fileURLToPath(import.meta.url));
const css = fs.readFileSync(path.resolve(dir, '../site/assets/styles.css'), 'utf8');

function getVar(name) {
  const m = css.match(new RegExp('--' + name + ':\\s*(#[0-9a-fA-F]{6})'));
  return m ? m[1] : null;
}
const bg = getVar('bg'), surface = getVar('surface'), fg = getVar('fg'), muted = getVar('muted');
const accent = getVar('accent'), accentInk = getVar('accent-ink'), accentStrong = getVar('accent-strong');

function lum(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const rows = [
  ['body text: fg on bg          (>=4.5)', fg, bg, 4.5],
  ['muted text on bg              (>=4.5)', muted, bg, 4.5],
  ['muted text on surface         (>=4.5)', muted, surface, 4.5],
  ['accent text: accent-ink on bg (>=4.5)', accentInk, bg, 4.5],
  ['accent text: accent-ink on surface (>=4.5)', accentInk, surface, 4.5],
  ['button: white on accent-strong (>=4.5)', '#ffffff', accentStrong, 4.5],
  ['glyph: accent on bg           (>=3.0)', accent, bg, 3],
  ['focus ring uses accent-ink vs bg (>=3.0)', accentInk, bg, 3]
];

let fail = 0;
for (const [label, a, b, min] of rows) {
  const r = ratio(a, b);
  const pass = r >= min;
  if (!pass) fail++;
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}: ${r.toFixed(2)}:1`);
}
if (!bg || !surface || !fg || !muted || !accent || !accentInk || !accentStrong) {
  console.log('FAIL  could not parse all tokens');
  fail++;
}
console.log(fail ? `\nCONTRAST FAILED (${fail})` : '\nCONTRAST PASSED');
process.exit(fail ? 1 : 0);
