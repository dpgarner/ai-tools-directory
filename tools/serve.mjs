/* AI Atlas — tiny static dev server for preview/screenshots.
   Run: node tools/serve.mjs  (http://127.0.0.1:8891, auto-stops after 10 min) */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const dir = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(dir, '../site');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png'
};

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
  if (p === '/') { p = '/index.html'; }
  const f = path.join(root, p);
  if (!f.startsWith(root)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8891, '127.0.0.1', () => {
  console.log('AI Atlas dev server: http://127.0.0.1:8891  (root: ' + root + ')');
  setTimeout(() => process.exit(0), 600000);
});
