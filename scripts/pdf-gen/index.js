import puppeteer from "puppeteer";
import fs from 'node:fs/promises';

// Converts to PDF from a URL
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
  
//   const websiteUrl = 'https://www.github.com/suyash-purwar';
  
//   await page.goto(websiteUrl, { waitUntil: 'networkidle0'} );
//   await page.emulateMediaType('screen');
  
//   const pdf = await page.pdf({
//     path: 'suyash-github.pdf',
//     margin: {
//       top: '100px',
//       right: '50px',
//       bottom: '100px',
//       left: '50px'
//     },
//     printBackground: true,
//     format: 'A4'
//   });
  
//   await browser.close();
// })();

// Converts to PDF from an HTML file
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = await fs.readFile('index.html', 'utf-8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.emulateMediaType('screen');
  const pdf = await page.pdf({
    path: 'index.pdf',
    printBackground: true,
    format: 'A4'
  });
  
  await browser.close();
})();