import * as automatedServices from './../services/automated.services.js';

export const admin = (req, res) => {
  res.send(`
<h1>Admin Panel</h1>
<form action="/admin/publish-result" method="POST">
  <input type="submit" value="Publish Result">
</form>
  `);
};

export const publishResult = async (req, res) => {
  try {
    await automatedServices.publishResult();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};