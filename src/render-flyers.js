// ============================================================
// FLYERS — A4 1240×1754 (salen a 2480×3508 = 300dpi, listos para imprimir)
// Uso: npm run flyers
// ============================================================
const { render, foto, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'flyers-nuevos',

  flyers: [
    {
      nombre: '01-ejemplo',
      img: '1.jpg',                 // foto superior (ocupa ~60% del flyer)
      // pos: 'center 52%',         // opcional: encuadre del recorte
      kicker: 'Nuestra especialidad',
      titulo: 'La babka<br>que enamora<br>a Tuluá',
      texto: 'Masa brioche trenzada a mano y corazón de chocolate. Horneada fresca, por encargo.',
      // Los datos de contacto salen de marca.js; puedes sobreescribirlos aquí:
      // whatsapp: 'WhatsApp +57 ...',
      // instagram: '@otra.cuenta',
    },
  ],
};
// ----------------------------------------------------

const W = 1240, H = 1754;

function flyer({ img, pos, kicker, titulo, texto, whatsapp, instagram }) {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;top:0;left:0;width:100%;height:1080px;object-fit:cover;object-position:${pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:260px;background:linear-gradient(to bottom,rgba(24,15,9,.55),transparent);"></div>
    <div style="position:absolute;top:60px;left:0;right:0;text-align:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:48px;letter-spacing:.34em;color:${C.crema};padding-left:.34em;">${MARCA.nombre}</div>
    <div style="position:absolute;top:132px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:20px;letter-spacing:.44em;text-transform:uppercase;color:${C.doradoClaro};">${MARCA.tagline}</div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:820px;background:linear-gradient(to top,${C.oscuro} 62%,rgba(46,32,24,.9) 78%,transparent);"></div>
    <div style="position:absolute;left:90px;right:90px;bottom:120px;">
      <div style="font-family:'Jost',sans-serif;font-size:24px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:26px;">${kicker}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:132px;line-height:.94;color:${C.cremaCalida};">${titulo}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:32px;color:rgba(247,240,226,.85);margin-top:30px;line-height:1.5;">${texto}</div>
      <div style="display:flex;align-items:center;gap:32px;margin-top:52px;">
        <div style="background:${C.dorado};color:${C.oscuro};font-family:'Jost',sans-serif;font-weight:500;font-size:34px;letter-spacing:.04em;padding:30px 48px;border-radius:16px;">${whatsapp || MARCA.whatsapp}</div>
        <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:44px;letter-spacing:.16em;color:${C.crema};">${instagram || MARCA.instagram}</div>
      </div>
    </div>
  </div>`;
}

const FRAMES = CONFIG.flyers.map(f => ({ name: f.nombre, w: W, h: H, html: flyer(f) }));

render(CONFIG.carpetaSalida, FRAMES);
