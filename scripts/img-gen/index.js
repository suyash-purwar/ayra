import puppeteer from "puppeteer";
import fs from 'node:fs/promises';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = await fs.readFile('attendance.html', 'utf-8');

  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.emulateMediaType('screen');
  await page.setViewport({width: 1920, height: 1053});
  const imageBuffer = await page.screenshot({
    path: 'index.png',
    omitBackground: false
  });

  await browser.close();

  return
})();