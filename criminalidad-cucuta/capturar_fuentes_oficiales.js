// Toma capturas REALES (sin edición) de fuentes oficiales con Chromium.
//  - tipo "soql": abre la consulta en el explorador oficial de datos.gov.co
//    (el mismo que ve cualquier ciudadano) y captura la pantalla tal cual.
//  - tipo "web": abre la página y captura la pantalla.
//  - tipo "pdf": descarga el PDF oficial y convierte la página indicada a PNG
//    con pdftoppm (conversión de formato, sin alterar el contenido).
// Uso: node capturar_fuentes_oficiales.js [ID ...]   (sin IDs captura todo)
// Lee consultas_oficiales.json y guarda en capturas/. Registra la URL exacta
// de cada captura en capturas/_registro.json para que cualquiera la reproduzca.
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const base = __dirname;
const lista = JSON.parse(fs.readFileSync(path.join(base, 'consultas_oficiales.json'), 'utf8'));
const pedidos = process.argv.slice(2);
const outDir = path.join(base, 'capturas');
fs.mkdirSync(outDir, { recursive: true });

const urlDe = (c) => c.tipo === 'soql'
  ? `https://www.datos.gov.co/${c.dataset}/explore/query/${encodeURIComponent(c.soql)}/page/filter`
  : c.url;

(async () => {
  const browser = await chromium.launch();
  const registroPath = path.join(outDir, '_registro.json');
  const registro = fs.existsSync(registroPath) ? JSON.parse(fs.readFileSync(registroPath, 'utf8')) : {};
  for (const c of lista) {
    if (pedidos.length && !pedidos.includes(c.id)) continue;
    const file = path.join(outDir, c.archivo);
    const url = urlDe(c);
    try {
      if (c.tipo === 'pdf') {
        const tmp = path.join(outDir, `_${c.id}.pdf`);
        execFileSync('curl', ['-sSL', '-m', '120', '-A', 'Mozilla/5.0', '-o', tmp, url]);
        const pref = file.replace(/\.png$/, '');
        execFileSync('pdftoppm', ['-png', '-r', '110', '-f', String(c.pagina), '-l', String(c.pagina), '-singlefile', tmp, pref]);
        fs.unlinkSync(tmp);
      } else {
        const ctx = await browser.newContext({ viewport: { width: 1366, height: c.alto || 1000 }, locale: 'es-CO' });
        const page = await ctx.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 }).catch(() => {});
        await page.waitForTimeout(c.espera || 6000);
        for (const sel of ['button:has-text("Aceptar")', 'button:has-text("Acepto")', '#onetrust-accept-btn-handler']) {
          try { await page.locator(sel).first().click({ timeout: 1000 }); } catch {}
        }
        await page.screenshot({ path: file, fullPage: !!c.completa });
        await ctx.close();
      }
      registro[c.id] = { archivo: c.archivo, url, capturado: new Date().toISOString(), que_muestra: c.que_muestra };
      console.log('ok', c.id, c.archivo);
    } catch (e) {
      console.log('FALLO', c.id, String(e.message).split('\n')[0]);
    }
  }
  await browser.close();
  fs.writeFileSync(registroPath, JSON.stringify(registro, null, 2));
})();
