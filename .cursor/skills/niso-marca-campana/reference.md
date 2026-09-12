# Referencia — Manual de marca & campaña NISO

Transcripción del material en `entrada/marca/` para uso de IA y del equipo. Imágenes originales (no en Git): `01-portada.png`, `02-logotipo.png`, `03-fundamentos.png`.

---

## 01 — Portada del manual

**Título del documento:** Manual de marca & campaña  

**Encabezados de portada:**
- Panadería Artesanal (esquina)
- Tuluá · Valle (esquina)
- Baked fresh · Hecho a mano (pie)
- IG @niso.bakery_ · TikTok @niso_bakery (pie)

**Centro:** monograma N en marco cuadrado → etiqueta MANUAL DE MARCA & CAMPAÑA → **NISO** → *El arte de lo horneado* (entre líneas finas).

**Personalidad:** cálido, artesanal y premium.

---

## 02 — Logotipo

### Logotipo principal
- Palabra **NISO** en serif de alto contraste.
- Subtítulo **PANADERÍA ARTESANAL** en sans, mayúsculas, tracking amplio.

### Sello
- Círculo doble línea.
- Centro: **NISO** con puntos decorativos · **EST. 2024**.
- Arco superior: PANADERÍA ARTESANAL.
- Arco inferior: TULUÁ VALLE (invertido).

### Monograma (elegido)
- Letra **N** serif dentro de marco cuadrado.
- Debajo: NISO + PANADERÍA ARTESANAL.

### Aplicaciones de color (del manual)
| Fondo | Texto / líneas |
|--------|----------------|
| Crema | Chocolate |
| Chocolate | Crema |
| Kraft | Chocolate |

---

## 03 — Fundamentos: paleta, tipografía y voz

### Paleta (nombres oficiales del manual)

| Muestra | Nombre | Hex | Rol |
|---------|--------|-----|-----|
| Claro | Crema | `#F5EDDE` | Fondo base |
| Beige | Masa | `#EBDDC6` | Secundario |
| Dorado/miel | Kraft | `#C79A5E` | Acento |
| Marrón medio | Cacao | `#5A3C2A` | Medio tono |
| Oscuro | Chocolate | `#2E2018` | Texto / oscuro |

### Tipografía

**Titular — Cormorant Garamond**  
Uso: titulares, números grandes, eslogan en cursiva.

**Apoyo — Jost (Light, Regular, Medium)**  
Uso: etiquetas, pies, CTAs, textos en mayúsculas con tracking.

Ejemplo de jerarquía en manual:
- Titular grande: *El arte de lo horneado*
- Apoyo: BAKED FRESH · HECHO A MANO

### Voz y eslogan

**Eslogan principal:** *El arte de lo horneado*

**Mensajes de apoyo:**
- Hecho a mano, horneado a diario.
- Alta panadería artesanal.
- Del horno a tu mesa.
- Baked fresh, every day.

**Tono:** sereno, cálido y preciso. Nombres de producto en español con guiño en inglés cuando encaje. Evitar abreviaturas y puntuación excesiva.

---

## Mapeo a `src/marca.js`

El archivo `src/marca.js` es lo que consumen los generadores Node:

| Manual | `marca.js` |
|--------|------------|
| Chocolate | `colores.oscuro` `#2E2018` |
| — | `colores.fondo` `#1C1510` (fondos board/UI) |
| Crema | `colores.crema` `#F5EDDE` |
| — | `colores.cremaCalida` `#F7F0E2` (titulares sobre foto) |
| Kraft | `colores.dorado` `#C79A5E` |
| — | `colores.doradoClaro` `#E7C99A` (kickers) |
| — | `colores.beige` `#E7D3B0` (frases cursiva) |
| Cacao | `colores.marron` `#5A3C2A` |
| — | `colores.marronDorado` `#A87A43` |
| — | `colores.arena` `#A6947C` |
| Masa `#EBDDC6` | Añadir a `marca.js` si se necesita en piezas claras nuevas |

Campos de texto: `nombre`, `monograma`, `tagline`, `eslogan`, `ciudad`, `region`, `whatsapp`, `instagram`, `redes`, `est`, `pie`.

---

## Sistema de piezas (generadores)

| Formato | Tamaño lógico | Comando npm |
|---------|----------------|-------------|
| Post feed | 1080×1080 | `posts` |
| Story / reel frame | 1080×1920 | `stories`, `reel` |
| Destacada | 560×560 (circular) | `destacadas` |
| Flyer / menú | A4 | `flyers`, `menu` |
| Promo | cuadrado o vertical | `promos`, `campana-amor-amistad` |
| Logo | varias variantes | `logos` |

**Promo sobre foto (patrón estándar):**
- `object-fit: cover` a pantalla completa.
- Degradado superior suave + monograma N centrado arriba (marco 2px kraft claro).
- Degradado inferior fuerte para legibilidad.
- Kicker Jost uppercase → título Cormorant → subtítulo Jost 300.
- CTA opcional: fondo kraft, texto chocolate, Jost 500, pill radius ~60px.

Fuentes cargadas en `src/lib.js` (Google Fonts): Cormorant Garamond, Jost, Sacramento.

---

## Campañas temporales (ej. Amor y Amistad)

- Fotos en `entrada/amor-amistad/` → un comando: `npm run campana-amor-amistad` (convierte y genera feed + story por foto).
- Config: `src/render-promocionales-amor-amistad.js`.
- La narrativa puede hablar de regalo, corazón, compartir; **la identidad visual sigue siendo NISO** (no reemplazar chocolate/kraft por rosa/rojo neón salvo petición explícita).
