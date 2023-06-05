import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import classifier from '@ayra/lib/apis/openai.api.js';
import buttons from '@ayra/lib/botconfig/buttons.js';
// import templates from '@ayra/lib/botconfig/templates.js';
import intentList from '@ayra/lib/botconfig/intent.js';
import generateAttendanceImage from '@ayra/lib/utils/generate-image.js';
import sequelize from '@ayra/lib/db/index.js';
import loadConfig from '@ayra/lib/utils/config.js';
import { getObjectURL } from '@ayra/lib/utils/aws.js';
import { Department, Mentor } from '@ayra/lib/db/index.js';
loadConfig();

export const processMessage = async (msgInfo, student) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    const recipientNo = +value.contacts[0].wa_id;
    const messageType = value.messages[0].type;
    let button;
    switch (messageType) {
      case 'interactive':
        console.log("evil");
        button = value.messages[0].interactive.button_reply.id;
        await processButtonMessage(button, recipientNo, student);
        break;
      case 'button':
        button = value.messages[0].button.text;
        await processButtonMessage(button, recipientNo, student);
        break;
      case 'text':
        const message = value.messages[0].text.body;
        const keyword = await classifyMsg(message);
        await processTextMessage(keyword, recipientNo, student);
        break;
      default:
        console.log(`Only text messages are supported. Received ${messageType}.`);
        return;
    }
  } else if ('statuses' in value) {
    const messageStatus = value.statuses[0].status;
    const recipientNo = value.statuses[0].recipient_id;
    console.log(messageStatus, recipientNo);
  } else {
    console.log(field);
    console.log(value);
  }
};

const processButtonMessage = async (button, recipientNo, student) => {
  if (button === buttons.hey) await sendHeyMessage(recipientNo);
  else if (button === buttons.help) await sendHelpMessage(recipientNo);
  else if (button === buttons.result) await sendResultMessage(recipientNo);
  else if (button === buttons.attendance) await sendAttendanceMessage(recipientNo);
  else if (button === buttons.attendanceToday ) await getAttendance(recipientNo, student, 'today');
  else if (button === buttons.attendanceOverall) await getAttendance(recipientNo, student, 'overall');
  else if (button === buttons.resultLastSemester) await getResult(recipientNo, student, 'last semester');
  else if (button === buttons.resultPreviousSemester) await getResult(recipientNo, student, 'all semester');
  else if (button === buttons.moreOptions) await sendMoreOptionMessage(recipientNo);
  else if (button === buttons.contactMentor) await sendMentorContactMessage(recipientNo, student);
  else if (button === buttons.showMoreContacts) await sendMoreContactsMessage(recipientNo);
  else if (button === buttons.departmentContacts) await sendDepartmentContactMessage(recipientNo);
  else if (button === buttons.allDepartmentContacts) await sendAllDepartmentContacts(recipientNo);
  else if (button === buttons.classSchedule) console.log("Under development!");
  else if (
    button === buttons.allOptions ||
    button === buttons.moreExamples
  ) await sendAllOptionsMessage(recipientNo);
  else if (button === buttons.usageExample) await sendUsageExampleMessage(recipientNo);
  else if (button === buttons.anotherExample) await sendAnotherExampleMessage(recipientNo);
  // else if (
  //   button === buttons.howToUse
  // ) {
  //   // await metaAPI.sendMessage(recipientNo, 'This part of the application is under development. Sorry for the inconvenience.');
  //   console.log("Under development");
  // }
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
    await sendHeyMessage(recipientNo);
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

const sendHeyMessage = async (recipientNo) => {
  const text = `
Hey, there! 😃

Following are the most frequently asked questions. What would you like to know?`;

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "Attendance",
            title: "Show Attendance"
          }
        },
        {
          type: "reply",
          reply: {
            id: "Result",
            title: "Show Result"
          }
        },
        {
          type: "reply",
          reply: {
            id: "More options",
            title: "More options"
          }
        }
      ]
    }
  };

  await metaAPI.sendMessage(recipientNo, message, "interactive");
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
            id: "Last Semester",
            title: "Last Semester"
          }
        },
        {
          type: "reply",
          reply: {
            id: "All Semesters",
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
            id: "Today's Attendance",
            title: "Today's Attendance"
          }
        },
        {
          type: "reply",
          reply: {
            id: "Overall Attendance",
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
*_What is Ayra?_*
I'm your assistant and my job is to keep you updated on your child's attendance, result, and much more. Click on 'Show All Options' to see all that you can ask me.

*_How to use Ayra?_*
It's easy! Whenever you have a question, just type and hit send. For example, write 'attendance' and I'll show your child's attendance.`;

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "Hey",
            title: "Send Hey"
          }
        },
        {
          type: "reply",
          reply: {
            id: "All options",
            title: "Show all options"
          }
        },
        {
          type: "reply",
          reply: {
            id: 'Example',
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
  let text = `*_Following are the contact details of some commonly requested departments._*\n`;
  for (let department of departments) {
    text += `
${department.name}
Tel. No.: ${department.contact}\n`;
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
            id: "All Departments Contact",
            title: "Show all"
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

const sendMoreOptionMessage = async (recipientNo) => {
  const text = `Sure, here are some more options that you might find helpful`;
  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "Class Schedule",
            title: "Show Class Schedule"
          }
        },
        {
          type: "reply",
          reply: {
            id: "Mentor Contact Number",
            title: "Contact Mentor"
          }
        },
        {
          type: "reply",
          reply: {
            id: "More Contact Numbers",
            title: "Show More Contacts"
          }
        }
      ]
    }
  };
  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendMentorContactMessage = async (recipientNo, student) => {
  const mentorDetails = await Mentor.findByPk(student.mentorId);
  const message = [{
    name: {
      formatted_name: `${mentorDetails.firstName} ${mentorDetails.lastName}`,
      first_name: mentorDetails.firstName,
      last_name: mentorDetails.lastName
    },
    phones: [{
      phone: mentorDetails.contact,
      type: "Work"
    }]
  }];
  await metaAPI.sendMessage(recipientNo, message, "contacts");
};

const sendAllOptionsMessage = async (recipientNo) => {
  const text = `
*_Ayra can help you with following things:_*

1. Your ward's marks
    Example: show marks

2. Your ward's attendance
    Example: show attendance
   
3. Ward's class schedule
    Example: show time table

4. Contact number of different departments
    Example: contact number of fee/admission/dsr department
   
5. Contact number of teachers, mentors, and HOD
    Example: phone number of teachers/mentor/HOD`;

  const message = {
    body: text
  };

  await metaAPI.sendMessage(recipientNo, message, "text");
};

const sendUsageExampleMessage = async (recipientNo) => {
  const text = `
*_Sure, let's start off with an easy example._*

Type 'Show time table' and hit enter. I'll show you the schedule of classes.`;

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "Another example",
            title: "Give another example"
          }
        }
      ]
    }
  };

  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendAnotherExampleMessage = async (recipientNo) => {
  const text = `
*_Sure, here's another example._*
  
Type 'Show attendance' and hit send. In return, I'll ask you whether you want to see today's attendance or overall attendance.`

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "More examples",
            title: "Show more examples"
          }
        }
      ]
    }
  };

  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendMoreContactsMessage = async (recipientNo) => {
  const text = `Sure! Would you like to receive the contact details of the authorities or a specific department?`;

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "Departments Contacts",
            title: "Departments Contacts"
          }
        },
        {
          type: "reply",
          reply: {
            id: "Authorities Contacts",
            title: "Authorities Contacts"
          }
        }
      ]
    }
  };

  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendAllDepartmentContacts = async (recipientNo) => {
  const departments = await Department.findAll({
    attributes: ['name', 'contact'],
    offset: 3
  });
  let text = `_*Following are the contact details of all the rest departments._*\n`;
  for (let department of departments) {
    text += `
Department Name: ${department.name}
Contact Number: ${department.contact}\n`;
  }
  const message = {
    body: text
  };
  await metaAPI.sendMessage(recipientNo, message, "text");
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