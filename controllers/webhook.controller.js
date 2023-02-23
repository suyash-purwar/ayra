import * as webhookService from './../services/webhook.services.js';

export const verifyWebhook = (req, res) => {
  try {
    if (
      req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === process.env.META_VERIFY_TOKEN
    ) {
      res.send(req.query['hub.challenge']);
      console.log('Webhook URL verified ');
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    console.log(e);
  }
};

export const processMessage = async (req, res) => {
  try {
    const msg = req.body.entry[0].changes[0];
    await webhookService.processMessage(msg);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(200);
    console.log(e);
  } 
};