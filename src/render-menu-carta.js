// ============================================================
// MENÚ / CARTA — A4 1240×1754 (sale a 2480×3508 = 300dpi, imprimible)
// Cada página lleva secciones y cada sección sus productos.
// Uso: npm run menu
// ============================================================
const { render, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'menu-carta-nuevo',

  paginas: [
    {
      nombre: '01-menu-pag-1',
      cabecera: true,     // true = página con el encabezado grande NISO
      secciones: [
        {
          titulo: 'Panadería',
          items: [
            { nombre: 'Babka de chocolate', en: 'chocolate babka', desc: 'Masa brioche trenzada a mano, corazón de chocolate. Nuestra especialidad.' },
            { nombre: 'Rollos de canela', en: 'cinnamon rolls', desc: 'Suaves y esponjosos, con frosting de queso crema.' },
          ],
        },
        {
          titulo: 'Repostería',
          items: [
            { nombre: 'Cheesecake de arándanos', en: 'blueberry', desc: 'Cremoso, sobre base artesanal, con compota de arándanos.' },
            { nombre: 'Torta almendrada', en: 'almond cake', desc: 'De banano, con almendras tostadas y chispas de chocolate.' },
          ],
        },
      ],
    },
    // Agrega más páginas copiando el bloque de arriba
    // (usa cabecera: false para páginas de continuación, así cabe más contenido)
  ],
};
// ----------------------------------------------------

const W = 1240, H = 1754;

function cabecera() {
  return `
  <div style="height:440px;background:${C.oscuro};display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;flex:none;">
    <div style="position:absolute;inset:34px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="font-family:'Jost',sans-serif;font-size:20px;letter-spacing:.5em;text-transform:uppercase;color:${C.dorado};padding-left:.5em;">${MARCA.tagline}</div>
    <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:130px;letter-spacing:.22em;color:${C.crema};margin-top:14px;padding-left:.22em;">${MARCA.nombre}</div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:38px;color:${C.beige};margin-top:8px;">${MARCA.eslogan}</div>
  </div>`;
}

function cabeceraMini() {
  return `
  <div style="height:200px;background:${C.oscuro};display:flex;align-items:center;justify-content:center;gap:34px;flex:none;">
    <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:64px;letter-spacing:.22em;color:${C.crema};padding-left:.22em;">${MARCA.nombre}</span>
    <span style="width:1px;height:56px;background:rgba(199,154,94,.5);"></span>
    <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:34px;color:${C.beige};">${MARCA.eslogan}</span>
  </div>`;
}

function item({ nombre, en, desc }) {
  return `
  <div style="margin-bottom:44px;">
    <div style="display:flex;align-items:baseline;gap:16px;">
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:52px;color:${C.oscuro};">${nombre}</span>
      <span style="flex:1;border-bottom:1px dotted rgba(90,60,42,.4);"></span>
      <span style="font-family:'Jost',sans-serif;font-size:22px;letter-spacing:.08em;color:${C.marronDorado};">${en || ''}</span>
    </div>
    <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:28px;color:${C.marron};margin-top:12px;line-height:1.4;">${desc}</div>
  </div>`;
}

function seccion({ titulo, items }, primera) {
  return `
  <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:60px;color:${C.oscuro};${primera ? '' : 'margin-top:70px;'}">${titulo}</div>
  <div style="width:100%;height:1px;background:rgba(199,154,94,.6);margin:24px 0 40px;"></div>
  ${items.map(item).join('')}`;
}

function pagina({ cabecera: conCabecera, secciones }) {
  return `
  <div style="width:${W}px;height:${H}px;background:${C.crema};overflow:hidden;display:flex;flex-direction:column;">
    ${conCabecera ? cabecera() : cabeceraMini()}
    <div style="flex:1;padding:80px 90px;display:flex;flex-direction:column;">
      ${secciones.map((s, i) => seccion(s, i === 0)).join('')}
      <div style="margin-top:auto;text-align:center;font-family:'Jost',sans-serif;font-size:22px;letter-spacing:.3em;text-transform:uppercase;color:${C.marronDorado};padding-top:40px;">${MARCA.pie}</div>
    </div>
  </div>`;
}

const FRAMES = CONFIG.paginas.map(p => ({ name: p.nombre, w: W, h: H, html: pagina(p) }));

render(CONFIG.carpetaSalida, FRAMES);
