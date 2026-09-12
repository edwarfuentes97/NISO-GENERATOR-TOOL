#!/bin/bash
# Convierte las fotos de campaña en entrada/amor-amistad/ a JPG listos para render.
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/entrada/amor-amistad"
DST="$ROOT/entrada/listas/amor-amistad"
mkdir -p "$SRC" "$DST"

if [ ! -d "$SRC" ]; then
  echo "⚠ No existe entrada/amor-amistad/"
  exit 1
fi

convert_one() {
  local src="$1" out="$2"
  if [ ! -f "$src" ]; then
    echo "⚠ Falta: $src (pon la foto en entrada/amor-amistad/)"
    return 1
  fi
  sips -s format jpeg -s formatOptions 92 -Z 2400 "$src" --out "$DST/$out" >/dev/null
  echo "✓ $(basename "$src")  →  entrada/listas/amor-amistad/$out"
}

# Nombres fijos que usa render-promocionales-amor-amistad.js
convert_one "$SRC/IMG_4242.JPG" "01-caja-corazon.jpg"
convert_one "$SRC/IMG_4244.JPG" "02-detalle-corazon.jpg"
convert_one "$SRC/IMG_4245.JPG" "03-caja-panoramica.jpg"

echo ""
echo "Listo. Genera piezas con: npm run campana-amor-amistad"
