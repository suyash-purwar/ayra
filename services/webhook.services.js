import * as metaAPI from './../apis/meta.api.js';

export const processMessage = async (msgInfo) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    const messageFrom = +value.contacts[0].wa_id
    const messageType = value.messages[0].type;

    switch (messageType) {
      case 'button':
        console.log(JSON.stringify(value, null, 3));
        break;
      case 'text':
        const message = value.messages[0].text.body;
        const keyword = classifyMsg(message);
        await generateResponse(keyword, messageFrom);
        break;
      default:
        console.log(`Only text messages are supported. Received ${messageType}.`);
        await metaAPI.sendTextMessage(messageFrom, `Sorry! I'm unable to process ${messageType} messages.`);
        return;
    }
  } else if ('statuses' in value) {
    const messageStatus = value.statuses[0].status;
    const messageFrom = value.statuses[0].recipient_id;

    console.log(messageStatus, messageFrom);
  } else {
    console.log(field);
    console.log(value);
  }
};

/**
 * Following is the mock implementation of text classifier
 */
const classifyMsg = (msgText) => {
  const dictionary = {
    'result': ['result', 'marksheet', 'performance', 'report card'],
    'attendance': ['attendance', 'attending', 'present', 'attended'],
    'hostel_warden': ['warden', 'hostel head', 'supervisor']
  };
  
  let intent;
  for (let keywordClass in dictionary) {
    for (let keyword of dictionary[keywordClass]) {
      if (msgText.toLowerCase().indexOf(keyword) !== -1) {
        intent = keywordClass;
        break;
      }
    }
  }

  return intent;
};

const generateResponse = async (keyword, recipientNo) => {
  switch (keyword) {
    case 'result':
      await metaAPI.sendResultMenu(recipientNo)
      break;
    case 'attendance':
      console.log("Sending attendance menu");
      break;
    case 'hostel_warden':
      console.log("Sending hostel warden details");
      break;
    default:
      console.log("Unknown keyword");
      await metaAPI.sendTextMessage(recipientNo, "Sorry, I didn't understood your message.")
  }
};