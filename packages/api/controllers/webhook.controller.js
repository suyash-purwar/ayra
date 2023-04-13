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
    const { student } = req.body;

    await webhookService.processMessage(msg, student);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(200);
    console.log(e);
  }
};

export const getAttendanceImage = async (req, res) => {
  try {
    const { id, attendanceType } = req.query;
    const imageBuffer = await webhookService.getAttendanceImage(id, attendanceType);
    res.contentType('image/png');
    res.setHeader('Content-disposition', 'inline; filename=Attendance.png');
    res.send(imageBuffer);
  } catch (e) {
    console.log(e);
  }
};