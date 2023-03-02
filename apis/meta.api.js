import axios from 'axios';
import templates from '../botconfig/templates.js';

const sendAPICall = async (
  endpoint,
  method,
  recipientNo,
  msgType,
  msgData
) => {
  const uri = `${process.env.META_API_URI}/${process.env.META_PHONE_ID}/${endpoint}`;
  const requestBody = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: recipientNo,
    type: msgType,
    [msgType]: msgData
  };
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`
    }
  };
  let response;
  switch (method) {
    case 'post':
      response = await axios.post(uri, requestBody, config);
      break;
    case 'get':
      response = await axios.get(uri, requestBody, config);
      break;
    default:
      console.log(`Invalid method": ${method}`);
  }
  return response;
};

export const sendTextMessage = async (recipientNo, message) => {
  const text = {
    preview_url: false,
    body: message
  };
  const response = await sendAPICall(
    'messages',
    'post',
    recipientNo,
    'text',
    text
  );
  return response;
};

export const sendMenu = async (recipientNo, menuType) => {
  const template = {
    name: menuType,
    language: {
      code: "en_US"
    }
  }
  if (menuType === templates.initialHello.name) {
    template.components = [{
      type: "header",
      parameters: [{
        type: "image",
        image: {
          id: templates.initialHello.media[0].mediaId
        }
      }]
    }]
  }
  await sendAPICall(
    'messages',
    'post',
    recipientNo,
    'template',
    template
  );
};