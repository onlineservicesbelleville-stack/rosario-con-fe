/**
 * Genera imágenes placeholder para Rosario con Fe.
 * Requiere solo Node.js nativo (sin dependencias externas).
 *
 * Uso:
 *   node scripts/create-assets.js
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ── Utilidades PNG ─────────────────────────────────────────────────────────

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const t = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([t, data]);
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(crcInput));
  return Buffer.concat([len, t, data, crcBuf]);
}

function makePNG(width, height, fillFn) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; ihdrData[9] = 2; // 8-bit RGB

  const raw = Buffer.alloc(height * (1 + width * 3));
  for (let y = 0; y < height; y++) {
    const base = y * (1 + width * 3);
    raw[base] = 0; // filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b] = fillFn(x, y, width, height);
      raw[base + 1 + x * 3] = r;
      raw[base + 1 + x * 3 + 1] = g;
      raw[base + 1 + x * 3 + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 });
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdrData),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Funciones de relleno ───────────────────────────────────────────────────

// Azul mariano con círculo blanco de rosario
function iconFill(x, y, w, h) {
  const cx = w / 2, cy = h / 2;
  const r = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
  const maxR = w * 0.5;

  // Fondo: azul oscuro a azul más claro desde centro
  const t = Math.min(r / maxR, 1);
  const bgR = Math.round(27 + t * 18);
  const bgG = Math.round(58 + t * 22);
  const bgB = Math.round(107 + t * 30);

  // Rosario: 20 cuentas en un círculo
  const beadR = w * 0.32;
  const beadSize = w * 0.04;
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2 - Math.PI / 2;
    const bx = cx + Math.cos(angle) * beadR;
    const by = cy + Math.sin(angle) * beadR;
    const d = Math.sqrt((x - bx) ** 2 + (y - by) ** 2);
    if (d < beadSize) return [255, 255, 255];
  }

  // Cruz en el centro (píxeles blancos)
  const crossW = w * 0.04, crossH = w * 0.13;
  if (Math.abs(x - cx) < crossW && Math.abs(y - cy) < crossH) return [255, 255, 255];
  if (Math.abs(y - (cy - crossH * 0.3)) < crossW && Math.abs(x - cx) < crossH * 0.6) return [255, 255, 255];

  return [bgR, bgG, bgB];
}

// Fondo crema con centro azul suave para splash
function splashFill(x, y, w, h) {
  const yClamped = y / h;
  // Degradado crema arriba → crema más suave abajo
  const r = Math.round(247 - yClamped * 8);
  const g = Math.round(244 - yClamped * 8);
  const b = Math.round(239 - yClamped * 10);

  // Banda azul superior suave
  if (yClamped < 0.12) {
    const alpha = (0.12 - yClamped) / 0.12;
    return [
      Math.round(r * (1 - alpha * 0.35) + 27 * alpha * 0.35),
      Math.round(g * (1 - alpha * 0.35) + 58 * alpha * 0.35),
      Math.round(b * (1 - alpha * 0.35) + 107 * alpha * 0.35),
    ];
  }
  return [r, g, b];
}

// Fondo blanco para adaptive-icon
function adaptiveFill() { return [254, 252, 249]; }

// ── Generación ────────────────────────────────────────────────────────────

const ASSETS_DIR = path.join(__dirname, '..', 'assets', 'images');

if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

const assets = [
  { file: 'icon.png',          w: 1024, h: 1024, fn: iconFill },
  { file: 'adaptive-icon.png', w: 1024, h: 1024, fn: adaptiveFill },
  { file: 'splash.png',        w: 1284, h: 2778, fn: splashFill },
  { file: 'favicon.png',       w: 48,   h: 48,   fn: iconFill },
];

for (const { file, w, h, fn } of assets) {
  process.stdout.write(`Generando ${file} (${w}x${h})... `);
  const buf = makePNG(w, h, fn);
  fs.writeFileSync(path.join(ASSETS_DIR, file), buf);
  console.log(`✓ (${(buf.length / 1024).toFixed(1)} KB)`);
}

console.log('\n¡Assets creados en assets/images/');
console.log('Reemplaza con los iconos finales antes de publicar en las tiendas.\n');
