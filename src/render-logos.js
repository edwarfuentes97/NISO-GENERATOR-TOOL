// ============================================================
// LOGOS — monograma, sello y wordmark en fondos de marca y transparente
// Los textos (nombre, tagline, ciudad, EST.) salen de marca.js
// Uso: npm run logos
// ============================================================
const { render, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'logos',

  // Textos del sello circular (por defecto salen de marca.js)
  sello: {
    arriba: MARCA.tagline.toUpperCase(),     // texto del arco superior
    abajo: MARCA.region.toUpperCase(),        // texto del arco inferior
    centro: MARCA.nombre,
    est: MARCA.est,
  },

  // Qué variantes generar: comenta las líneas que no necesites
  variantes: [
    'monograma-fondo-dorado', 'monograma-fondo-oscuro', 'monograma-fondo-crema',
    'monograma-transparente-oscuro', 'monograma-transparente-crema',
    'sello-fondo-oscuro', 'sello-transparente-crema', 'sello-transparente-oscuro',
    'wordmark-fondo-crema', 'wordmark-fondo-oscuro',
    'wordmark-transparente-oscuro', 'wordmark-transparente-crema',
  ],
};
// ----------------------------------------------------

function monogram(fg, sub, border) {
  return `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <div style="width:280px;height:280px;border:2px solid ${border};display:flex;align-items:center;justify-content:center;">
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:220px;line-height:1;color:${fg};">${MARCA.monograma}</span>
    </div>
    <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:96px;letter-spacing:.28em;color:${fg};margin-top:48px;padding-left:.28em;">${MARCA.nombre}</div>
    <div style="font-family:'Jost',sans-serif;font-weight:500;font-size:24px;letter-spacing:.5em;text-transform:uppercase;color:${sub};margin-top:16px;padding-left:.5em;">${MARCA.tagline}</div>
  </div>`;
}

function seal(ring, text, center, accent, size) {
  const s = CONFIG.sello;
  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
  <svg width="${size}" height="${size}" viewBox="0 0 200 200">
    <defs><path id="ringTop" d="M100,100 m-78,0 a78,78 0 1,1 156,0"/><path id="ringBot" d="M100,100 m78,0 a78,78 0 1,1 -156,0"/></defs>
    <circle cx="100" cy="100" r="93" fill="none" stroke="${ring}" stroke-width="0.7"/>
    <circle cx="100" cy="100" r="86" fill="none" stroke="${ring}" stroke-width="1.6"/>
    <circle cx="100" cy="100" r="58" fill="none" stroke="${ring}" stroke-width="0.7"/>
    <text font-family="Jost" font-weight="500" font-size="8.4" letter-spacing="4.4" fill="${text}"><textPath href="#ringTop" startOffset="50%" text-anchor="middle">${s.arriba}</textPath></text>
    <text font-family="Jost" font-weight="500" font-size="8.4" letter-spacing="4.4" fill="${text}"><textPath href="#ringBot" startOffset="50%" text-anchor="middle">${s.abajo}</textPath></text>
    <text x="100" y="94" text-anchor="middle" font-family="Cormorant Garamond" font-weight="600" font-size="52" letter-spacing="3" fill="${center}">${s.centro}</text>
    <text x="100" y="122" text-anchor="middle" font-family="Jost" font-weight="400" font-size="7.5" letter-spacing="6" fill="${accent}">${s.est}</text>
    <circle cx="70" cy="100" r="1.3" fill="${accent}"/><circle cx="130" cy="100" r="1.3" fill="${accent}"/>
  </svg></div>`;
}

function wordmark(fg, sub, line) {
  return `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:250px;line-height:.82;color:${fg};letter-spacing:.16em;padding-left:.16em;">${MARCA.nombre}</div>
    <div style="width:420px;height:1px;background:${line};margin:36px 0 30px;"></div>
    <div style="font-family:'Jost',sans-serif;font-weight:500;font-size:44px;letter-spacing:.66em;text-transform:uppercase;color:${sub};padding-left:.66em;">${MARCA.tagline}</div>
  </div>`;
}

function conFondo(html, bg, w, h) {
  return `<div style="width:${w}px;height:${h}px;background:${bg};">${html}</div>`;
}

const DEFS = {
  'monograma-fondo-dorado':        { w: 1200, h: 1200, bg: C.dorado, html: () => monogram(C.oscuro, C.marron, C.oscuro) },
  'monograma-fondo-oscuro':        { w: 1200, h: 1200, bg: C.oscuro, html: () => monogram(C.crema, C.dorado, C.dorado) },
  'monograma-fondo-crema':         { w: 1200, h: 1200, bg: C.crema, html: () => monogram(C.oscuro, C.marron, C.oscuro) },
  'monograma-transparente-oscuro': { w: 1200, h: 1200, bg: null, html: () => monogram(C.oscuro, C.marron, C.oscuro) },
  'monograma-transparente-crema':  { w: 1200, h: 1200, bg: null, html: () => monogram(C.crema, C.dorado, C.dorado) },
  'sello-fondo-oscuro':            { w: 1440, h: 1440, bg: C.oscuro, html: () => seal(C.dorado, C.beige, C.crema, C.dorado, 1160) },
  'sello-transparente-crema':      { w: 1440, h: 1440, bg: null, html: () => seal(C.dorado, C.beige, C.crema, C.dorado, 1160) },
  'sello-transparente-oscuro':     { w: 1440, h: 1440, bg: null, html: () => seal(C.marron, C.oscuro, C.oscuro, C.marron, 1160) },
  'wordmark-fondo-crema':          { w: 2400, h: 900, bg: C.crema, html: () => wordmark(C.oscuro, C.marron, C.dorado) },
  'wordmark-fondo-oscuro':         { w: 2400, h: 900, bg: C.oscuro, html: () => wordmark(C.crema, C.dorado, C.dorado) },
  'wordmark-transparente-oscuro':  { w: 2400, h: 900, bg: null, html: () => wordmark(C.oscuro, C.marron, C.dorado) },
  'wordmark-transparente-crema':   { w: 2400, h: 900, bg: null, html: () => wordmark(C.crema, C.dorado, C.dorado) },
};

const FRAMES = CONFIG.variantes.map((v, i) => {
  const d = DEFS[v];
  if (!d) { console.error(`Variante desconocida: ${v}`); process.exit(1); }
  const inner = d.html();
  return {
    name: `${String(i + 1).padStart(2, '0')}-${v}`,
    w: d.w, h: d.h,
    html: d.bg ? conFondo(inner, d.bg, d.w, d.h) : inner,
    transparente: !d.bg,
  };
});

render(CONFIG.carpetaSalida, FRAMES);
