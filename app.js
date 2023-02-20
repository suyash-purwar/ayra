import express from 'express';
import * as dotenv from 'dotenv';

const app = express();

app.use(express.json());

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

app.post('/verify-app', (req, res) => {
  const body = req.body;
  console.log(body);
  // field property is not present, it means that the source of request is not Meta API
  if (body.field !== 'messages') {
    return res.sendStatus(400);
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on PORT=${process.env.PORT} ✅`);
});