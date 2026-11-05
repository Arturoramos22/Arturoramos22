const { chromium } = require('playwright');
(async () => {
  const [url, out, w, h] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({viewport:{width:+w,height:+h}, deviceScaleFactor:2});
  try { await p.goto(url, {waitUntil:'networkidle', timeout:90000}); } catch(e) { console.log('goto', e.message); }
  await p.waitForTimeout(4000);
  await p.screenshot({path: out}); await b.close();
})();
