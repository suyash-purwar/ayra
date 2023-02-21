export const verifyWebhook = (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.META_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
};

export const receiveMessage = (req, res) => {
  const body = req.body;
  console.log(JSON.stringify(body, null, 3));
  res.sendStatus(200);
};