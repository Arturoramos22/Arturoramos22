// Captura real de páginas web: guarda la página completa tal como la sirve el sitio
// y registra las coordenadas del titular, la fecha y el texto que se quiere probar.
// No modifica el DOM (no oculta anuncios ni resalta nada). El recorte lo hace recortar.py.
// Uso: node capturar_web.js manifiesto.json carpeta_salida
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const [, , manifestPath, outDir] = process.argv;
const items = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).filter(i => i.tipo === 'web');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  // PROXY_BYPASS: hosts que solo sirven HTTP plano (el proxy de la sesión solo acepta HTTPS), p. ej. www.secretariasenado.gov.co
  const browser = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY, bypass: process.env.PROXY_BYPASS || undefined } : undefined });
  const results = [];
  for (const it of items) {
    const ctx = await browser.newContext({ viewport: { width: it.ancho || 1280, height: 900 }, locale: 'es-CO', deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    const rec = { id: it.id, url: it.url, ok: false };
    try {
      const resp = await page.goto(it.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      rec.status = resp ? resp.status() : null;
      await page.waitForTimeout(4000);
      // Desplazar para que carguen imágenes diferidas, y volver arriba.
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
      await page.waitForTimeout(1500);
      const boxes = await page.evaluate(([finds, meta]) => {
        const abs = el => { const r = el.getBoundingClientRect(); return { x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height }; };
        const out = {};
        const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
        const header = document.querySelector('header');
        if (header) out.header = abs(header);
        const findOne = f => {
          const target = norm(f);
          let best = null;
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
          let n;
          while ((n = walker.nextNode())) {
            const t = norm(n.innerText || '');
            if (t.includes(target)) { if (!best || (n.innerText || '').length < (best.innerText || '').length) best = n; }
          }
          return best ? abs(best) : null;
        };
        if (meta.titular) out.titular = findOne(meta.titular);
        if (!out.titular) { const h = [...document.querySelectorAll('h1')].filter(e => e.getBoundingClientRect().height > 0).sort((a, b) => parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize))[0]; if (h) out.titular = abs(h); }
        if (meta.fecha) out.fecha = findOne(meta.fecha);
        out.viewportWidth = window.innerWidth;
        out.finds = finds.map(f => {
          const target = norm(f);
          // El elemento más pequeño cuyo texto contiene la cadena buscada.
          let best = null;
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
          let n;
          while ((n = walker.nextNode())) {
            const t = norm(n.innerText || '');
            if (t.includes(target)) { if (!best || (n.innerText || '').length < (best.innerText || '').length) best = n; }
          }
          return best ? { find: f, box: abs(best), tag: best.tagName } : { find: f, box: null };
        });
        out.pageHeight = document.documentElement.scrollHeight;
        return out;
      }, [it.buscar || [], { titular: it.titular, fecha: it.fecha }]);
      const png = path.join(outDir, `${it.id}__completa.png`);
      await page.screenshot({ path: png, fullPage: true });
      Object.assign(rec, { ok: true, completa: png, boxes, titulo: await page.title(), capturado: new Date().toISOString() });
    } catch (e) {
      rec.error = e.message.split('\n')[0];
    }
    results.push(rec);
    console.log(rec.id, rec.ok ? 'ok' : 'ERROR ' + rec.error, rec.status || '');
    await ctx.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(outDir, 'cajas_web.json'), JSON.stringify(results, null, 1));
})();
