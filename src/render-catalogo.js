// ============================================================
// CATÁLOGO CARRUSEL — 1080×1080 (salen a 2160×2160)
// Primera lámina = portada; las demás = foto + productos.
// Los puntos de paginación se generan solos.
// Uso: npm run catalogo
// ============================================================
const { render, foto, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'catalogo-nuevo',

  portada: {
    titulo: 'Catálogo',
    sub: 'Babka · Tortas · Rollos · Cheesecake',
    pie: 'Desliza →',
  },

  laminas: [
    {
      nombre: '02-reposteria',
      img: '1.jpg',                // foto superior de la lámina
      // pos: 'center 40%',        // opcional: encuadre
      categoria: 'Repostería',
      items: [
        { nombre: 'Cheesecake de arándanos', en: 'Blueberry', desc: 'Cremoso, sobre base artesanal, con compota de arándanos.' },
        { nombre: 'Torta almendrada', en: 'Almond cake', desc: 'Almendras tostadas y chispas de chocolate.' },
      ],
    },
    // Agrega más láminas copiando el bloque de arriba
  ],
};
// ----------------------------------------------------

const W = 1080, H = 1080;

function dots(total, activo) {
  return Array.from({ length: total }, (_, i) =>
    i === activo
      ? `<span style="width:40px;height:14px;border-radius:8px;background:${C.dorado};"></span>`
      : `<span style="width:14px;height:14px;border-radius:50%;background:rgba(90,60,42,.25);"></span>`
  ).join('');
}

function laminaPortada({ titulo, sub, pie }) {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:48px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="font-family:'Jost',sans-serif;font-size:24px;letter-spacing:.5em;text-transform:uppercase;color:${C.dorado};padding-left:.5em;">${MARCA.tagline}</div>
    <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:96px;letter-spacing:.28em;color:${C.crema};margin-top:28px;padding-left:.28em;">${MARCA.nombre}</div>
    <div style="width:280px;height:1px;background:${C.dorado};margin:44px 0;"></div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:120px;line-height:1;color:${C.crema};">${titulo}</div>
    <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:28px;letter-spacing:.14em;color:${C.arena};margin-top:34px;">${sub}</div>
    <div style="position:absolute;bottom:90px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:24px;letter-spacing:.4em;text-transform:uppercase;color:${C.dorado};">${pie}</div>
  </div>`;
}

function laminaProducto({ img, pos, categoria, items }, idx, total) {
  const rows = items.map(it => `
    <div style="margin-bottom:38px;">
      <div style="display:flex;align-items:baseline;justify-content:space-between;">
        <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:56px;color:${C.oscuro};">${it.nombre}</span>
        <span style="font-family:'Jost',sans-serif;font-size:22px;letter-spacing:.1em;color:${C.marronDorado};">${it.en || ''}</span>
      </div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:29px;color:${C.marron};margin-top:12px;line-height:1.4;">${it.desc}</div>
    </div>`).join('');
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.crema};overflow:hidden;display:flex;flex-direction:column;">
    <div style="height:460px;position:relative;overflow:hidden;">
      <img src="${foto(img)}" style="width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
      <div style="position:absolute;top:40px;left:40px;background:rgba(28,17,10,.55);color:${C.crema};font-family:'Jost',sans-serif;font-size:20px;letter-spacing:.3em;text-transform:uppercase;padding:12px 24px;">${MARCA.nombre} · Catálogo</div>
    </div>
    <div style="flex:1;padding:52px 64px 40px;display:flex;flex-direction:column;">
      <div style="font-family:'Jost',sans-serif;font-size:22px;letter-spacing:.4em;text-transform:uppercase;color:${C.marronDorado};">${categoria}</div>
      <div style="width:70px;height:1px;background:${C.dorado};margin:26px 0 34px;"></div>
      ${rows}
      <div style="display:flex;gap:12px;justify-content:center;margin-top:auto;padding-top:24px;">${dots(total, idx)}</div>
    </div>
  </div>`;
}

const total = CONFIG.laminas.length + 1;
const FRAMES = [
  { name: '01-portada', w: W, h: H, html: laminaPortada(CONFIG.portada) },
  ...CONFIG.laminas.map((l, i) => ({ name: l.nombre, w: W, h: H, html: laminaProducto(l, i + 1, total) })),
];

render(CONFIG.carpetaSalida, FRAMES);
