// ============================================================
// PORTADAS DE DESTACADAS — círculos 560×560 (salen a 1120×1120)
// Uso: npm run destacadas
// ============================================================
const { render, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'destacada-carta',

  // texto: palabra de la portada (cursiva elegante)
  // fondo: 'oscuro' (café + texto crema) | 'dorado' (dorado + texto café) | 'crema'
  portadas: [
    { texto: 'Carta', fondo: 'oscuro' },
    { texto: 'La Carta', fondo: 'oscuro' },
    { texto: 'Carta', fondo: 'dorado' },
    { texto: 'Productos', fondo: 'oscuro' },
    { texto: 'Precios', fondo: 'dorado' },
    { texto: 'Carta', fondo: 'crema' },
  ],
};
// ----------------------------------------------------

const S = 560;

const FONDOS = {
  oscuro: { bg: C.oscuro, fg: C.crema, linea: C.dorado, anillo: 'rgba(199,154,94,.55)' },
  dorado: { bg: C.dorado, fg: C.oscuro, linea: C.oscuro, anillo: 'rgba(46,32,24,.5)' },
  crema:  { bg: C.crema, fg: C.oscuro, linea: C.dorado, anillo: 'rgba(168,122,67,.55)' },
};

function portada({ texto, fondo }) {
  const f = FONDOS[fondo || 'oscuro'];
  // el tamaño de letra baja un poco para palabras largas
  const size = texto.length > 8 ? 76 : 96;
  return `
  <div style="width:${S}px;height:${S}px;border-radius:50%;background:${f.bg};display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;">
    <div style="position:absolute;inset:34px;border:1px solid ${f.anillo};border-radius:50%;"></div>
    <span style="width:70px;height:1px;background:${f.linea};margin-bottom:26px;"></span>
    <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:${size}px;color:${f.fg};">${texto}</span>
  </div>`;
}

function slug(s) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

const FRAMES = CONFIG.portadas.map((p, i) => ({
  name: `${String(i + 1).padStart(2, '0')}-${slug(p.texto)}`,
  w: S, h: S,
  html: portada(p),
  transparente: true,   // el PNG queda redondo con esquinas transparentes
}));

render(CONFIG.carpetaSalida, FRAMES);
