const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1500,height:1700},deviceScaleFactor:2});
await p.goto(process.argv[2],{waitUntil:'networkidle'});await p.waitForTimeout(1500);
const cb=await p.$('input[type=checkbox]'); if(cb){await cb.check().catch(()=>{});} 
await p.addStyleTag({content:'pre{white-space:pre-wrap;font-size:15px;line-height:1.45}'}).catch(()=>{});
await p.screenshot({path:process.argv[3],fullPage:true});await b.close();})();
