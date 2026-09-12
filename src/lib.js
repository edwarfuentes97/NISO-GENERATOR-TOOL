// ============================================================
// MOTOR DE RENDER — compartido por todos los generadores.
// ============================================================
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const MARCA = require('./marca');
const paths = require('./paths');

const ASSETS = paths.ENTRADA_LISTAS_GENERAL;
const OUT_BASE = paths.SALIDA;
const PORT = 8933;
const SCALE = 2;

const C = MARCA.colores;

const HEAD = `
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600&family=Sacramento&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:${C.oscuro};-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}img{display:block}</style>`;

function foto(nombre) {
  return `http://localhost:${PORT}/${nombre}`;
}

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
function serve(assetsDir = ASSETS, port = PORT) {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '');
      const p = path.join(assetsDir, rel);
      if (!p.startsWith(path.resolve(assetsDir))) {
        rsp.writeHead(403);
        rsp.end();
        return;
      }
      fs.readFile(p, (err, data) => {
        if (err) { rsp.writeHead(404); rsp.end(); return; }
        rsp.writeHead(200, { 'Content-Type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream' });
        rsp.end(data);
      });
    }).listen(port, () => res(srv));
  });
}

async function render(carpeta, frames, { fondoTransparente = false, assetsDir = ASSETS, port = PORT } = {}) {
  const OUT = path.join(OUT_BASE, carpeta);
  fs.mkdirSync(OUT, { recursive: true });
  const srv = await serve(assetsDir, port);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: SCALE });
  const page = await ctx.newPage();

  for (const f of frames) {
    await page.setViewportSize({ width: f.w, height: f.h });
    const bodyBg = f.transparente || fondoTransparente ? 'background:transparent;' : '';
    await page.setContent(
      `<!DOCTYPE html><html><head>${HEAD}</head><body style="width:${f.w}px;height:${f.h}px;${bodyBg}">${f.html}</body></html>`,
      { waitUntil: 'networkidle' }
    );
    await page.evaluate('document.fonts.ready.then(()=>true)');
    await page.evaluate('Promise.all([...document.images].map(im=>im.decode().catch(()=>{})))');
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, f.name + '.png'), type: 'png', omitBackground: !!(f.transparente || fondoTransparente) });
    console.log(`salida/${carpeta}/${f.name}.png  (${f.w * SCALE}x${f.h * SCALE}${f.transparente ? ', transparente' : ''})`);
  }
  await browser.close();
  srv.close();
  console.log('LISTO');
}

module.exports = { render, foto, HEAD, MARCA, C, SCALE, paths, ASSETS, OUT_BASE };
