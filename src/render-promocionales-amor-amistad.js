// ============================================================
// PROMOCIONALES — Campaña Amor y Amistad
// Cuadrados 1080×1080 y verticales 1080×1920 (misma línea que promos).
// Fotos: npm run preparar-amor-amistad  →  entrada/listas/amor-amistad/
// Uso: npm run promos-amor-amistad
// ============================================================
const { render, foto, MARCA, C, paths } = require('./lib');

const ASSETS = paths.ENTRADA_LISTAS_AMOR_AMISTAD;

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'promocionales-amor-amistad',

  promos: [
    {
      formato: 'cuadrado',
      nombre: '01-caja-corazon-feed',
      img: '01-caja-corazon.jpg',
      pos: 'center 42%',
      kicker: 'Amor y amistad',
      titulo: 'Regala<br>dulzura',
      sub: 'Cajas con mini postres · por encargo',
    },
    {
      formato: 'vertical',
      nombre: '02-caja-corazon-story',
      img: '01-caja-corazon.jpg',
      pos: 'center 38%',
      kicker: 'Temporada especial',
      titulo: 'Para<br>compartir',
      frase: 'Corazón red velvet · cupcakes · frutos rojos',
      cta: 'Pedir ahora',
    },
    {
      formato: 'cuadrado',
      nombre: '03-detalle-corazon-feed',
      img: '02-detalle-corazon.jpg',
      pos: 'center 48%',
      kicker: 'Hecho a mano',
      titulo: 'Con<br>amor',
      sub: 'Mini torta corazón · frosting de queso crema',
    },
    {
      formato: 'vertical',
      nombre: '04-detalle-corazon-story',
      img: '02-detalle-corazon.jpg',
      pos: 'center 45%',
      kicker: 'Recién horneado',
      titulo: 'Antójate',
      frase: `${MARCA.eslogan} · ${MARCA.ciudad}`,
      cta: 'Pedir ahora',
    },
    {
      formato: 'cuadrado',
      nombre: '05-panoramica-feed',
      img: '03-caja-panoramica.jpg',
      pos: 'center 40%',
      kicker: 'Detalle que enamora',
      titulo: 'Dulce<br>regalo',
      sub: 'Ideal para sorprender a quien más quieres',
    },
    {
      formato: 'vertical',
      nombre: '06-panoramica-story',
      img: '03-caja-panoramica.jpg',
      pos: 'center 36%',
      kicker: 'NISO · Amor y amistad',
      titulo: 'El arte<br>de regalar',
      frase: MARCA.pie,
      cta: 'WhatsApp',
    },
  ],
};
// ----------------------------------------------------

function monogramaTop(top, size, fsize) {
  return `<div style="position:absolute;top:${top}px;left:50%;transform:translateX(-50%);width:${size}px;height:${size}px;border:2px solid ${C.doradoClaro};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:${fsize}px;line-height:1;color:${C.crema};">${MARCA.monograma}</span></div>`;
}

function promoCuadrado({ img, pos, kicker, titulo, sub }) {
  const W = 1080, H = 1080;
  return {
    w: W,
    h: H,
    html: `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:250px;background:linear-gradient(to bottom,rgba(24,15,9,.55),transparent);"></div>
    ${monogramaTop(52, 84, 60)}
    <div style="position:absolute;left:0;right:0;bottom:0;height:580px;background:linear-gradient(to top,rgba(22,13,8,.92),rgba(22,13,8,.35) 36%,transparent);"></div>
    <div style="position:absolute;left:76px;right:76px;bottom:86px;">
      <div style="font-family:'Jost',sans-serif;font-size:25px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:22px;">${kicker}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:118px;line-height:.96;color:${C.cremaCalida};">${titulo}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:28px;letter-spacing:.1em;color:rgba(247,240,226,.82);margin-top:24px;">${sub}</div>
    </div>
  </div>`,
  };
}

function promoVertical({ img, pos, kicker, titulo, frase, cta }) {
  const W = 1080, H = 1920;
  return {
    w: W,
    h: H,
    html: `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:360px;background:linear-gradient(to bottom,rgba(24,15,9,.55),transparent);"></div>
    ${monogramaTop(70, 96, 68)}
    <div style="position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(to top,rgba(22,13,8,.94),rgba(22,13,8,.3) 44%,transparent);"></div>
    <div style="position:absolute;left:72px;right:72px;bottom:${cta ? 300 : 220}px;">
      <div style="font-family:'Jost',sans-serif;font-size:28px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:24px;">${kicker}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:172px;line-height:.9;color:${C.cremaCalida};">${titulo}</div>
      ${frase ? `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:52px;color:${C.beige};margin-top:20px;">${frase}</div>` : ''}
    </div>
    ${cta ? `<div style="position:absolute;bottom:120px;left:50%;transform:translateX(-50%);background:${C.dorado};color:${C.oscuro};font-family:'Jost',sans-serif;font-weight:500;font-size:32px;letter-spacing:.24em;text-transform:uppercase;padding:30px 64px;border-radius:60px;white-space:nowrap;">${cta}</div>` : ''}
  </div>`,
  };
}

const FRAMES = CONFIG.promos.map(p => {
  const built = p.formato === 'vertical' ? promoVertical(p) : promoCuadrado(p);
  return { name: p.nombre, ...built };
});

render(CONFIG.carpetaSalida, FRAMES, { assetsDir: ASSETS });
