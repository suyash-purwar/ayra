import * as automatedServices from './../services/automated.services.js';

export const firstHello = async (req, res) => {
  try {
    console.log(req.body);
    const { recipientNo } = req.body;
    await automatedServices.firstHello(recipientNo);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(200);
  }
};