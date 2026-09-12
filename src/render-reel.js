const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURACIÓN DEL REEL — edita esto para cada reel nuevo
// ============================================================
const REEL = {
  // Subcarpeta de salida dentro de salida/
  carpetaSalida: 'reel-proceso-cheesecake-frutos-rojos',

  // Etiqueta pequeña que acompaña el número de paso en cada foto
  kicker: 'El proceso · Cheesecake',

  // Textos de la tarjeta de portada (frame 00)
  portada: {
    superior: 'Panadería Artesanal · Tuluá',   // línea arriba del todo
    etiqueta: 'El proceso',                     // texto pequeño sobre el título
    titulo: 'Cheesecake de<br>Frutos Rojos',    // título grande — usa <br> para saltos de línea
    frase: 'hecho a mano, paso a paso',         // frase en cursiva bajo el título
    inferior: 'El arte de lo horneado',         // línea abajo del todo
  },
};
// ============================================================

// Carpeta con las fotos YA convertidas a .jpg (el navegador no lee HEIC).
// Fotos listas en entrada/listas/general/ (npm run preparar-fotos)
const paths = require('./paths');
const ASSETS = paths.ENTRADA_LISTAS_GENERAL;
const OUT = path.join(paths.SALIDA, REEL.carpetaSalida);
const SCALE = 2;
const PORT = 8932;
const W = 1080, H = 1920;

// Paleta NISO
const DARK = '#2E2018', CREAM = '#F5EDDE', GOLD = '#C79A5E', LIGHTGOLD = '#E7C99A', WARMWHITE = '#F7F0E2';

const HEAD = `
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0;padding:0}body{background:${DARK};-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}img{display:block}</style>`;

// Marca de agua superior: monograma + wordmark (estilo del manual NISO)
const brandTop = `
  <div style="position:absolute;top:110px;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:26px;">
    <div style="width:76px;height:76px;border:2px solid ${GOLD};display:flex;align-items:center;justify-content:center;background:rgba(24,15,9,.25);">
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:56px;line-height:1;color:${WARMWHITE};">N</span>
    </div>
    <span style="font-family:'Jost',sans-serif;font-weight:500;font-size:30px;letter-spacing:.5em;text-transform:uppercase;color:${WARMWHITE};padding-left:.5em;text-shadow:0 2px 14px rgba(0,0,0,.45);">NISO</span>
  </div>`;

function photoFrame({ img, pos, step, title, sub, cta }) {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${DARK};overflow:hidden;">
    <img src="http://localhost:${PORT}/${img}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:380px;background:linear-gradient(to bottom,rgba(24,15,9,.6),transparent);"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:1000px;background:linear-gradient(to top,rgba(22,13,8,.97) 18%,rgba(22,13,8,.55) 48%,transparent);"></div>
    ${brandTop}
    <div style="position:absolute;left:72px;right:72px;bottom:${cta ? 330 : 260}px;">
      <div style="display:flex;align-items:baseline;gap:30px;margin-bottom:26px;">
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:96px;line-height:.8;color:${GOLD};">${step}</span>
        <span style="font-family:'Jost',sans-serif;font-size:28px;letter-spacing:.42em;text-transform:uppercase;color:${LIGHTGOLD};">${REEL.kicker}</span>
      </div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:140px;line-height:.94;color:${WARMWHITE};">${title}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:36px;letter-spacing:.08em;color:rgba(247,240,226,.88);margin-top:28px;line-height:1.35;">${sub}</div>
    </div>
    ${cta ? `<div style="position:absolute;bottom:130px;left:50%;transform:translateX(-50%);background:${GOLD};color:${DARK};font-family:'Jost',sans-serif;font-weight:500;font-size:32px;letter-spacing:.24em;text-transform:uppercase;padding:30px 64px;border-radius:60px;white-space:nowrap;">${cta}</div>` : ''}
  </div>`;
}

function introFrame() {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${DARK};overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:54px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="position:absolute;top:150px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:26px;letter-spacing:.42em;text-transform:uppercase;color:${GOLD};">${REEL.portada.superior}</div>
    <div style="text-align:center;padding:0 90px;">
      <div style="display:flex;justify-content:center;margin-bottom:56px;"><div style="width:150px;height:150px;border:2px solid ${GOLD};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:112px;line-height:1;color:${CREAM};">N</span></div></div>
      <div style="font-family:'Jost',sans-serif;font-size:30px;letter-spacing:.62em;text-transform:uppercase;color:#A6947C;margin-bottom:44px;padding-left:.62em;">${REEL.portada.etiqueta}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:148px;line-height:1;color:${CREAM};white-space:nowrap;">${REEL.portada.titulo}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:36px;margin-top:60px;">
        <span style="width:110px;height:1px;background:rgba(199,154,94,.6);"></span>
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:52px;color:#E7D3B0;">${REEL.portada.frase}</span>
        <span style="width:110px;height:1px;background:rgba(199,154,94,.6);"></span>
      </div>
    </div>
    <div style="position:absolute;bottom:150px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:26px;letter-spacing:.3em;text-transform:uppercase;color:${GOLD};">${REEL.portada.inferior}</div>
  </div>`;
}

const FRAMES = [
  { name: '00-portada', html: introFrame() },
  { name: '01-los-ingredientes', html: photoFrame({ img: 'frutosRojos1.jpg', step: '01', title: 'Los ingredientes', sub: 'Todo pesado al gramo, nada al ojo' }) },
  { name: '02-al-horno', html: photoFrame({ img: 'frutosRojos3.jpg', step: '02', title: 'Al horno', sub: 'Cocción lenta, a baja temperatura' }) },
  { name: '03-el-desmolde', html: photoFrame({ img: 'frutosRojos5.jpg', step: '03', title: 'El desmolde', sub: 'Cremoso, de bordes limpios' }) },
  { name: '04-frutos-rojos', html: photoFrame({ img: 'frutosRojos6.jpg', step: '♥', title: 'Frutos rojos', sub: 'Glaseado casero, brillante y fresco', cta: 'Encarga el tuyo → WhatsApp' }) },
];

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png' };
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      const p = path.join(ASSETS, decodeURIComponent(req.url.split('?')[0]));
      fs.readFile(p, (err, data) => {
        if (err) { rsp.writeHead(404); rsp.end(); return; }
        rsp.writeHead(200, { 'Content-Type': MIME[path.extname(p).toLowerCase()] || 'application/octet-stream' });
        rsp.end(data);
      });
    }).listen(PORT, () => res(srv));
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = await serve();
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: SCALE });
  const page = await ctx.newPage();

  for (const f of FRAMES) {
    await page.setContent(`<!DOCTYPE html><html><head>${HEAD}</head><body>${f.html}</body></html>`, { waitUntil: 'networkidle' });
    await page.evaluate(`document.fonts.ready.then(()=>true)`);
    await page.evaluate(`Promise.all([...document.images].map(im=>im.decode().catch(()=>{})))`);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, f.name + '.png'), type: 'png' });
    console.log(`${f.name}.png  (${W * SCALE}x${H * SCALE})`);
  }
  await browser.close();
  srv.close();
  console.log('LISTO');
})().catch(e => { console.error(e); process.exit(1); });
