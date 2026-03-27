import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const port = Number(process.env.PORT || 4173);

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.svg', 'image/svg+xml'],
  ['.md', 'text/markdown; charset=utf-8']
]);

function resolvePath(urlPath) {
  const relative = decodeURIComponent(String(urlPath || '/').split('?')[0]);
  const candidate = relative === '/' ? 'index.html' : relative.replace(/^\/+/, '');
  return path.join(distDir, candidate);
}

async function readFileSafe(filePath) {
  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      return await fs.readFile(path.join(filePath, 'index.html'));
    }
    return await fs.readFile(filePath);
  } catch (error) {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const filePath = resolvePath(req.url);
  const content = await readFileSafe(filePath);

  if (!content) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeType = mimeTypes.get(ext) || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mimeType });
  res.end(content);
});

server.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
