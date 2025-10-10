const fs = require('fs');
const path = require('path');

const galleryDir = __dirname;

const readDir = (dir) => {
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.jpeg'));
  } catch {
    return [];
  }
};

const manifest = {
  september: readDir(path.join(galleryDir, 'september-2025')),
  october: readDir(path.join(galleryDir, 'october-2025')),
  november: readDir(path.join(galleryDir, 'november-2023'))
};

fs.writeFileSync(
  path.join(galleryDir, 'gallery-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Generated manifest:`);
console.log(`- September: ${manifest.september.length} images`);
console.log(`- October: ${manifest.october.length} images`);
console.log(`- November: ${manifest.november.length} images`);
console.log(`- Total: ${manifest.september.length + manifest.october.length + manifest.november.length} images`);
