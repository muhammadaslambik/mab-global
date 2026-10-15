// Menggabungkan berkas bergaya skrip (urutan di apps/web/manifest.json) menjadi satu HTML
// yang bisa diterbitkan di Claude (artifact).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'apps/web/manifest.json'), 'utf8'));
const shell = readFileSync(resolve(root, manifest.shell), 'utf8');
const code = manifest.files
  .map((f) => '/* ' + f + ' */\n' + readFileSync(resolve(root, f), 'utf8'))
  .join('\n');
const html = shell.replace('<!--APP_SCRIPT-->', () => '<script>\n(function(){\n' + code + '\n})();\n</script>');
mkdirSync(dirname(resolve(root, manifest.output)), { recursive: true });
writeFileSync(resolve(root, manifest.output), html);
console.log('Dihasilkan: ' + manifest.output + ' (' + html.length + ' karakter)');
