import axios from 'axios';
import loadConfig from '@ayra/lib/utils/config.js';

loadConfig();

const markAsRead = async (req, res) => {
  if (!req.body.messageId) return res.sendStatus(200);
  const uri = `${process.env.META_API_URI}/${process.env.META_PHONE_ID}/messages`;
  const requestBody = {
    messaging_product: "whatsapp",
    status: "read",
    message_id: req.body.messageId
  };
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`
    }
  };
  await axios.post(uri, requestBody, config);
  res.sendStatus(200);
};

export default markAsRead;