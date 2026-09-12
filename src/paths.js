// Rutas del proyecto — un solo lugar para entrada, salida y archivos legacy.
const path = require('path');

const ROOT = path.join(__dirname, '..');

module.exports = {
  ROOT,
  ENTRADA: path.join(ROOT, 'entrada'),
  ENTRADA_GENERAL: path.join(ROOT, 'entrada', 'general'),
  ENTRADA_AMOR_AMISTAD: path.join(ROOT, 'entrada', 'amor-amistad'),
  ENTRADA_MARCA: path.join(ROOT, 'entrada', 'marca'),
  ENTRADA_LISTAS_GENERAL: path.join(ROOT, 'entrada', 'listas', 'general'),
  ENTRADA_LISTAS_AMOR_AMISTAD: path.join(ROOT, 'entrada', 'listas', 'amor-amistad'),
  SALIDA: path.join(ROOT, 'salida'),
  REFERENCIA: path.join(ROOT, 'referencia'),
  ARCHIVO_DISENO_HTML: path.join(ROOT, 'archivo', 'diseno-html'),
};
