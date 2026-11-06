/* Serves the whole ai-tools-directory folder (so /_diag and /site share an origin)
   and logs diagnostics payloads to _diag/last-report.txt.
   Run: node _diag/serve-diag.mjs  (http://127.0.0.1:8892, auto-stops after 8 min) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const dir = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(dir, '..');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.txt': 'text/plain; charset=utf-8'
};

http.createServer((req, res) => {
  const u = new URL(req.url || '/', 'http://127.0.0.1');
  if (u.pathname === '/__log') {
    const d = u.searchParams.get('d') || '';
    fs.writeFileSync(path.join(dir, 'last-report.txt'), d, 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }
  let p = decodeURIComponent(u.pathname);
  if (p === '/') { p = '/site/index.html'; }
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8892, '127.0.0.1', () => {
  console.log('diag server: http://127.0.0.1:8892  (root: ' + root + ')');
  setTimeout(() => process.exit(0), 480000);
});
