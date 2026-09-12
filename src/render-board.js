// Re-exporta el board HTML legacy (archivo/diseno-html) a PNG en salida/
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const paths = require('./paths');

const ROOT = paths.ARCHIVO_DISENO_HTML;
const OUT = paths.SALIDA;
const SCALE = 2;
const PORT = 8931;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml',
};

function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      const p = path.join(ROOT, decodeURIComponent(req.url.split('?')[0]));
      fs.readFile(p, (err, data) => {
        if (err) { rsp.writeHead(404); rsp.end(); return; }
        rsp.writeHead(200, { 'Content-Type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream' });
        rsp.end(data);
      });
    }).listen(PORT, () => res(srv));
  });
}

function slug(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function categorize(label) {
  if (/^Logo opcion/.test(label)) return 'logos';
  if (/^Post /.test(label)) return 'posts';
  if (/^Story /.test(label)) return 'stories';
  if (/^Portada .+/.test(label)) return 'destacadas';
  if (/^Catalogo|^Catálogo/.test(label)) return 'catalogo';
  if (/^Menu|^Menú/.test(label)) return 'menu-carta';
  if (/^Flyer /.test(label)) return 'flyers';
  if (/^Promo /.test(label)) return 'promocionales';
  return 'marca';
}

(async () => {
  const srv = await serve();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: SCALE,
  });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:${PORT}/render.html`);
  await page.waitForFunction('window.__ready === true', null, { timeout: 30000 });

  const frames = await page.evaluate('window.FRAMES.map(f => ({label: f.label, w: f.w, h: f.h}))');
  console.log(`Frames detectados: ${frames.length}`);

  const counters = {};
  for (let i = 0; i < frames.length; i++) {
    const info = await page.evaluate(`window.show(${i})`);
    const w = info.w, h = info.h;
    await page.setViewportSize({ width: w, height: h });
    await page.evaluate('window.assetsReady()');
    await page.waitForTimeout(150);

    const cat = categorize(info.label);
    counters[cat] = (counters[cat] || 0) + 1;
    const dir = path.join(OUT, cat);
    fs.mkdirSync(dir, { recursive: true });
    const name = `${String(counters[cat]).padStart(2, '0')}-${slug(info.label)}.png`;
    const file = path.join(dir, name);
    await page.screenshot({ path: file, fullPage: false, type: 'png' });
    console.log(`salida/${cat}/${name}  (${w}x${h} @${SCALE}x)`);
  }

  await browser.close();
  srv.close();
  console.log('LISTO');
})().catch(e => { console.error(e); process.exit(1); });
