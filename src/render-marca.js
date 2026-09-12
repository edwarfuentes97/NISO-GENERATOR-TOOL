// ============================================================
// MARCA — portadas / banners de marca 3400×1560 (salen a 6800×3120)
// Sirve como portada de manual, banner, cabecera de perfil, etc.
// Uso: npm run marca
// ============================================================
const { render, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'marca-nueva',

  portadas: [
    {
      nombre: '01-portada-manual',
      etiqueta: 'Manual de marca & campaña',  // texto pequeño sobre el nombre
      // Estos salen de marca.js pero puedes sobreescribirlos:
      // superiorIzq: 'Panadería Artesanal',
      // superiorDer: 'Tuluá · Valle',
      // frase: 'El arte de lo horneado',
      // inferiorIzq: 'Baked fresh · Hecho a mano',
      // inferiorDer: 'IG @niso.bakery_ · TikTok @niso_bakery',
    },
  ],
};
// ----------------------------------------------------

const W = 3400, H = 1560;

function portada(p) {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:54px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="position:absolute;top:104px;left:0;right:0;display:flex;justify-content:space-between;padding:0 130px;font-family:'Jost',sans-serif;font-size:23px;letter-spacing:.42em;text-transform:uppercase;color:${C.dorado};">
      <span>${p.superiorIzq || MARCA.tagline}</span>
      <span>${p.superiorDer || MARCA.region}</span>
    </div>
    <div style="text-align:center;">
      <div style="display:flex;justify-content:center;margin-bottom:44px;"><div style="width:150px;height:150px;border:2px solid ${C.dorado};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:112px;line-height:1;color:${C.crema};">${MARCA.monograma}</span></div></div>
      <div style="font-family:'Jost',sans-serif;font-size:27px;letter-spacing:.62em;text-transform:uppercase;color:${C.arena};margin-bottom:30px;padding-left:.62em;">${p.etiqueta}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:400px;line-height:.78;color:${C.crema};letter-spacing:.05em;padding-left:.05em;">${MARCA.nombre}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:44px;margin-top:40px;">
        <span style="width:130px;height:1px;background:rgba(199,154,94,.6);"></span>
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:66px;color:${C.beige};">${p.frase || MARCA.eslogan}</span>
        <span style="width:130px;height:1px;background:rgba(199,154,94,.6);"></span>
      </div>
    </div>
    <div style="position:absolute;bottom:104px;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:0 130px;font-family:'Jost',sans-serif;font-size:23px;letter-spacing:.3em;text-transform:uppercase;color:${C.arena};">
      <span>${p.inferiorIzq || MARCA.pie}</span>
      <span style="color:${C.dorado};">${p.inferiorDer || MARCA.redes}</span>
    </div>
  </div>`;
}

const FRAMES = CONFIG.portadas.map(p => ({ name: p.nombre, w: W, h: H, html: portada(p) }));

render(CONFIG.carpetaSalida, FRAMES);
