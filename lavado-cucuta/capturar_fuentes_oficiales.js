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
  const cache = new Map();
  const registro = fs.existsSync(registroPath) ? JSON.parse(fs.readFileSync(registroPath, 'utf8')) : {};
  for (const c of lista) {
    if (pedidos.length && !pedidos.includes(c.id)) continue;
    if (c.manual) { console.log('manual', c.id, c.url); continue; }
    if (c.tipo === 'usuario') continue; // pantallazos aportados por el usuario
    const file = path.join(outDir, c.archivo);
    const url = urlDe(c);
    try {
      if (c.tipo === 'xls') {
        // el DANE publica estos cuadros en Excel: se convierten a PDF con LibreOffice (sin tocar valores)
        const dir = path.join(outDir, '_xls'); fs.mkdirSync(dir, { recursive: true });
        const xls = path.join(dir, path.basename(new URL(url).pathname));
        if (!fs.existsSync(xls)) execFileSync('curl', ['-sSL', '-m', '300', '-A', 'Mozilla/5.0', '-o', xls, url]);
        const pdf = xls.replace(/\.xlsx?$/i, '.pdf');
        if (!fs.existsSync(pdf)) execFileSync('soffice', ['--headless', '--norestore', '--convert-to', 'pdf', '--outdir', dir, xls]);
        execFileSync('pdftoppm', ['-png', '-r', '130', '-f', String(c.pagina), '-l', String(c.pagina), '-singlefile', pdf, file.replace(/\.png$/, '')]);
      } else if (c.tipo === 'pdf') {
        if (!cache.has(url)) {
          const tmp = path.join(outDir, `_cache_${cache.size}.pdf`);
          execFileSync('curl', ['-sSL', '-m', '300', '-A', 'Mozilla/5.0', '-o', tmp, url]);
          cache.set(url, tmp);
        }
        const pref = file.replace(/\.png$/, '');
        execFileSync('pdftoppm', ['-png', '-r', String(c.resolucion || 130), '-f', String(c.pagina), '-l', String(c.pagina), '-singlefile', cache.get(url), pref]);
      } else {
        const ctx = await browser.newContext({ viewport: { width: 1366, height: c.alto || 1000 }, locale: 'es-CO' });
        const page = await ctx.newPage();
        // los sitios de noticias nunca quedan en reposo de red: basta con la carga y una espera fija
        await page.goto(url, { waitUntil: c.tipo === 'soql' ? 'networkidle' : 'load', timeout: 60000 }).catch(() => {});
        await page.waitForTimeout(c.espera || 6000);
        if (c.buscar) {
          // desplaza la página hasta el texto citado (como haría un lector), sin resaltarlo ni alterarlo
          await page.evaluate((t) => {
            const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let n; while ((n = w.nextNode())) { if (n.textContent.includes(t)) { n.parentElement.scrollIntoView({ block: 'center' }); break; } }
          }, c.buscar);
          await page.waitForTimeout(1500);
        }
        // cierra avisos de cookies y ventanas emergentes con sus propios botones (no altera el contenido)
        for (const sel of (c.cerrar || [])) {
          try { await page.locator(sel).first().click({ timeout: 2000 }); await page.waitForTimeout(800); } catch {}
        }
        for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Accept all cookies")', 'button:has-text("Accept all")',
          'button:has-text("Accept")', 'button:has-text("Aceptar")', 'button:has-text("Acepto")', 'button:has-text("Got it")',
          'button:has-text("I agree")', 'button[aria-label="Close"]', 'button[aria-label="close"]', '.modal button.close']) {
          try { await page.locator(sel).first().click({ timeout: 800 }); } catch {}
        }
        try { await page.keyboard.press('Escape'); } catch {}
        await page.waitForTimeout(800);
        // no guarda capturas de páginas de bloqueo o verificación anti-bots
        const txt = (await page.evaluate(() => document.body ? document.body.innerText.slice(0, 2000) : '')) || '';
        if (/Verificaci[oó]n de seguridad en curso|Web Page Blocked|403 Forbidden|Access Denied|Just a moment|Un momento|Validacion|upstream request failed|Undeclared Automated Tool|Sorry, you have been blocked/i.test(txt)) {
          throw new Error('página bloqueada para navegadores automatizados: capturar a mano');
        }
        await page.screenshot({ path: file, fullPage: !!c.completa });
        await ctx.close();
      }
      registro[c.id] = { archivo: c.archivo, url, ...(c.pagina ? { pagina_pdf: c.pagina } : {}), capturado: new Date().toISOString(), que_muestra: c.que_muestra };
      console.log('ok', c.id, c.archivo);
    } catch (e) {
      console.log('FALLO', c.id, String(e.message).split('\n')[0]);
    }
  }
  await browser.close();
  for (const f of cache.values()) fs.unlinkSync(f);
  fs.rmSync(path.join(outDir, '_xls'), { recursive: true, force: true });
  fs.writeFileSync(registroPath, JSON.stringify(registro, null, 2));
})();
