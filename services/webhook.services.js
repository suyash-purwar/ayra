import * as metaAPI from './../apis/meta.api.js';
import buttons from './../botconfig/buttons.js';
import templates from '../botconfig/templates.js';
import dictionary from '../botconfig/dictionary.js';
import generateAttendanceImage from '../utils/generate-image.js';
import { Op } from 'sequelize';
import sequelize from '../db/connect.js';

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
        const keyword = classifyMsg(message);
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
  let message;
  if (button === buttons.hey) await metaAPI.sendMenu(messageFrom, templates.hello.name);
  else if (button === buttons.help) await metaAPI.sendMenu(messageFrom, templates.help.name);
  else if (button === buttons.result) await metaAPI.sendMenu(messageFrom, templates.result.name);
  else if (button === buttons.attendance) await metaAPI.sendMenu(messageFrom, templates.attendance.name);
  else if (button === buttons.attendanceToday) {
    await getTodaysAttendance(messageFrom, student);
  }
  else if (button === buttons.attendanceOverall) {
    message = await getOverallAttendance(messageFrom, student);
    await metaAPI.sendTextMessage(messageFrom, message);
  }
  else if (button === buttons.resultLastSemester) {
    message = await getLastSemResult(messageFrom, student);
    await metaAPI.sendTextMessage(messageFrom, message);
  }
  else if (button === buttons.resultPreviousSemester) {
    message = await getPreviousSemResult(messageFrom, student);
    await metaAPI.sendTextMessage(messageFrom, message);
  }
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

/**
 * Following is the mock implementation of text classifier
 */
const classifyMsg = (msgText) => {
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

const processTextMessage = async (keyword, recipientNo, student) => {
  switch (keyword) {
    case 'hello':
      await metaAPI.sendMenu(recipientNo, templates.hello.name);
      break;
    case 'help':
      await metaAPI.sendMenu(recipientNo, templates.help.name);
      break;
    case 'result':
      await metaAPI.sendMenu(recipientNo, templates.result.name);
      break;
    case 'attendance':
      await metaAPI.sendMenu(recipientNo, templates.attendance.name);
      break;
    case 'warden':
      console.log("Sending hostel warden details");
      break;
    default:
      console.log("Unknown keyword");
      await metaAPI.sendTextMessage(recipientNo, "Sorry, I didn't understood your message.");
  }
};

const getTodaysAttendance = async (recipientNo, student) => {
	const uri = `https://c563-49-156-108-121.ngrok.io/webhook/getAttendanceImage?id=${student.registrationNo}&attendanceType=today`;
	await metaAPI.sendImageMessage(recipientNo, uri);
};

const getOverallAttendance = async (recipientNo, student) => {
  const [ attendance ] = await sequelize.query(`
    SELECT
      subject_code,
      attendance
    FROM overall_attendance oa
    LEFT JOIN subject
      ON subject.id = oa.subject_id
    WHERE registration_no=${student.registrationNo} AND semester=${student.semester};
  `);
  let message = `*Overall Attendance*\n`;
  for (let subjectAttendance of attendance) {
    message += `
Subject: ${subjectAttendance.subject_code}
Attendance: ${subjectAttendance.attendance}%\n`;
  }
  return message;
};

const getLastSemResult = async (recipientNo, student) => {
  const [ result ] = await sequelize.query(`
    SELECT semester, subject_code, grade, tgpa FROM (
      SELECT
        semester,
        tgpa,
        unnest(marks) ->> 'subjectId' AS subject_id,
        unnest(marks) ->> 'grade' AS grade
      FROM result
      WHERE registration_no=${student.registrationNo} AND semester=${student.semester}
    ) AS new_result
    LEFT JOIN subject ON subject.id = CAST (new_result.subject_id AS INTEGER)
    ORDER BY semester;
  `);
  let message = `*Result of last semester (Semester: ${student.semester})*\n`;
  for (let subjectGrade of result) {
    message += `
Subject Code: ${subjectGrade.subject_code}
Grade: ${subjectGrade.grade}\n`;
  }
  message += `\n*Semester ${student.semester} TGPA: ${result[0].tgpa}*`
  return message;
};

const getPreviousSemResult = async (recipientNo, student) => {
  const [ result ] = await sequelize.query(`
    SELECT semester, subject_code, grade, tgpa FROM (
      SELECT
        semester,
        tgpa,
        unnest(marks) ->> 'subjectId' AS subject_id,
        unnest(marks) ->> 'grade' AS grade
      FROM result
      WHERE registration_no=${student.registrationNo}
    ) AS new_result
    LEFT JOIN subject ON subject.id = CAST (new_result.subject_id AS INTEGER)
    ORDER BY semester;
  `);
  let message = `*RESULT OF PREVIOUS ALL SEMESTERS*\n\n`;
  let initialSem = null; let previousSubject;
  for (let subject of result) {
    if (initialSem != subject.semester) {
      if (initialSem) message += `\n*Semester ${previousSubject.semester} TGPA: ${previousSubject.tgpa}*\n\n`;
      initialSem = subject.semester;
      previousSubject = subject;
      message += `*Semester ${subject.semester} Result:*\n`;
    }
    message += `
Subject Code: ${subject.subject_code}
Grade: ${subject.grade}\n`;
  }
  message += `\n*Semester ${previousSubject.semester} TGPA: ${previousSubject.tgpa}*\n\n`;
  return message;
};

// Webhook
// Serve images and pdfs when requested from Meta
export const getAttendanceImage = async (id, attendanceType) => {
  const [ student ] = await sequelize.query(`
    SELECT 
      first_name,
      middle_name,
      last_name,
      course_code
    FROM student
    LEFT JOIN course c
      ON c.id = student.course_id
    WHERE registration_no=${id};
  `);
  let data;
  switch (attendanceType) {
    case 'today':
      const [ attendance ] = await sequelize.query(`
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
      data = {
        registrationNo: id,
        name: `${student[0].first_name} ${student[0].middle_name || ''} ${student[0].last_name}`,
        courseCode: student[0].course_code,
        attendance
      };
      break;
    case 'overall':
      break;
  }
  const imageBuffer = await generateAttendanceImage(data, attendanceType);
  return imageBuffer;
};