#!/bin/bash
# Convierte fotos de entrada/general/ a JPG optimizados en entrada/listas/general/
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/entrada/general"
DST="$ROOT/entrada/listas/general"
mkdir -p "$SRC" "$DST"

shopt -s nullglob nocaseglob
FOTOS=("$SRC"/*.heic "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.png)

if [ ${#FOTOS[@]} -eq 0 ]; then
  echo "⚠ No hay fotos en entrada/general/ — coloca ahí tus HEIC/JPG/PNG y vuelve a correr."
  exit 0
fi

for f in "${FOTOS[@]}"; do
  base=$(basename "$f")
  name="${base%.*}"
  sips -s format jpeg -s formatOptions 92 -Z 2400 "$f" --out "$DST/${name}.jpg" >/dev/null
  echo "✓ $base  →  entrada/listas/general/${name}.jpg"
done

echo ""
echo "Listo: $(ls "$DST"/*.jpg 2>/dev/null | wc -l | tr -d ' ') fotos listas para los generadores."
