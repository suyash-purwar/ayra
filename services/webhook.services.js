import * as metaAPI from './../apis/meta.api.js';
import Student from '../models/student.model.js';
import Result from '../models/result.model.js';
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
  console.log(JSON.stringify(student));
	// const { id } = await Student.findOne({ contact: recipientNo }, 'id');
	// const uri = `https://fa8b-112-196-33-226.ngrok.io/webhook/getAttendanceImage?id=${id}&attendanceType=today`;
	// await metaAPI.sendImageMessage(recipientNo, uri);
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
  console.log(result);
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
  const { id } = await Student.findOne({ contact: recipientNo }, 'id');
  let response = await Result.findOne(
    { id },
    'overall_cgpa semester_result'
  );
  let message = `*Result of all the semesters*\n\n`;
  for (let semResult of response.semester_result) {
    message += `_Semester ${semResult.semester} result:_\n`;
    for (let semResultMarks of semResult.marks) {
      message += `
Subject Code: ${semResultMarks.sub_code}
Grade: ${semResultMarks.grade}\n`;
    }
    message += `\n*Semester ${semResult.semester} TGPA: ${semResult.tgpa}*\n\n`
  }
  message += `\n*Total CGPA: ${response.overall_cgpa}*`;
  return message;
};

// Webhook
// Serve images and pdfs when requested from Meta
export const getAttendanceImage = async (id, attendanceType) => {
  let data, response;
  switch (attendanceType) {
    case 'today':
			response = await Student.findOne(
				{ id },
				'name attendance.todays_attendance'
			);
			data = {
				regNo: id,
				name: response.name,
				guardians: {
					father: 'Mr. Sandeep Gupta',
					mother: 'Mrs. Sangeeta Gupta'
				},
				courseCode: 'P132 :: Computer Science & Engineering',
				session: '2021 - 2025',
				attendance: response.attendance.todays_attendance.value
			};
      break;
    case 'overall':
      break;
  }
	const imageBuffer = await generateAttendanceImage(data, attendanceType);
	return imageBuffer;
};