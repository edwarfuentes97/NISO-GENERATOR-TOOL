// ============================================================
// POSTS DE FEED — 1080×1080 (salen a 2160×2160)
// Dos tipos: 'foto' (imagen + textos) y 'texto' (tarjeta de frase)
// Uso: npm run posts
// ============================================================
const { render, foto, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaSalida: 'posts-nuevos',

  posts: [
    {
      "tipo": "foto",
      "nombre": "1 Babka de Chocolate",
      "img": "babka_chocolate.jpg",
      "kicker": "NUESTRA ESPECIALIDAD",
      "titulo": "Babka de <br>Chocolate",
      "sub": "Chocolate babka · masa brioche trenzada a mano"
    },
    {
      "tipo": "foto",
      "nombre": "2Cheesecake Frutos Rojos Vista Superior",
      "img": "chesscake_arriba.jpg",
      "kicker": "CLÁSICO IRRESISTIBLE",
      "titulo": "Cheesecake de <br>Frutos Rojos",
      "sub": "Cremoso y suave · mermelada artesanal y fruta fresca"
    },
    {
      "tipo": "foto",
      "nombre": "3 Cheesecake Frutos Rojos Textura",
      "img": "chesscake_lado.jpg",
      "kicker": "TEXTURA PERFECTA",
      "titulo": "Cheesecake de <br>Frutos Rojos",
      "sub": "Base crocante · equilibrio perfecto de dulzor"
    },
    {
      "tipo": "foto",
      "nombre": "4 Torta Cumpleaños Chocolate",
      "img": "demo_cumpleanos.jpg",
      "kicker": "CELEBRA CON NOSOTROS",
      "titulo": "Torta de <br>Cumpleaños",
      "sub": "Doble chocolate · el regalo perfecto para tu día especial"
    },
    {
      "tipo": "foto",
      "nombre": "5 Rollos de Canela Horneados",
      "img": "rollos_canela_despues.jpg",
      "kicker": "RECIÉN HORNEADOS",
      "titulo": "Rollos de <br>Canela",
      "sub": "Esponjosos y cálidos · el aroma que enamora",
      "center": "10%"

    },
    {
      "tipo": "foto",
      "nombre": "6 Proceso Rollos de Canela",
      "img": "royo_canela_antes.jpg",
      "kicker": "HECHO A MANO",
      "titulo": "Magia en <br>preparación",
      "sub": "Abundante relleno de canela · magia en cada vuelta"
    },
    {
      "tipo": "foto",
      "nombre": "7 Torta de Maracuyá",
      "img": "torta_maracuya.jpg",
      "kicker": "TOQUE TROPICAL",
      "titulo": "Torta de <br>Maracuyá",
      "sub": "Cítrica y refrescante · cubierta con jalea natural y naranjas",
      "center": "10%"
    },
    {
      "tipo": "foto",
      "nombre": "8 Torta de Zanahoria",
      "img": "torta_zanahoria.jpg",
      "kicker": "EL FAVORITO DE TODOS",
      "titulo": "Torta de <br>Zanahoria",
      "sub": "Zanahoria fresca y toque de canela · frosting de queso crema y almendras tostadas"
    },
    {
      "tipo": "texto",
      "nombre": "ejemplo-frase",
      "frase": "Hecho a mano,<br>horneado<br>a diario",
      "pie": "Alta panadería artesanal",
      "fondo": "dorado"
    }
  ],
};
// ----------------------------------------------------

const W = 1080, H = 1080;

function postFoto({ img, pos, kicker, titulo, sub }) {
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:240px;background:linear-gradient(to bottom,rgba(24,15,9,.6),transparent);"></div>
    <div style="position:absolute;top:60px;left:0;right:0;text-align:center;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:46px;letter-spacing:.36em;color:${C.crema};padding-left:.36em;">${MARCA.nombre}</div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:640px;background:linear-gradient(to top,rgba(22,13,8,.94),rgba(22,13,8,.5) 34%,transparent);"></div>
    <div style="position:absolute;left:76px;right:76px;bottom:86px;">
      <div style="font-family:'Jost',sans-serif;font-size:25px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:22px;">${kicker}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:118px;line-height:.96;color:${C.cremaCalida};">${titulo}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:28px;letter-spacing:.1em;color:rgba(247,240,226,.82);margin-top:26px;">${sub}</div>
    </div>
  </div>`;
}

const FONDOS = {
  dorado: { bg: C.dorado, fg: C.oscuro, pie: C.marron, borde: C.oscuro },
  oscuro: { bg: C.oscuro, fg: C.crema, pie: C.dorado, borde: C.dorado },
  crema:  { bg: C.crema, fg: C.oscuro, pie: C.marronDorado, borde: C.oscuro },
};

function postTexto({ frase, pie, fondo }) {
  const f = FONDOS[fondo || 'dorado'];
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${f.bg};overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;">
    <div style="position:absolute;top:52px;left:0;right:0;display:flex;justify-content:center;"><div style="width:104px;height:104px;border:2px solid ${f.borde};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:78px;line-height:1;color:${f.fg};">${MARCA.monograma}</span></div></div>
    <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:112px;line-height:1.06;color:${f.fg};text-align:center;padding:0 90px;">${frase}</div>
    <div style="position:absolute;bottom:80px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:23px;letter-spacing:.4em;text-transform:uppercase;color:${f.pie};">${pie || MARCA.tagline}</div>
  </div>`;
}

const FRAMES = CONFIG.posts.map(p => ({
  name: p.nombre,
  w: W, h: H,
  html: p.tipo === 'texto' ? postTexto(p) : postFoto(p),
}));

render(CONFIG.carpetaSalida, FRAMES);
