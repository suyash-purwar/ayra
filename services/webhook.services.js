export const processMessage = (msgInfo) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);
  
  if ('messages' in value) {
    if (value.messages[0].type !== 'text') {
      console.log('Only text messages are supported');
      return;
    }
    const messageFrom = value.contacts[0].wa_id;
    const message = value.messages[0].text.body;

    // Feed the message to text classifier. In response, a keyword is returned
    // Based on the keyword, a menu for that category is sent to the client
    // Once the chosen option from all the subsequent menus is received
    // A call to the LPU database will be made and the response will be parsed and sent to the client

    const keyword = classifyMsg(msgText);

    console.log(message, messageFrom);
    console.log(`Intent ${keyword}`);
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
  const KEYWORDS = ['result', 'marksheet', 'report', 'performance', 'attendance', 'warden', 'timetable', 'schedule'];

  let intent;
  for (keyword in KEYWORDS) {
    if (msgText.toLowerCase().indexOf(keyword)) {
      intent = keyword;
      break;
    }
  }

  return intent;
};