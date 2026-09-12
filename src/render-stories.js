// ============================================================
// STORIES — 1080×1920 (salen a 2160×3840)
// Dos tipos: 'foto' (imagen + textos + botón opcional) y 'pasos'
// Uso: npm run stories
// ============================================================
const { render, foto, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'stories-frutos-rojos',

  stories: [
    // Anuncio del nuevo sabor
    {
      tipo: 'foto',
      nombre: '01-nuevo-sabor',
      img: 'frutosRojos6.jpg',
      kicker: 'Nuevo en la vitrina',
      titulo: 'Cheesecake de<br>Frutos Rojos',
      sub: 'Glaseado casero de frutos rojos · por encargo',
      cta: 'Pedir ahora ↑',
    },

    // Detrás de cámaras (conecta con el reel del proceso)
    {
      tipo: 'foto',
      nombre: '02-detras-de-camaras',
      img: 'frutosRojos1.jpg',
      kicker: 'Detrás de cámaras',
      titulo: 'Así<br>empieza',
      sub: 'Todo pesado al gramo · mira el proceso completo en el reel',
    },

    // Cómo pedir
    {
      tipo: 'pasos',
      nombre: '03-como-pedir',
      kicker: 'Es muy fácil',
      titulo: '¿Cómo<br>pedir?',
      pasos: [
        'Escríbenos por WhatsApp',
        'Elige tu producto y fecha',
        'Recoge o recibe a domicilio',
      ],
      cta: 'Escríbenos ↑',
    },
  ],
};
// ----------------------------------------------------

const W = 1080, H = 1920;

function ctaBtn(cta) {
  return cta ? `<div style="position:absolute;bottom:120px;left:50%;transform:translateX(-50%);background:${C.dorado};color:${C.oscuro};font-family:'Jost',sans-serif;font-weight:500;font-size:32px;letter-spacing:.24em;text-transform:uppercase;padding:30px 64px;border-radius:60px;white-space:nowrap;">${cta}</div>` : '';
}

function storyFoto({ img, pos, kicker, titulo, sub, cta }) {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:340px;background:linear-gradient(to bottom,rgba(24,15,9,.55),transparent);"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(to top,rgba(22,13,8,.94),rgba(22,13,8,.3) 44%,transparent);"></div>
    <div style="position:absolute;left:72px;right:72px;bottom:${cta ? 300 : 220}px;">
      <div style="font-family:'Jost',sans-serif;font-size:28px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:26px;">${kicker}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:150px;line-height:.94;color:${C.cremaCalida};">${titulo}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:34px;letter-spacing:.08em;color:rgba(247,240,226,.85);margin-top:30px;">${sub}</div>
    </div>
    ${ctaBtn(cta)}
  </div>`;
}

function storyPasos({ kicker, titulo, pasos, cta }) {
  const items = pasos.map((p, i) => `
    <div style="display:flex;align-items:flex-start;gap:34px;">
      <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:76px;color:${C.dorado};line-height:.8;">${i + 1}</span>
      <span style="font-family:'Jost',sans-serif;font-weight:300;font-size:44px;color:${C.beige};line-height:1.3;">${p}</span>
    </div>`).join('');
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;padding:200px 88px 160px;display:flex;flex-direction:column;">
    <div style="font-family:'Jost',sans-serif;font-size:28px;letter-spacing:.42em;text-transform:uppercase;color:${C.dorado};">${kicker}</div>
    <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:130px;line-height:.96;color:${C.crema};margin-top:20px;">${titulo}</div>
    <div style="width:200px;height:1px;background:${C.dorado};margin:64px 0;"></div>
    <div style="display:flex;flex-direction:column;gap:52px;">${items}</div>
    ${ctaBtn(cta)}
  </div>`;
}

const FRAMES = CONFIG.stories.map(s => ({
  name: s.nombre,
  w: W, h: H,
  html: s.tipo === 'pasos' ? storyPasos(s) : storyFoto(s),
}));

render(CONFIG.carpetaSalida, FRAMES);
