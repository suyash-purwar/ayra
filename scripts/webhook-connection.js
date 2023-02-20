import express from 'express';

const app = express();
const PORT = 3000;
const TOKEN = 'AshNov06';

app.get('/', (req, res) => {
  res.send({
    status: 'Successful',
    message: 'We are live! ✅'
  });
});

app.post('/verify-app', (req, res) => {
  console.log(req.body);
  console.log(req.header);
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log('App is running on localhost:3000 ✅');
});