// Captura de una página cuyo texto vive en un contenedor con barra de desplazamiento propia.
// Solo DESPLAZA el contenedor (lo mismo que hace un usuario con la rueda del ratón) hasta la frase
// buscada y toma la captura de la vista. No modifica el DOM ni el estilo.
// Uso: node captura_scroll.js URL "frase" carpeta_salida id
const { chromium } = require('playwright');
const fs = require('fs'); const path = require('path');
const [, , url, frase, outDir, id, off] = process.argv; const OFF = Number(off || 30);
(async () => {
  const browser = await chromium.launch({ proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'es-CO', deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000);
  const info = await page.evaluate(([frase, OFF]) => {
    const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
    let best = null; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT); let n;
    while ((n = w.nextNode())) { const t = norm(n.innerText || ''); if (t.includes(norm(frase)) && (!best || n.innerText.length < best.innerText.length)) best = n; }
    if (!best) return { error: 'no encontrado' };
    let sc = best.parentElement;
    while (sc && !(sc.scrollHeight > sc.clientHeight + 5 && /(auto|scroll)/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
    if (!sc) return { error: 'sin contenedor desplazable' };
    const r0 = sc.getBoundingClientRect();
    sc.scrollTop += best.getBoundingClientRect().top - r0.top - OFF;
    const r = best.getBoundingClientRect();
    return { contenedor: { tag: sc.tagName, cls: sc.className, top: r0.top, h: r0.height, scrollTop: sc.scrollTop }, frase: { y: r.top + window.scrollY, h: r.height }, scrollY: window.scrollY };
  }, [frase, OFF]);
  await page.waitForTimeout(1500);
  const png = path.join(outDir, `${id}__completa.png`);
  await page.screenshot({ path: png, fullPage: false });
  const rec = [{ id, url, ok: true, status: resp ? resp.status() : null, completa: png, titulo: await page.title(), capturado: new Date().toISOString(), info, boxes: { viewportWidth: 1280, finds: [] } }];
  fs.writeFileSync(path.join(outDir, 'cajas_web.json'), JSON.stringify(rec, null, 1));
  console.log(JSON.stringify(rec[0], null, 1));
  await browser.close();
})();
