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

export const sendMessage = async (recipientNo, message, messageType='text') => {
  const response = await sendAPICall(
    'messages',
    'post',
    recipientNo,
    messageType,
    message
  );
  return response;
};

export const sendTemplate = async (recipientNo, menuType, message = null) => {
  const template = {
    name: menuType,
    language: {
      code: "en_US"
    }
  }
  if (message) template['components'] = message;
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
