import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import classifier from '@ayra/lib/apis/openai.api.js';
import buttons from '@ayra/lib/botconfig/buttons.js';
import templates from '@ayra/lib/botconfig/templates.js';
import intentList from '@ayra/lib/botconfig/intent.js';
import generateAttendanceImage from '@ayra/lib/utils/generate-image.js';
import sequelize from '@ayra/lib/db/index.js';
import loadConfig from '@ayra/lib/utils/config.js';
import { getObjectURL } from '@ayra/lib/utils/aws.js';
import { Department } from '@ayra/lib/db/index.js';
loadConfig();

export const processMessage = async (msgInfo, student) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    const messageFrom = +value.contacts[0].wa_id;
    const messageType = value.messages[0].type;
    let button;
    switch (messageType) {
      case 'interactive':
        button = value.messages[0].interactive.button_reply.title;
        await processButtonMessage(button, messageFrom, student);
        break;
      case 'button':
        button = value.messages[0].button.text;
        await processButtonMessage(button, messageFrom, student);
        break;
      case 'text':
        const message = value.messages[0].text.body;
        const keyword = await classifyMsg(message);
        await processTextMessage(keyword, messageFrom, student);
        break;
      default:
        console.log(`Only text messages are supported. Received ${messageType}.`);
        await metaAPI.sendMessage(messageFrom, `Sorry! I'm unable to process ${messageType} messages.`);
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
  if (button === buttons.hey) await metaAPI.sendTemplate(messageFrom, templates.hello.name);
  else if (button === buttons.help) await metaAPI.sendMessage(messageFrom, templates.help.name);
  else if (button === buttons.result) await metaAPI.sendTemplate(messageFrom, templates.result.name);
  else if (button === buttons.attendance) await metaAPI.sendTemplate(messageFrom, templates.attendance.name);
  else if (button === buttons.attendanceToday ) await getAttendance(messageFrom, student, 'today');
  else if (button === buttons.attendanceOverall) await getAttendance(messageFrom, student, 'overall');
  else if (button === buttons.resultLastSemester) await getResult(messageFrom, student, 'last semester');
  else if (button === buttons.resultPreviousSemester) await getResult(messageFrom, student, 'all semester');
  else if (button === buttons.moreOptions) await metaAPI.sendTemplate(messageFrom, templates.moreOptions.name);
  else if (
    button === buttons.allOptions ||
    button === buttons.usageExample ||
    button === buttons.howToUse ||
    button === buttons.classSchedule
  ) {
    await metaAPI.sendMessage(messageFrom, 'This part of the application is under development. Sorry for the inconvenience.');
  }
};

// Handle the cases where the probability for a class
// is below a certain threshold
const classifyMsg = async (msgText) => {
  const intentId = await classifier(msgText);
  console.log(intentId);

  return intentList[intentId];
};

const processTextMessage = async (intent, recipientNo) => {
  if (intent === intentList[0]) {
    await metaAPI.sendTemplate(recipientNo, templates.hello.name);
  } else if (intent === intentList[1]) {
    await sendResultMessage(recipientNo);
  } else if (intent === intentList[2]) {
    await sendAttendanceMessage(recipientNo);
  } else if (intent === intentList[3]) {
    await sendDepartmentContactMessage(recipientNo);
    // Commonly requested department details
    // Menu - Show more departments
  } else if (intent === intentList[4]) {
    // Send authorities details
  } else if (intent === intentList[5]) {
    // Send Schedule
  } else if (intent === intentList[6]) {
    await sendHelpMessage(recipientNo);
  } else {
    await sendIntentNotRecognizedMessage(recipientNo);
  }
};

const sendResultMessage = async (recipientNo) => {
  const message = {
    type: "button",
    body: {
      text: "Do you want to see the result of the last semester or of all the semesters?"
    },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "last-sem-result",
            title: "Last Semester"
          }
        },
        {
          type: "reply",
          reply: {
            id: "overall-result",
            title: "All Semesters"
          }
        }
      ]
    }
  };
  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendAttendanceMessage = async (recipientNo) => {
  const message = {
    type: "button",
    body: {
      text: "Do you want to see today's attendance or overall attendance?"
    },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "today-attendance",
            title: "Today's Attendance"
          }
        },
        {
          type: "reply",
          reply: {
            id: "overall-attendance",
            title: "Overall Attendance"
          }
        }
      ]
    }
  };
  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendHelpMessage = async (recipientNo) => {
  const text = `
*What is Ayra?*
I'm here to keep you updated on your child's progress. I can tell you about your child's attendance, result, warden number, and more. Click on 'Show All Options' to see all that you can ask me.

*How to use Ayra?*
Whenever you have a query, text me 'Hey' or directly ask me the question. For example, write 'attendance' and I'll show your child's attendance.`;

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "hello",
            title: "Send Hey"
          }
        },
        {
          type: "reply",
          reply: {
            id: "all-options",
            title: "Show all options"
          }
        },
        {
          type: "reply",
          reply: {
            id: 'example',
            title: "Give an example"
          }
        }
      ]
    }
  };

  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendDepartmentContactMessage = async (recipientNo) => {
  const departments = await Department.findAll({
    attributes: ['name', 'block', 'contact'],
    limit: 3
  });
  let text = `*Following are the contact details of some commonly requested departments.*\n`;
  for (let department of departments) {
    text += `
Department Name: ${department.name}
Building Block: ${department.block}
Contact Number: ${department.contact}\n`;
  }
  text += `\nIf you're looking for some other department, press on the below button to see contact details of all department.`;
  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "show-all-department-number",
            title: "Show all numbers"
          }
        }
      ]
    }
  };
  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendIntentNotRecognizedMessage = async (recipientNo) => {
  const message = {
    body: "Intent not recognized"
  };
  await metaAPI.sendMessage(recipientNo, message);
};

const getAttendance = async (recipientNo, student, attendanceType) => {
  let uri = `${process.env.API_URI}/webhook/getAttendanceImage?id=${student.registrationNo}&attendanceType=${attendanceType}`;
  const message = {
    link:  uri
  };
  await metaAPI.sendMessage(recipientNo, message, "image");
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
  const message = {
    link: url,
    filename: fileName
  }
  await metaAPI.sendMessage(recipientNo, message, "document");
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