import * as adminServices from './../services/admin.services.js';

export const firstHello = async (req, res) => {
  try {
    const { recipientNo } = req.body;
    await adminServices.firstHello(recipientNo);
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
};

export const admin = (req, res) => {
  res.send(`
<style>
  body {
    font-family: Arial;
    max-width: 80%;
    margin: 0 auto;
  }
  
  h1 {
    padding: 40px 0px;
    border-bottom: 1px solid #aaa;
  }

  label {
    display: block;
    padding: 10px 0;
  }
</style>

<h1>Admin Panel</h1>

<br>

<h3>Publish Results</h3>
<form action="/admin/publish-result" method="POST">
  <input type="submit" value="Publish Result">
</form>

<br>
<h3>File UMC Case</h3>
<form action="/admin/post-umc" method="POST">
  <div>
    <label>Registration No.:</label>
    <input type="number" name="id" placeholder="Registration No." style="width: 300px;">
  </div><br>
  <div>
    <label>Reason :</label>
    <textarea name="reason" rows="5" wrap="soft" style="width: 300px;"></textarea>
  </div><br>
  <div>
    <label>Punishment/Fine: </label>
    <input type="text" name="conclusion" placeholder="Punishment" style="width: 300px;">
  </div><br>
  <div>
    <input type="submit" value="Submit">
  </div>
</form>
  `);
};

export const publishResult = async (req, res) => {
  try {
    await adminServices.publishResult();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};

export const postUMC = async (req, res) => {
  try {
    const { id, reason, conclusion } = req.body;
    console.log(req.body)
    await adminServices.postUMC(id, reason, conclusion);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
};