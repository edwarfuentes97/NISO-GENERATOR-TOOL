# NISO — Generador de piezas gráficas

Herramienta para crear imágenes y PDFs de la panadería **NISO** (posts, stories, promocionales, carta, reels, etc.) con la misma línea visual de la marca.

Todo vive en **una sola carpeta de proyecto**. No hay que entrar a `render-tool` ni a `project`: solo usas la raíz de este repositorio.

---

## Estructura (lo importante)

```
niso-generator-tool/
├── entrada/          ← Aquí pones tus fotos y referencias
│   ├── general/      ← Fotos nuevas (HEIC, JPG, PNG) antes de prepararlas
│   ├── listas/
│   │   ├── general/  ← Fotos ya optimizadas (las usan casi todos los generadores)
│   │   └── amor-amistad/
│   ├── amor-amistad/ ← Fotos originales de campaña (IMG_4242, etc.)
│   └── marca/        ← Manual de marca (paleta, logotipo, fundamentos)
├── salida/           ← Aquí aparecen los PNG/PDF generados
├── src/              ← Código de los generadores (solo editas CONFIG si cambias textos)
├── scripts/          ← Convierte fotos de entrada a formato listo
├── referencia/       ← Diseños HTML de referencia (manual)
└── archivo/          ← Prototipo HTML antiguo (solo para npm run board)
```

**Regla simple:** entra por `entrada/`, sale por `salida/`.

### GitHub (solo código)

Las carpetas `entrada/` y `salida/` están en `.gitignore`: las **imágenes y PDF generados no se suben** al repositorio, solo el código y unos `README.md` que explican cada carpeta. Lo mismo con las **fotos dentro de `archivo/`** (el prototipo HTML del board): en GitHub quedan solo `.html` y `.js`. Así el repo pesa poco. En cada máquina clonas el repo, copias tus fotos a `entrada/` y generas de nuevo en `salida/`.

---

## Primera vez en tu computador

1. Instala dependencias (solo una vez):

   ```bash
   npm install
   npx playwright install chromium
   ```

2. Necesitas **internet** la primera vez que generas piezas (carga las fuentes Google: Cormorant Garamond y Jost).

---

## Flujo de trabajo habitual

### 1. Subir fotos

Coloca tus archivos en `entrada/general/` (pueden ser HEIC, JPG o PNG).

### 2. Preparar fotos

Convierte y redimensiona a JPG listos para el render:

```bash
npm run preparar-fotos
```

Los archivos quedan en `entrada/listas/general/`. En cada generador referencias el nombre del archivo, por ejemplo `img: '1.jpg'`.

### 3. Editar textos (opcional)

Abre el generador que necesites en `src/`, por ejemplo `src/render-posts.js`. Al inicio está el bloque **CONFIG** con títulos, kickers, nombres de archivo de salida, etc.

### 4. Generar

```bash
npm run posts
```

Los PNG se guardan en `salida/<carpeta que diga CONFIG>/`, por ejemplo `salida/posts-nuevos/`.

La resolución es **doble** (1080 → 2160 px) para que se vean nítidos en Instagram.

---

## Comandos disponibles

| Comando | Qué genera |
|--------|------------|
| `npm run preparar-fotos` | Convierte `entrada/general/` → `entrada/listas/general/` |
| `npm run posts` | Posts cuadrados 1080×1080 |
| `npm run stories` | Stories 1080×1920 |
| `npm run destacadas` | Portadas de destacadas (círculo) |
| `npm run flyers` | Flyers A4 |
| `npm run menu` | Carta / menú PDF A4 |
| `npm run carta-precios` | Carta con precios (Instagram + PDF) |
| `npm run catalogo` | Carrusel de catálogo |
| `npm run promos` | Promocionales genéricos |
| `npm run campana-amor-amistad` | Campaña Amor y Amistad (6 piezas) |
| `npm run marca` | Banners de marca |
| `npm run logos` | Variantes de logo |
| `npm run reel` | Reel de proceso (edita `src/render-reel.js`) |
| `npm run board` | Re-exporta el board HTML antiguo (uso especial) |

---

## Campaña Amor y Amistad

1. Pon las tres fotos en `entrada/amor-amistad/` con estos nombres (o reemplaza las que ya hay):
   - `IMG_4242.JPG`
   - `IMG_4244.JPG`
   - `IMG_4245.JPG`

2. Genera todo:

   ```bash
   npm run campana-amor-amistad
   ```

3. Revisa `salida/promocionales-amor-amistad/`.

Textos y encuadres: `src/render-promocionales-amor-amistad.js` → bloque `CONFIG`.

---

## Marca (colores, WhatsApp, Instagram)

Datos compartidos por **todas** las piezas: `src/marca.js`  
Paleta visual de referencia: imágenes en `entrada/marca/` (local, no en Git).

**Para Cursor / IA:** el manual completo está en `.cursor/skills/niso-marca-campana/` (`SKILL.md` + `reference.md`). Una regla del proyecto lo aplica en cada chat.

Si cambias el WhatsApp o el @ de Instagram, edítalo solo en `marca.js`.

---

## Consejos

- En títulos puedes usar `<br>` para saltos de línea.
- Si una foto sale muy arriba o abajo, en CONFIG usa `pos: 'center 40%'` (ajusta el porcentaje).
- Los generadores nuevos copian el estilo de `referencia/` (HTML del manual).
- `archivo/diseno-html/` es el export antiguo de Claude Design; las imágenes de ahí no van a GitHub. Solo úsalo con `npm run board` si tienes los assets en local (ver `archivo/README.md`).

---

## Problemas frecuentes

**“Executable doesn't exist” (Playwright)**  
Ejecuta: `npx playwright install chromium`

**Las fotos no aparecen en el PNG**  
¿Corriste `npm run preparar-fotos`? ¿El nombre en CONFIG coincide con un archivo en `entrada/listas/general/`?

**En macOS, fotos desde el iPhone**  
Suelen venir en HEIC; `preparar-fotos` las convierte automáticamente.
