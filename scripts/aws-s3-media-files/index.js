import AWS from 'aws-sdk';
import fs from 'fs/promises';
import express from 'express';

const app = express();
const s3 = new AWS.S3();

app.get('/get-result', async (req, res) => {
  // const { id, resultOf } = req.query;
  // const fileName = `${id}/${resultOf === 'last-semester' ? 'Last Semester Result' : 'All Semester Result'}.pdf`;

  let file = await s3.getObject({
    Bucket: "cyclic-apricot-magpie-shoe-ap-south-1",
    // Key: filename
    Key: "test.pdf"
  }).promise();

  // await fs.writeFile('s3.pdf', file.Body);
  res.contentType("application/pdf");
  res.setHeader('Content-disposition', 'inline; filename=Last Semester.pdf');
  res.send(file.Body);

  // res.sendFile('/media/suyash/HDD/realwork/lpu-bot-prototype/scripts/aws-s3-media-files/s3.pdf');
});

app.get('/save-to-s3', async (req, res) => {
  // const { id, resultOf } = req.query;

  const file = await fs.readFile('./../pdf-gen/index.pdf');
  // console.log(file);

  await s3.putObject({
    Body: file,
    Bucket: "cyclic-apricot-magpie-shoe-ap-south-1",
    Key: "test.pdf"
  }).promise();

  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log('Running');
});