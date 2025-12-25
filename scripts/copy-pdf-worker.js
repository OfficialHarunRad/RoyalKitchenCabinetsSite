const fs = require('fs');
const path = require('path');

const pdfjsDir = path.join(__dirname, '..', 'node_modules', 'pdfjs-dist');
const toDir = path.join(__dirname, '..', 'public');
const dest = path.join(toDir, 'pdf.worker.min.js');

function findWorker(dir) {
  if (!fs.existsSync(dir)) return null;
  const candidates = [];
  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) walk(full);
      else if (/pdf\.worker.*\.(?:js|mjs)$/.test(e.name)) candidates.push(full);
    }
  }
  walk(dir);
  return candidates.length ? candidates[0] : null;
}

try {
  const from = findWorker(pdfjsDir);
  if (!from) {
    console.warn('pdf.worker not found in node_modules/pdfjs-dist. Skipping copy.');
    process.exit(0);
  }
  if (!fs.existsSync(toDir)) fs.mkdirSync(toDir, { recursive: true });
  fs.copyFileSync(from, dest);
  console.log(`Copied ${path.basename(from)} to public/${path.basename(dest)}`);
} catch (err) {
  console.error('Failed to copy pdf.worker:', err);
  process.exit(1);
}
