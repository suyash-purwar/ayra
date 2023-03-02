import puppeteer from "puppeteer";
import fs from 'node:fs/promises';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = await fs.readFile('index.html', 'utf-8');

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  
  const content = await page.$("body");
  const imageBuffer = await content.screenshot({
    path: 'index.png',
    omitBackground: false
  });

  await browser.close();

  return
})();