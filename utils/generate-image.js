import puppeteer from 'puppeteer';
import ejs from 'ejs';
import fs from 'node:fs/promises';

const generateAttendanceImage = async (data, attendanceType) => {
  const lpuLogoImg = (await fs.readFile('/media/suyash/HDD/realwork/lpu-bot-prototype/media/bot-assets/Bot Profile Picture.png')).toString('base64');
  const studentProfileImg = (await fs.readFile('/media/suyash/HDD/realwork/lpu-bot-prototype/media/misc/profile.png')).toString('base64');
  const presentImg = (await fs.readFile('/media/suyash/HDD/realwork/lpu-bot-prototype/media/misc/present.png')).toString('base64');
  const waitingImg = (await fs.readFile('/media/suyash/HDD/realwork/lpu-bot-prototype/media/misc/waiting.png')).toString('base64');
  const absentImg = (await fs.readFile('/media/suyash/HDD/realwork/lpu-bot-prototype/media/misc/absent.png')).toString('base64');
 
  const html = await ejs.renderFile('/media/suyash/HDD/realwork/lpu-bot-prototype/static/template/attendance.ejs', {
    pageAssets: {
      lpuLogoImg,
      studentProfileImg,
      presentImg,
      waitingImg,
      absentImg
    },
    attendanceType,
    ...data
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await page.emulateMediaType('screen');
  await page.setViewport({width: 1920, height: 2080});
  const imageBuffer = await page.screenshot({
    omitBackground: false
  });
  await browser.close();
  return imageBuffer;
};

export default generateAttendanceImage;