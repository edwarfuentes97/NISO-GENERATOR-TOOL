---
name: niso-marca-campana
description: >-
  Manual de marca y campaña NISO (panadería artesanal Tuluá): paleta, tipografías,
  logotipo, monograma, voz, piezas gráficas y generadores render-tool. Usar SIEMPRE
  al crear o editar copy, diseño, HTML de piezas, configs en src/render-*.js,
  campañas (Amor y Amistad), posts, stories, promos, carta, reels o cualquier
  material visual o textual de NISO.
---

# NISO — Marca y campaña (obligatorio)

Antes de proponer textos, colores, tipografías o layouts para NISO, aplica este manual. La fuente de verdad visual local está en `entrada/marca/` (`01-portada.png`, `02-logotipo.png`, `03-fundamentos.png`). Detalle extendido: [reference.md](reference.md).

## Identidad (no inventar)

| Campo | Valor |
|--------|--------|
| Nombre | **NISO** |
| Categoría | Panadería Artesanal |
| Eslogan | *El arte de lo horneado* |
| Ciudad | Tuluá · Valle |
| Est. | EST. 2024 |
| WhatsApp | +57 322 618 2014 |
| Instagram | @niso.bakery_ |
| TikTok | @niso_bakery |
| Pie recurrente | Baked fresh · Hecho a mano |

En código, estos datos viven en `src/marca.js`. **No duplicar números o redes con valores distintos**; si cambian, editar solo `marca.js`.

## Paleta oficial (manual)

Usar estos nombres y hex; no sustituir por rojos genéricos de “san Valentín” salvo campaña explícita que lo pida el usuario.

| Nombre manual | Hex | Uso |
|---------------|-----|-----|
| Crema | `#F5EDDE` | Fondo base claro |
| Masa | `#EBDDC6` | Secundario / fondos suaves |
| Kraft | `#C79A5E` | Acento principal (botones, énfasis) |
| Cacao | `#5A3C2A` | Medio tono, texto secundario sobre claro |
| Chocolate | `#2E2018` | Texto y fondos oscuros |

Sobre fotos (generadores actuales), además: crema cálida `#F7F0E2`, kraft claro `#E7C99A` (kickers), beige `#E7D3B0` (cursivas). Ver `marca.js` → `colores`.

## Tipografía

- **Titulares:** Cormorant Garamond (600 en títulos grandes; cursiva para eslogan y frases poéticas).
- **Apoyo:** Jost (300 texto ligero, 400/500 labels y CTAs).
- **Cursiva decorativa puntual:** Sacramento solo si el layout ya lo usa (no mezclar sin motivo).

Kickers sobre imagen: Jost, **mayúsculas**, `letter-spacing` amplio (~0.42em), color kraft claro.

## Logotipo y monograma

1. **Logotipo principal:** NISO (serif) + PANADERÍA ARTESANAL (sans, tracking amplio).
2. **Sello circular:** NISO, EST. 2024, PANADERÍA ARTESANAL / TULUÁ VALLE en el aro.
3. **Monograma elegido:** **N** mayúscula dentro de **marco cuadrado** fino (borde kraft claro sobre foto oscura).

Combinaciones aprobadas: crema + chocolate, chocolate + crema, kraft + chocolate.

## Voz y copy

- Tono: **sereno, cálido y preciso**; artesanal y premium (no gritón, no “ofertaza”).
- Productos en **español**; guiño breve en inglés permitido (*Baked fresh*, *Handmade*).
- Evitar abreviaturas y signos de más.
- Frases del manual: *Hecho a mano, horneado a diario.* · *Alta panadería artesanal.* · *Del horno a tu mesa.* · *Baked fresh, every day.*

## Piezas y generadores (este repo)

- Fotos: `entrada/` → `npm run preparar-fotos` → `entrada/listas/general/`.
- Salida: `salida/<carpeta>/`.
- Plantillas HTML inline en `src/render-*.js`; referencia visual en `referencia/`.
- Estilo promos sobre foto: imagen full bleed, degradado oscuro abajo, monograma N arriba, título Cormorant, CTA kraft con texto chocolate.

Al añadir campañas (ej. Amor y Amistad), **mantener paleta y tipografías NISO**; la temática va en copy y producto, no en romper la identidad.

## Checklist antes de entregar

- [ ] Colores solo de la paleta (o tokens de `marca.js`).
- [ ] Cormorant + Jost; jerarquía clara.
- [ ] Datos de contacto coherentes con `marca.js`.
- [ ] Tono cálido/premium; sin clichés agresivos de marketing.
- [ ] Si es código generador: editar `CONFIG` en el `render-*.js` correcto, no hardcodear rutas fuera de `src/paths.js`.
