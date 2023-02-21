export const verifyWebhook = (req, res) => {
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === process.env.META_VERIFY_TOKEN
  ) {
    res.send(req.query['hub.challenge']);
    console.log('Webhook URL verified ');
  } else {
    res.sendStatus(400);
  }
};

export const receiveMessage = (req, res) => {
  const { value, field } = req.body.entry[0].changes[0];

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    if (value.messages[0].type !== 'text') {
      console.log('Only text messages are supported');
      return;
    }
    const messageFrom = value.contacts[0].wa_id;
    const message = value.messages[0].text.body;

    console.log(message, messageFrom);
  } else if ('statuses' in value) {
    const messageStatus = value.statuses[0].status;
    const messageFrom = value.statuses[0].recipient_id;

    console.log(messageStatus, messageFrom);
  } else {
    console.log(field);
    console.log(value);
  }

  res.sendStatus(200);
};