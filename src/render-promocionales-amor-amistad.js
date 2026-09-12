// ============================================================
// PROMOCIONALES — Campaña Amor y Amistad (automático)
// Uso: npm run campana-amor-amistad
// ============================================================
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { render, foto, MARCA, C, paths } = require('./lib');

const SRC = paths.ENTRADA_AMOR_AMISTAD;
const ASSETS = paths.ENTRADA_LISTAS_AMOR_AMISTAD;
const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.heic', '.webp']);

const CONTACTO = `${MARCA.whatsapp} · ${MARCA.instagram}`;

const CONFIG = {
  carpetaSalida: 'promocionales-amor-amistad',
  pos: 'center 40%',
  cuadrado: {
    kicker: 'Amor y amistad',
    titulo: 'Regala dulzura',
  },
  vertical: {
    kicker: 'Temporada especial',
    titulo: 'Para compartir',
  },
};

const TERTIARIO =
  "font-family:'Jost',sans-serif;font-weight:300;font-size:28px;letter-spacing:.1em;line-height:1.35;color:rgba(247,240,226,.82);";

// Mismos velos que render-posts.js (cuadrado) y render-promocionales.js (vertical)
function overlaysCuadrado() {
  return `
    <div style="position:absolute;top:0;left:0;right:0;height:240px;background:linear-gradient(to bottom,rgba(24,15,9,.6),transparent);"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:640px;background:linear-gradient(to top,rgba(22,13,8,.94),rgba(22,13,8,.5) 34%,transparent);"></div>`;
}

function overlaysVertical() {
  return `
    <div style="position:absolute;top:0;left:0;right:0;height:360px;background:linear-gradient(to bottom,rgba(24,15,9,.55),transparent);"></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(to top,rgba(22,13,8,.94),rgba(22,13,8,.3) 44%,transparent);"></div>`;
}

function slugify(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'foto';
}

function prepararImagenes() {
  fs.mkdirSync(SRC, { recursive: true });
  fs.mkdirSync(ASSETS, { recursive: true });

  const files = fs
    .readdirSync(SRC)
    .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }));

  if (files.length === 0) {
    console.error(`⚠ No hay fotos en ${SRC}`);
    console.error('  Coloca JPG, PNG o HEIC y vuelve a correr: npm run campana-amor-amistad');
    process.exit(1);
  }

  const items = [];
  files.forEach((file, i) => {
    const num = String(i + 1).padStart(2, '0');
    const base = path.basename(file, path.extname(file));
    const slug = slugify(base);
    const outName = `${num}-${slug}.jpg`;
    const srcPath = path.join(SRC, file);
    const dstPath = path.join(ASSETS, outName);

    execSync(
      `sips -s format jpeg -s formatOptions 92 -Z 2400 "${srcPath}" --out "${dstPath}"`,
      { stdio: 'pipe' },
    );
    console.log(`✓ ${file}  →  entrada/listas/amor-amistad/${outName}`);
    items.push({ img: outName, baseName: `${num}-${slug}` });
  });

  return items;
}

function monogramaTop(top, size, fsize) {
  return `<div style="position:absolute;top:${top}px;left:50%;transform:translateX(-50%);width:${size}px;height:${size}px;border:2px solid ${C.doradoClaro};display:flex;align-items:center;justify-content:center;z-index:2;"><span style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:${fsize}px;line-height:1;color:${C.crema};">${MARCA.monograma}</span></div>`;
}

function bloqueTexto({ kicker, titulo, tituloSize, bottom, paddingX }) {
  const px = paddingX ?? 76;
  return `
    <div style="position:absolute;left:${px}px;right:${px}px;bottom:${bottom}px;z-index:2;">
      <div style="font-family:'Jost',sans-serif;font-size:25px;letter-spacing:.42em;text-transform:uppercase;color:${C.doradoClaro};margin-bottom:14px;">${kicker}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-weight:600;font-size:${tituloSize}px;line-height:1.05;color:${C.cremaCalida};white-space:nowrap;">${titulo}</div>
      <div style="${TERTIARIO}margin-top:14px;">${CONTACTO}</div>
    </div>`;
}

function promoCuadrado({ img, pos, kicker, titulo }) {
  const W = 1080;
  const H = 1080;
  return {
    w: W,
    h: H,
    html: `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    ${overlaysCuadrado()}
    ${monogramaTop(52, 84, 60)}
    ${bloqueTexto({ kicker, titulo, tituloSize: 96, bottom: 86 })}
  </div>`,
  };
}

function promoVertical({ img, pos, kicker, titulo }) {
  const W = 1080;
  const H = 1920;
  return {
    w: W,
    h: H,
    html: `
  <div style="position:relative;width:${W}px;height:${H}px;background:${C.oscuro};overflow:hidden;">
    <img src="${foto(img)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos || 'center'};">
    ${overlaysVertical()}
    ${monogramaTop(70, 96, 68)}
    ${bloqueTexto({ kicker, titulo, tituloSize: 120, bottom: 120, paddingX: 72 })}
  </div>`,
  };
}

function buildPromos(items) {
  const promos = [];
  for (const { img, baseName } of items) {
    promos.push({
      formato: 'cuadrado',
      nombre: `${baseName}-feed`,
      img,
      pos: CONFIG.pos,
      ...CONFIG.cuadrado,
    });
    promos.push({
      formato: 'vertical',
      nombre: `${baseName}-story`,
      img,
      pos: CONFIG.pos,
      ...CONFIG.vertical,
    });
  }
  return promos;
}

function limpiarCarpetaSalida() {
  const outDir = path.join(paths.SALIDA, CONFIG.carpetaSalida);
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
    console.log(`Limpiado salida/${CONFIG.carpetaSalida}/ (solo quedará esta generación)\n`);
  }
}

(async () => {
  limpiarCarpetaSalida();
  console.log('Preparando fotos desde entrada/amor-amistad/ …\n');
  const items = prepararImagenes();
  console.log(`\nGenerando ${items.length * 2} piezas (${items.length} fotos × feed + story)…\n`);

  const FRAMES = buildPromos(items).map((p) => {
    const built = p.formato === 'vertical' ? promoVertical(p) : promoCuadrado(p);
    return { name: p.nombre, ...built };
  });

  await render(CONFIG.carpetaSalida, FRAMES, { assetsDir: ASSETS });
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
