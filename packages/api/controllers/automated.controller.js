import * as automatedServices from './../services/automated.services.js';

export const firstHello = async (req, res) => {
  try {
    const { recipientNo } = req.body;
    await automatedServices.firstHello(recipientNo);
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
};

export const publishResult = async (req, res) => {
  try {
    await automatedServices.publishResult();
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
}