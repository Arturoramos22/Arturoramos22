// Toma capturas de pantalla REALES de cada nota de fuentes.json con Chromium.
// Requiere que el entorno tenga acceso de red a los sitios de prensa.
// Uso: node capturar_notas_reales.js [--full]   (--full captura la página completa)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const full = process.argv.includes('--full');
const fuentes = JSON.parse(fs.readFileSync(path.join(__dirname, 'fuentes.json'), 'utf8'));
const outDir = path.join(__dirname, 'capturas-reales');
fs.mkdirSync(outDir, { recursive: true });
const slug = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 900 }, locale: 'es-CO',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
  });
  const fallos = [];
  for (const f of fuentes) {
    const page = await ctx.newPage();
    const file = path.join(outDir, `${f.id}-${slug(f.medio)}-${slug(f.titular).slice(0, 40)}.png`);
    try {
      await page.goto(f.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(3000);
      // cerrar banners de cookies comunes
      for (const sel of ['button:has-text("Aceptar")', 'button:has-text("Acepto")', 'button:has-text("Accept")', '#onetrust-accept-btn-handler']) {
        try { await page.locator(sel).first().click({ timeout: 1500 }); } catch {}
      }
      await page.screenshot({ path: file, fullPage: full });
      console.log('ok', path.basename(file));
    } catch (e) {
      fallos.push({ id: f.id, url: f.url, error: String(e.message).split('\n')[0] });
      console.log('FALLO', f.id, f.url);
    }
    await page.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, '_fallos.json'), JSON.stringify(fallos, null, 2));
  console.log(`listo: ${fuentes.length - fallos.length} capturas, ${fallos.length} fallos`);
})();
