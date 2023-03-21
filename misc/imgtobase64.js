import fs from 'node:fs/promises';

// let filePath = './../media/raw/full-lpu-logo-removebg-preview.png';
let filePath = './../media/misc/profile.png';

const img = await fs.readFile(filePath);
const base64img = img.toString('base64');

await fs.writeFile('profile.txt', base64img);
