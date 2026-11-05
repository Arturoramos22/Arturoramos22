const { chromium } = require('playwright');
(async()=>{const [url,out,w,h,waitText]=process.argv.slice(2);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+h},deviceScaleFactor:2});
try{await p.goto(url,{waitUntil:'networkidle',timeout:120000});}catch(e){console.log(e.message)}
if(waitText){try{await p.getByText(waitText).first().waitFor({timeout:120000});}catch(e){console.log('no text',e.message)}}
await p.waitForTimeout(3000);
await p.screenshot({path:out});await b.close();})();
