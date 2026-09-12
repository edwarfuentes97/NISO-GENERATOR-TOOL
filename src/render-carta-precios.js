// ============================================================
// CARTA CON PRECIOS — genera DOS entregables desde un solo CONFIG:
//   1. salida/carta-con-precios-instagram/  → imágenes 1080×1920 (reel/story)
//   2. salida/carta-con-precios-pdf/        → un PDF A4, un producto por hoja
// Un producto con varios tamaños lleva todos sus precios en la misma pieza.
// Uso: npm run carta-precios
// ============================================================
const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { render, foto, HEAD, MARCA, C } = require('./lib');

// ------------------ CONFIGURACIÓN ------------------
const CONFIG = {
  carpetaInstagram: 'carta-con-precios-instagram',
  carpetaPdf: 'carta-con-precios-pdf',
  nombrePdf: 'carta-precios-NISO.pdf',

  // Portada (primera imagen del reel y primera hoja del PDF)
  portada: {
    etiqueta: 'La carta',
    titulo: 'Nuestros<br>Precios',
    frase: 'hecho a mano, por encargo',
  },

  // Cierre (última imagen del reel)
  cierre: {
    etiqueta: 'Por encargo',
    titulo: '¿Se te<br>antojó?',
    frase: 'aparta tu pedido con anticipación',
    cta: 'Encarga por WhatsApp',
  },

  // Productos: cada uno = 1 imagen de instagram + 1 hoja del PDF.
  // precios: [{ tamano, precio }]  ·  nota: línea opcional bajo los precios
  // sinPrecio: texto que reemplaza la tabla (para precios a cotizar)
  productos: [
    {
      nombre: 'Rollos de Canela',
      en: 'Cinnamon rolls',
      img: 'rollos-canela_2.jpg',
      desc: 'Suaves y esponjosos, con frosting de queso crema.',
      precios: [{ tamano: 'Unidad', precio: '$8.000' }],
      nota: 'Desde 12 unidades: $7.500 c/u',
    },

    {
      nombre: 'Babka de Chocolate',
      en: 'Pan de chocolate',
      img: 'babka.jpg',
      desc: 'Masa brioche trenzada a mano, corazón de chocolate.',
      precios: [
        { tamano: 'Pequeña', precio: '$16.000' },
        { tamano: 'Grande · 25 cm', precio: '$26.000' },
      ],
    },

    {
      nombre: 'Cheesecake Frutos Rojos',
      en: 'Cheesecake with red fruits',
      img: 'chesscakeFrutosRojos.jpg',
      desc: 'Cremoso y suave, horneado lentamente sobre base artesanal, coronado con glaseado de frutos rojos y fruta fresca.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$32.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$52.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$79.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$99.000' },
      ],
      nota: 'Glaseado a elección: arándanos, frutos rojos o frutos amarillos',
    },

    {
      nombre: 'Cheesecake Arándanos',
      en: 'Cheesecake with arandanos',
      img: 'chesscakeArandanos.jpg',
      desc: 'Cremoso y suave, horneado lentamente sobre base artesanal, coronado con glaseado de arándanos y fruta fresca.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$32.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$52.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$79.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$99.000' },
      ],
      nota: 'Glaseado a elección: arándanos, frutos rojos o frutos amarillos',
    },

    {
      nombre: 'Tres Leches Suprema de Génova',
      en: 'Génova Supreme Three-Milk Cake',
      img: 'pastelTresLeches.jpg',
      desc: 'Suave bizcocho genovés bañado en nuestra mezcla tradicional de tres leches, coronado en la parte superior con una delicada capa de crema chantilly y trozos de chocolate semiamargo.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$22.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$38.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$62.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$96.000' },
      ],
      nota: '',
    },

    {
      nombre: 'Torta de fresa',
      en: 'Strawberry cake',
      img: 'pastelDeFresa.jpg',
      desc: 'Torta infusionada con puro extracto de fresas frescas, abundante relleno de mermelada de la casa con trozos de fruta, y coronada en la superficie con suave mermelada y fresas enteras seleccionadas.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$22.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$33.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$44.000' }
      ],
      nota: '',
    },

    {
      nombre: 'Torta de zanahoria',
      en: 'Carrot cake',
      img: 'zanahoria-simple.jpg',
      desc: 'Deliciosa torta de zanahoria con frosting de queso crema.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$17.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$24.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$39.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$64.000' },
      ],
      nota: 'Personalízala con frutos secos por $6.000 más.',
    },

    {
      nombre: 'Zanahoria - frosting de queso crema',
      en: 'Carrot cake',
      img: 'zanahoria_completa.jpg',
      desc: 'Deliciosa torta de zanahoria con frosting de queso crema.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$21.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$38.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$62.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$94.000' },
      ],
      nota: 'Personalízala con frutos secos por $6.000 más.',
    },

    {
      nombre: 'Red Velvet',
      en: 'Red velvet cake',
      img: 'red-velvet_simple.jpg',
      desc: 'Deliciosa torta de red velvet con frosting de queso crema.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$20.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$31.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$42.000' },
      ],
      nota: '',
    },

    {
      nombre: 'Red Velvet - Frosting de Queso Crema',
      en: 'Red velvet cake',
      img: 'red-velvet_completa.jpg',
      desc: 'Deliciosa torta de red velvet con frosting de queso crema.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$28.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$39.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$55.000' },
      ],
      nota: '',
    },

    {
      nombre: 'Torta de Maracuyá',
      en: 'Passion fruit cake',
      img: 'maracuya.jpg',
      desc: 'Deliciosa torta de maracuyá',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$16.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$26.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$40.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$52.000' },
      ],
      nota: 'Personalízala con frutos secos por $6.000 más.',
    },

    //torta de chocovainilla marmoleada
    {
      nombre: 'Torta de Chocovainilla Marmoleada',
      en: 'Marbled chocolate-vanilla cake',
      img: 'torta-chocovainilla.jpg',
      desc: 'Deliciosa torta de choco-vainilla marmoleada',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$10.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$17.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$28.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$37.000' },
      ],
      nota: 'Personalízala con frutos secos por $5.000 más.',
    },

    // Torta de Chocolate sin y con cobertura
    {
      nombre: 'Ponqué de Chocolate Tradicional',
      en: 'Plain Chocolate Sponge Cake',
      img: 'torta-chocolate-sencilla.jpg',
      desc: 'Delicioso y esponjoso ponqué de chocolate tradicional, perfecto para acompañar con café.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$18.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$28.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$42.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$68.000' },
      ],
      nota: 'Personalízalo con cobertura y relleno de chocolate',
    },
    {
      nombre: 'Ponqué Triple Chocolate',
      en: 'Triple Chocolate Cake',
      img: 'pastelDeChocolate.jpg',
      desc: 'Delicioso ponqué de chocolate, relleno y cubierto con una suave capa de chocolate.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$38.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$53.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$74.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$110.000' },
      ],
      nota: '',
    },
    {
      nombre: 'Ponqué de Chocolate y Maracuyá',
      en: 'Chocolate Passion Fruit Cake',
      img: 'ponque-chocolate-maracuya.jpg',
      desc: 'Ponqué de chocolate relleno de cremoso brigadeiro de maracuyá, cubierto de chocolate.',
      precios: [
        { tamano: 'Personal · 2 a 4 porciones', precio: '$34.000' },
        { tamano: 'Mediano · 6 a 8 porciones', precio: '$48.000' },
        { tamano: 'Grande · 10 a 12 porciones', precio: '$69.000' },
        { tamano: 'Familiar · 16 a 18 porciones', precio: '$108.000' },
      ],
      nota: '',
    },

    {
      nombre: 'Tortas Personalizadas',
      en: 'Custom cakes',
      img: 'torta-personalizada_2.jpg',
      desc: 'Diseñadas para tu ocasión: cumpleaños, aniversarios, celebraciones.',
      sinPrecio:
        'Rellenos a elección: chocolate, brigadeiro de maracuyá, brigadeiro de chocolate, betún de arándanos, arequipe u Oreo',
      nota: 'Cotiza la tuya por WhatsApp',
    },

    {
      nombre: 'Tortas Personalizadas',
      en: 'Custom cakes',
      img: 'torta-personalizada.jpg',
      desc: 'Diseñadas para tu ocasión: cumpleaños, aniversarios, celebraciones.',
      sinPrecio:
        'Rellenos a elección: chocolate, brigadeiro de maracuyá, brigadeiro de chocolate, betún de arándanos, arequipe u Oreo',
      nota: 'Cotiza la tuya por WhatsApp',
    },
  ],
};
// ----------------------------------------------------

function slug(t) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ================= INSTAGRAM (1080×1920) =================
const W = 1080,
  H = 1920;

const brandTop = `
  <div style="position:absolute;top:110px;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:26px;">
    <div style="width:76px;height:76px;border:2px solid ${C.dorado};display:flex;align-items:center;justify-content:center;background:rgba(24,15,9,.25);">
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:56px;line-height:1;color:${C.cremaCalida};">${MARCA.monograma}</span>
    </div>
    <span style="font-family:'Jost',sans-serif;font-weight:500;font-size:30px;letter-spacing:.5em;text-transform:uppercase;color:${C.cremaCalida};padding-left:.5em;text-shadow:0 2px 14px rgba(0,0,0,.45);">${MARCA.nombre}</span>
  </div>`;

function filaPrecioIg({ tamano, precio }) {
  return `
    <div style="display:flex;align-items:baseline;gap:26px;margin-top:26px;">
      <span style="font-family:'Jost',sans-serif;font-weight:400;font-size:31px;letter-spacing:.12em;text-transform:uppercase;color:${C.beige};white-space:nowrap;">${tamano}</span>
      <span style="flex:1;border-bottom:1px dotted rgba(231,201,154,.45);"></span>
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:60px;line-height:1;color:${C.dorado};white-space:nowrap;">${precio}</span>
    </div>`;
}

function igProducto(p) {
  const precios = p.sinPrecio
    ? `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:46px;line-height:1.25;color:${C.doradoClaro};margin-top:34px;">${p.sinPrecio}</div>`
    : p.precios.map(filaPrecioIg).join('');
  const nota = p.nota
    ? `<div style="font-family:'Jost',sans-serif;font-weight:300;font-size:29px;letter-spacing:.06em;color:rgba(247,240,226,.75);margin-top:34px;">${p.nota}</div>`
    : '';
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(p.img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${p.pos || 'center'};">
    <div style="position:absolute;top:0;left:0;right:0;height:380px;background:linear-gradient(to bottom,rgba(24,15,9,.6),transparent);"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:1250px;background:linear-gradient(to top,rgba(22,13,8,.98) 34%,rgba(22,13,8,.78) 56%,rgba(22,13,8,.35) 78%,transparent);"></div>
    ${brandTop}
    <div style="position:absolute;left:72px;right:72px;bottom:170px;">
      <div style="font-family:'Jost',sans-serif;font-size:28px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:24px;">La carta · Precios</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:118px;line-height:.96;color:${C.cremaCalida};">${p.nombre}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:33px;letter-spacing:.06em;color:rgba(247,240,226,.85);margin-top:24px;line-height:1.35;">${p.desc}</div>
      <div style="width:110px;height:1px;background:rgba(199,154,94,.6);margin-top:40px;"></div>
      ${precios}
      ${nota}
    </div>
  </div>`;
}

function igPortada() {
  const p = CONFIG.portada;
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:54px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="position:absolute;top:150px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:26px;letter-spacing:.42em;text-transform:uppercase;color:${C.dorado};">${MARCA.tagline} · ${MARCA.ciudad}</div>
    <div style="text-align:center;padding:0 90px;">
      <div style="display:flex;justify-content:center;margin-bottom:56px;"><div style="width:150px;height:150px;border:2px solid ${C.dorado};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:112px;line-height:1;color:${C.crema};">${MARCA.monograma}</span></div></div>
      <div style="font-family:'Jost',sans-serif;font-size:30px;letter-spacing:.62em;text-transform:uppercase;color:${C.arena};margin-bottom:44px;padding-left:.62em;">${p.etiqueta}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:158px;line-height:1;color:${C.crema};">${p.titulo}</div>
      <div style="display:flex;align-items:center;justify-content:center;gap:36px;margin-top:60px;">
        <span style="width:110px;height:1px;background:rgba(199,154,94,.6);"></span>
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:52px;color:${C.beige};">${p.frase}</span>
        <span style="width:110px;height:1px;background:rgba(199,154,94,.6);"></span>
      </div>
    </div>
    <div style="position:absolute;bottom:150px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:26px;letter-spacing:.3em;text-transform:uppercase;color:${C.dorado};">${MARCA.eslogan}</div>
  </div>`;
}

function igCierre() {
  const c = CONFIG.cierre;
  return `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:54px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="text-align:center;padding:0 90px;">
      <div style="display:flex;justify-content:center;margin-bottom:56px;"><div style="width:150px;height:150px;border:2px solid ${C.dorado};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:112px;line-height:1;color:${C.crema};">${MARCA.monograma}</span></div></div>
      <div style="font-family:'Jost',sans-serif;font-size:30px;letter-spacing:.62em;text-transform:uppercase;color:${C.arena};margin-bottom:44px;padding-left:.62em;">${c.etiqueta}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:158px;line-height:1;color:${C.crema};">${c.titulo}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:50px;color:${C.beige};margin-top:56px;">${c.frase}</div>
      <div style="display:inline-block;background:${C.dorado};color:${C.oscuro};font-family:'Jost',sans-serif;font-weight:500;font-size:32px;letter-spacing:.24em;text-transform:uppercase;padding:30px 64px;border-radius:60px;white-space:nowrap;margin-top:70px;">${c.cta}</div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:30px;letter-spacing:.1em;color:${C.arena};margin-top:44px;">${MARCA.whatsapp} · ${MARCA.instagram}</div>
    </div>
  </div>`;
}

// ================= PDF A4 (1240×1754 por hoja) =================
const PW = 1240,
  PH = 1754;

function filaPrecioPdf({ tamano, precio }) {
  return `
    <div style="display:flex;align-items:baseline;gap:22px;margin-top:30px;">
      <span style="font-family:'Jost',sans-serif;font-weight:400;font-size:30px;letter-spacing:.1em;text-transform:uppercase;color:${C.marron};white-space:nowrap;">${tamano}</span>
      <span style="flex:1;border-bottom:1px dotted rgba(90,60,42,.4);"></span>
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:58px;line-height:1;color:${C.oscuro};white-space:nowrap;">${precio}</span>
    </div>`;
}

function hojaPortada() {
  const p = CONFIG.portada;
  return `
  <div class="hoja" style="position:relative;width:${PW}px;height:${PH}px;background:${C.oscuro};overflow:hidden;display:flex;align-items:center;justify-content:center;">
    <div style="position:absolute;inset:44px;border:1px solid rgba(199,154,94,.4);"></div>
    <div style="position:absolute;top:130px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:24px;letter-spacing:.42em;text-transform:uppercase;color:${C.dorado};">${MARCA.tagline} · ${MARCA.ciudad}</div>
    <div style="text-align:center;padding:0 100px;">
      <div style="display:flex;justify-content:center;margin-bottom:54px;"><div style="width:140px;height:140px;border:2px solid ${C.dorado};display:flex;align-items:center;justify-content:center;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:104px;line-height:1;color:${C.crema};">${MARCA.monograma}</span></div></div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:120px;letter-spacing:.22em;color:${C.crema};padding-left:.22em;">${MARCA.nombre}</div>
      <div style="width:280px;height:1px;background:${C.dorado};margin:48px auto;"></div>
      <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:96px;line-height:1.05;color:${C.crema};">Carta de Precios</div>
      <div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:42px;color:${C.beige};margin-top:44px;">${p.frase}</div>
    </div>
    <div style="position:absolute;bottom:130px;left:0;right:0;text-align:center;font-family:'Jost',sans-serif;font-size:24px;letter-spacing:.18em;color:${C.arena};">${MARCA.whatsapp} · ${MARCA.instagram}</div>
  </div>`;
}

function hojaProducto(p) {
  const precios = p.sinPrecio
    ? `<div style="font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;font-size:46px;line-height:1.3;color:${C.marronDorado};margin-top:36px;">${p.sinPrecio}</div>`
    : p.precios.map(filaPrecioPdf).join('');
  const nota = p.nota
    ? `<div style="font-family:'Jost',sans-serif;font-weight:300;font-size:28px;letter-spacing:.04em;color:${C.marron};margin-top:38px;">${p.nota}</div>`
    : '';
  return `
  <div class="hoja" style="position:relative;width:${PW}px;height:${PH}px;background:${C.crema};overflow:hidden;display:flex;flex-direction:column;">
    <div style="height:170px;background:${C.oscuro};display:flex;align-items:center;justify-content:center;gap:32px;flex:none;">
      <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:58px;letter-spacing:.22em;color:${C.crema};padding-left:.22em;">${MARCA.nombre}</span>
      <span style="width:1px;height:50px;background:rgba(199,154,94,.5);"></span>
      <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:32px;color:${C.beige};">${MARCA.eslogan}</span>
    </div>
    <div style="height:760px;overflow:hidden;flex:none;position:relative;">
      <img src="${foto(p.img)}" style="width:100%;height:100%;object-fit:cover;object-position:${p.pos || 'center'};">
    </div>
    <div style="flex:1;padding:70px 100px 56px;display:flex;flex-direction:column;">
      <div style="display:flex;align-items:baseline;justify-content:space-between;">
        <span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:74px;color:${C.oscuro};">${p.nombre}</span>
        <span style="font-family:'Jost',sans-serif;font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:${C.marronDorado};">${p.en || ''}</span>
      </div>
      <div style="font-family:'Jost',sans-serif;font-weight:300;font-size:31px;color:${C.marron};margin-top:18px;line-height:1.4;">${p.desc}</div>
      <div style="width:90px;height:1px;background:${C.dorado};margin-top:40px;"></div>
      ${precios}
      ${nota}
      <div style="margin-top:auto;text-align:center;font-family:'Jost',sans-serif;font-size:22px;letter-spacing:.26em;text-transform:uppercase;color:${C.marronDorado};padding-top:36px;">${MARCA.whatsapp} · ${MARCA.instagram}</div>
    </div>
  </div>`;
}

// ================= RENDER =================
const paths = require('./paths');
const ASSETS = paths.ENTRADA_LISTAS_GENERAL;
const OUT_BASE = paths.SALIDA;
const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
};

function servir(puerto) {
  return new Promise((res) => {
    const srv = http
      .createServer((req, rsp) => {
        const p = path.join(ASSETS, decodeURIComponent(req.url.split('?')[0]));
        fs.readFile(p, (err, data) => {
          if (err) {
            rsp.writeHead(404);
            rsp.end();
            return;
          }
          rsp.writeHead(200, {
            'Content-Type':
              MIME[path.extname(p).toLowerCase()] || 'application/octet-stream',
          });
          rsp.end(data);
        });
      })
      .listen(puerto, () => res(srv));
  });
}

async function generarPdf() {
  const OUT = path.join(OUT_BASE, CONFIG.carpetaPdf);
  fs.mkdirSync(OUT, { recursive: true });
  const srv = await servir(8933); // mismo puerto que usa foto() en lib.js
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const hojas = [hojaPortada(), ...CONFIG.productos.map(hojaProducto)].join(
    '\n',
  );
  const html = `<!DOCTYPE html><html><head>${HEAD}
    <style>@page{size:${PW}px ${PH}px;margin:0}.hoja{page-break-after:always}body{margin:0}</style>
  </head><body>${hojas}</body></html>`;

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate('document.fonts.ready.then(()=>true)');
  await page.evaluate(
    'Promise.all([...document.images].map(im=>im.decode().catch(()=>{})))',
  );
  await page.waitForTimeout(200);
  const destino = path.join(OUT, CONFIG.nombrePdf);
  await page.pdf({
    path: destino,
    width: `${PW}px`,
    height: `${PH}px`,
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  await browser.close();
  srv.close();
  console.log(
    `${CONFIG.carpetaPdf}/${CONFIG.nombrePdf}  (${CONFIG.productos.length + 1} hojas A4)`,
  );
}

module.exports = { CONFIG, hojaPortada, hojaProducto, PW, PH };

if (require.main === module) {
  (async () => {
    // 1) Imágenes de Instagram
    const FRAMES = [
      { name: '00-portada', w: W, h: H, html: igPortada() },
      ...CONFIG.productos.map((p, i) => ({
        name: `${String(i + 1).padStart(2, '0')}-${slug(p.nombre)}`,
        w: W,
        h: H,
        html: igProducto(p),
      })),
      {
        name: `${String(CONFIG.productos.length + 1).padStart(2, '0')}-como-pedir`,
        w: W,
        h: H,
        html: igCierre(),
      },
    ];
    await render(CONFIG.carpetaInstagram, FRAMES);

    // 2) PDF imprimible
    await generarPdf();
    console.log('CARTA LISTA');
  })().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
