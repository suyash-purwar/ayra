import * as metaAPI from './../apis/meta.api.js';
import Student from '../models/student.model.js';
import Result from '../models/result.model.js'

export const processMessage = async (msgInfo) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    const messageFrom = +value.contacts[0].wa_id
    const messageType = value.messages[0].type;

    switch (messageType) {
      case 'button':
        // console.log(JSON.stringify(value, null, 3));
        const choice = value.messages[0].button.text;
        switch (choice) {
          case 'Last Semester':
          case 'Previous All Semesters':
            await getResult(messageFrom, choice);
            break;
          case "Today's Attendance":
          case 'Overall Attendance':
            await getAttendance(messageFrom, choice);
            break;
        }
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
    'result': ['result', 'marksheet', 'performance', 'report card', 'marks'],
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
      await metaAPI.sendMenu(recipientNo, 'result');
      break;
    case 'attendance':
      await metaAPI.sendMenu(recipientNo, 'attendance');
      break;
    case 'hostel_warden':
      console.log("Sending hostel warden details");
      break;
    default:
      console.log("Unknown keyword");
      await metaAPI.sendTextMessage(recipientNo, "Sorry, I didn't understood your message.");
  }
};

const getAttendance = async (recipientNo, choice) => {
  let response;
  let message;
  switch (choice) {
    case "Today's Attendance":
      response = await Student.findOne(
        { contact: recipientNo },
        'id attendance.todays_attendance'
      );
      const todays_attendance = response.attendance.todays_attendance.value;
      message = `👉 Today's Attendance\n`;
      for (let subjectAttendance of todays_attendance) {
        message += `
Timing: ${subjectAttendance.time}
Subject Code: ${subjectAttendance.sub_code}
Attendance: ${subjectAttendance.attendance ? 'present' : 'absent'}
        `;
      }
      break;
    case "Overall Attendance":
      response =  await Student.findOne(
        { contact: recipientNo },
        'id attendance.overall'
      );
      const overall_attendance = response.attendance.overall;
      message = `👉 Overall Attendance\n`;
      for (let subjectAttendance of overall_attendance) {
        message += `
Subject Code: ${subjectAttendance.sub_code}
Total Attendance: ${subjectAttendance.attendance}%
        `;
      }
      break;
    }
  await metaAPI.sendTextMessage(recipientNo, message);
};

const getResult = async (recipientNo, choice) => {
  const { id } = await Student.findOne({ contact: recipientNo }, 'id');
  let response = await Result.findOne(
    { id },
    'overall_cgpa semester_result'
  );
  let message;
  switch (choice) {
    case "Last Semester":
      const lastSem = response.semester_result[response.semester_result.length-1];
      message = `
👉 *Result of last semester*

Semester: ${lastSem.semester}\n`;
      for (let semResultMarks of lastSem.marks) {
        message += `
Subject Code: ${semResultMarks.sub_code}
Grade: ${semResultMarks.grade}
`;
      }
      message += `\n💥 *Semester ${lastSem.semester} TGPA ${lastSem.tgpa}*`
      break;
    case "Previous All Semesters":
      message = `👉 *Result of all the semesters*\n\n\n`;
      for (let semResult of response.semester_result) {
        message += `✅ Semester ${semResult.semester} result:\n`;
        for (let semResultMarks of semResult.marks) {
          message += `
Subject Code: ${semResultMarks.sub_code}
Grade: ${semResultMarks.grade}
`;
        }
        message += `\n🔥 *Semester ${semResult.semester} TGPA: ${semResult.tgpa}*\n\n`
      }
      message += `\n💥 *Total CGPA: ${response.overall_cgpa}*`;
      break;
    }
  await metaAPI.sendTextMessage(recipientNo, message);
}