import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import classifier from '@ayra/lib/apis/openai.api.js';
import buttons from '@ayra/lib/botconfig/buttons.js';
import templates from '@ayra/lib/botconfig/templates.js';
import intentList from '@ayra/lib/botconfig/intent.js';
import generateAttendanceImage from '@ayra/lib/utils/generate-image.js';
import sequelize from '@ayra/lib/db/index.js';
import loadConfig from '@ayra/lib/utils/config.js';
import { getObjectURL } from '@ayra/lib/utils/aws.js';
loadConfig();

export const processMessage = async (msgInfo, student) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    const messageFrom = +value.contacts[0].wa_id;
    const messageType = value.messages[0].type;
    switch (messageType) {
      case 'button':
        const button = value.messages[0].button.text;
        await processButtonMessage(button, messageFrom, student);
        break;
      case 'text':
        const message = value.messages[0].text.body;
        const keyword = await classifyMsg(message);
        await processTextMessage(keyword, messageFrom, student);
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

const processButtonMessage = async (button, messageFrom, student) => {
  if (button === buttons.hey) await metaAPI.sendMenu(messageFrom, templates.hello.name);
  else if (button === buttons.help) await metaAPI.sendMenu(messageFrom, templates.help.name);
  else if (button === buttons.result) await metaAPI.sendMenu(messageFrom, templates.result.name);
  else if (button === buttons.attendance) await metaAPI.sendMenu(messageFrom, templates.attendance.name);
  else if (button === buttons.attendanceToday ) await getAttendance(messageFrom, student, 'today');
  else if (button === buttons.attendanceOverall) await getAttendance(messageFrom, student, 'overall');
  else if (button === buttons.resultLastSemester) await getResult(messageFrom, student, 'last semester');
  else if (button === buttons.resultPreviousSemester) await getResult(messageFrom, student, 'all semester');
  else if (button === buttons.moreOptions) await metaAPI.sendMenu(messageFrom, templates.moreOptions.name);
  else if (
    button === buttons.allOptions ||
    button === buttons.usageExample ||
    button === buttons.howToUse ||
    button === buttons.classSchedule ||
    button === buttons.wardenDetails ||
    button === buttons.feeDues
  ) {
    await metaAPI.sendTextMessage(messageFrom, 'This part of the application is under development. Sorry for the inconvenience.');
  }
};

const classifyMsg = async (msgText) => {
  const { intent, logprobs } = await classifier(msgText);
  console.log(intent, logprobs);

  if (logprobs < -0.005) return null;

  return intentList[intent];
};

const processTextMessage = async (intent, recipientNo, student) => {
  if (intent === intentList[0]) {
    await metaAPI.sendMenu(recipientNo, templates.hello.name);
  } else if (intent === intentList[1]) {
    await metaAPI.sendMenu(recipientNo, templates.result.name);
  } else if (intent === intentList[2]) {
    await metaAPI.sendMenu(recipientNo, templates.attendance.name);
  } else if (intent === intentList[3]) {
    // Send message with a menu
    // Menu - Show more contacts
  } else if (intent === intentList[4]) {
    // Send authorities details
  } else if (intent === intentList[5]) {
    // Send Schedule
  } else if (intent === intentList[6]) {
    await metaAPI.sendMenu(recipientNo, templates.help.name);
  } else {
    console.log("Unknown intent");
    await metaAPI.sendTextMessage(recipientNo, "Intent not recognized");
  }
};

const getAttendance = async (recipientNo, student, attendanceType) => {
  let uri = `${process.env.API_URI}/webhook/getAttendanceImage?id=${student.registrationNo}&attendanceType=${attendanceType}`;
	await metaAPI.sendMediaMessage(recipientNo, 'image', null, uri);
};

const getResult = async (recipientNo, student, resultType) => {
  let fileName;
  switch (resultType) {
    case 'last semester':
      fileName = `Last Semester Result ${student.registrationNo}.pdf`;
      break;
    case 'all semester':
      fileName = `All Semester Result ${student.registrationNo}.pdf`;
      break;
  }
  const url = await getObjectURL('result', fileName);
  await metaAPI.sendMediaMessage(recipientNo, 'document', fileName, url);
};

// Webhook
// Serve attendance images when requested from Meta
export const getAttendanceImage = async (id, attendanceType) => {
  const [ student ] = await sequelize.query(`
    SELECT 
      first_name,
      middle_name,
      last_name,
      course_code,
      semester
    FROM student
    LEFT JOIN course c
      ON c.id = student.course_id
    WHERE registration_no=${id};
  `);
  const data = {
    registrationNo: id,
    name: `${student[0].first_name} ${student[0].middle_name || ''} ${student[0].last_name}`,
    courseCode: student[0].course_code
  };
  switch (attendanceType) {
    case 'today':
      const [ todaysAttendance ] = await sequelize.query(`
        SELECT
          subject_code,
          hs.slot,
          attendance_status,
          date
        FROM attendance
        LEFT JOIN subject s
          ON s.id = attendance.subject_id
        LEFT JOIN hour_slot hs
          ON hs.id = attendance.hour_slot
        WHERE registration_no=${id}
        ORDER BY date, hour_slot;
      `);
      data.attendance = todaysAttendance;
      break;
    case 'overall':
      const [ overallAttendance ] = await sequelize.query(`
        SELECT
          subject_code,
          attendance
        FROM overall_attendance oa
        LEFT JOIN subject
          ON subject.id = oa.subject_id
        WHERE registration_no=${id} AND semester=${student[0].semester};
      `);
      data.attendance = overallAttendance;
      break;
  }
  const imageBuffer = await generateAttendanceImage(data, attendanceType);
  return imageBuffer;
};