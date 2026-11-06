/* AI Atlas — data validator. Run: node tools/validate-data.mjs */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import url from 'node:url';

const dir = path.dirname(url.fileURLToPath(import.meta.url));
const file = path.resolve(dir, '../site/assets/data.js');
const src = fs.readFileSync(file, 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(src, ctx);
const d = ctx.window.ATLAS_DATA;

let failures = 0;
const ok = (cond, msg) => {
  console.log((cond ? 'PASS ' : 'FAIL ') + msg);
  if (!cond) failures++;
};

const BANNED = [
  'elevate', 'seamless', 'seamlessly', 'unleash', 'supercharge', 'game-chang',
  'revolution', 'cutting-edge', 'next-gen', 'state-of-the-art', 'effortless',
  'unlock', 'empower', 'transform your', 'boost your', '10x', 'ai-powered',
  'harness the power', 'next level', 'look no further', 'best-in-class',
  'industry-leading', 'delve', "in today's"
];

ok(d && Array.isArray(d.tools), 'ATLAS_DATA.tools is an array');
ok(d.tools.length === 103, `tools count: ${d.tools.length} (expect 103)`);
ok(Array.isArray(d.categories) && d.categories.length === 10, `categories: ${(d.categories || []).length} (expect 10)`);

const slugs = new Set(d.categories.map((c) => c.slug));
const ids = new Set();
const names = new Set();
let idDup = 0, nameDup = 0, badCat = 0, badPricing = 0, badUrl = 0, badTags = 0;
let badTagline = [], badDesc = [], bannedHits = [], banged = [], badSentence = [];

for (const t of d.tools) {
  if (ids.has(t.id)) idDup++; ids.add(t.id);
  if (names.has(t.name)) nameDup++; names.add(t.name);
  if (!slugs.has(t.category)) badCat++;
  if (!['free', 'freemium', 'paid'].includes(t.pricing)) badPricing++;
  if (!/^https:\/\/\S+$/.test(t.url)) badUrl++;
  if (!Array.isArray(t.tags) || t.tags.length < 3 || t.tags.length > 4 || t.tags.some((x) => !/^[a-z0-9-]+$/.test(x))) badTags++;

  const tw = (t.tagline || '').trim().split(/\s+/).length;
  if (tw < 5 || tw > 10) badTagline.push(`${t.id} (${tw}w)`);

  const dw = (t.desc || '').trim().split(/\s+/).length;
  if (dw < 20 || dw > 48) badDesc.push(`${t.id} (${dw}w)`);
  const sc = ((t.desc || '').match(/[.!?](?=\s|$)/g) || []).length;
  if (sc !== 2) badSentence.push(`${t.id} (${sc} sentences)`);

  const blob = [t.name, t.maker, t.tagline, t.desc, t.tags.join(' ')].join(' ').toLowerCase();
  for (const w of BANNED) {
    if (blob.includes(w)) bannedHits.push(`${t.id}:${w}`);
  }
  if (/!/.test(t.tagline + ' ' + t.desc)) banged.push(t.id);
}

ok(idDup === 0, `duplicate ids: ${idDup}`);
ok(nameDup === 0, `duplicate names: ${nameDup}`);
ok(badCat === 0, `invalid category refs: ${badCat}`);
ok(badPricing === 0, `invalid pricing values: ${badPricing}`);
ok(badUrl === 0, `invalid urls: ${badUrl}`);
ok(badTags === 0, `invalid tag arrays: ${badTags}`);
ok(badTagline.length === 0, `tagline word-count issues: ${badTagline.join(', ') || 'none'}`);
ok(badDesc.length === 0, `desc word-count issues: ${badDesc.join(', ') || 'none'}`);
ok(badSentence.length === 0, `desc sentence-count issues: ${badSentence.join(', ') || 'none'}`);
ok(bannedHits.length === 0, `banned words: ${bannedHits.join(', ') || 'none'}`);
ok(banged.length === 0, `exclamation marks: ${banged.join(', ') || 'none'}`);

ok(d.picks.length === 4 && d.picks.every((p) => ids.has(p.id) && p.note && p.note.length > 40),
  `picks valid: ${d.picks.length} (expect 4, with notes)`);
ok(d.shelf.length === 8 && d.shelf.every((s) => ids.has(s)),
  `shelf valid: ${d.shelf.length} (expect 8)`);

const notesBanned = (d.picks || []).filter((p) => BANNED.some((w) => p.note.toLowerCase().includes(w)));
ok(notesBanned.length === 0, `pick notes clean: ${notesBanned.map((p) => p.id).join(', ') || 'ok'}`);

console.log(failures ? `\nVALIDATION FAILED (${failures})` : '\nVALIDATION PASSED');
process.exit(failures ? 1 : 0);
