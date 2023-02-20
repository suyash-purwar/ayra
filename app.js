import express from 'express';
import * as dotenv from 'dotenv';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: `.env.dev`
  });
}

app.get('/', (req, res) => {
  res.send({
    status: 'Successful',
    message: 'We are live! ✅'
  });
});

app.get('/verify-app', (req, res) => {
  console.log(req.body);
  console.log(req.header);
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.META_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on PORT=${process.env.PORT} ✅`);
});