// Genera una tarjeta PNG (1200x675) por cada titular de fuentes.json.
// Son reproducciones tipográficas del titular, NO capturas de pantalla del sitio.
// Uso: node generar_tarjetas.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const fuentes = JSON.parse(fs.readFileSync(path.join(__dirname, 'fuentes.json'), 'utf8'));
const outDir = path.join(__dirname, 'capturas');
fs.mkdirSync(outDir, { recursive: true });

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const colores = {
  'Santa Marta': '#b42318', 'Fugas': '#b42318', 'Promesas': '#6941c6',
  'Bombardeos': '#1f2937', 'Catatumbo': '#1f2937', 'Cúcuta': '#0b5394', 'Cifras': '#0b5394'
};

function html(f) {
  const color = colores[f.bloque] || '#1f2937';
  const tam = f.titular.length > 150 ? 40 : f.titular.length > 110 ? 46 : 52;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<style>
  body{margin:0;width:1200px;height:675px;background:#fff;font-family:Georgia,'Times New Roman',serif;color:#111}
  .wrap{box-sizing:border-box;width:1200px;height:675px;padding:56px 64px;display:flex;flex-direction:column;justify-content:space-between;border-left:18px solid ${color}}
  .top{display:flex;justify-content:space-between;align-items:baseline;font-family:Helvetica,Arial,sans-serif}
  .medio{font-size:30px;font-weight:700;letter-spacing:.5px;text-transform:uppercase}
  .fecha{font-size:26px;color:#444}
  .bloque{display:inline-block;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:700;color:#fff;background:${color};padding:6px 14px;border-radius:4px;margin-bottom:22px;text-transform:uppercase;letter-spacing:1px}
  h1{font-size:${tam}px;line-height:1.18;margin:0;font-weight:700}
  .prueba{font-family:Helvetica,Arial,sans-serif;font-size:24px;color:#333;margin-top:26px;line-height:1.35}
  .foot{font-family:Helvetica,Arial,sans-serif;font-size:17px;color:#666;border-top:1px solid #ddd;padding-top:14px;line-height:1.4;word-break:break-all}
  .foot b{color:#b42318}
</style></head><body><div class="wrap">
  <div class="top"><div class="medio">${esc(f.medio)}</div><div class="fecha">${esc(f.fecha)}</div></div>
  <div><span class="bloque">${esc(f.bloque)}</span><h1>${esc(f.titular)}</h1><div class="prueba">${esc(f.prueba)}</div></div>
  <div class="foot"><b>Reproducción tipográfica del titular, no captura de pantalla del sitio.</b> Fuente: ${esc(f.url)}</div>
</div></body></html>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 675 }, deviceScaleFactor: 1 });
  for (const f of fuentes) {
    await page.setContent(html(f), { waitUntil: 'load' });
    const file = path.join(outDir, `${f.id}-${slug(f.medio)}-${slug(f.titular).slice(0, 40)}.png`);
    await page.screenshot({ path: file, type: 'png' });
    console.log('ok', path.basename(file));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
