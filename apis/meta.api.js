import axios from 'axios';

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
      console.log(JSON.stringify(config, null, 2));
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
  console.log(response.data);
  return response;
};

export const sendMenu = async (recipientNo, menuType) => {
  const template = {
    language: {
      code: "en_US"
    }
  }
  switch (menuType) {
    case 'result':
      template.name = 'result';
      break;
    case 'attendance':
      template.name = 'attendance';
      break;
  }
  await sendAPICall(
    'messages',
    'post',
    recipientNo,
    'template',
    template
  );
};