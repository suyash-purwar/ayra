import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import classifier from '@ayra/lib/apis/openai.api.js';
import buttons from '@ayra/lib/botconfig/buttons.js';
import intentList from '@ayra/lib/botconfig/intent.js';
import generateAttendanceImage from '@ayra/lib/utils/generate-image.js';
import { getObjectURL } from '@ayra/lib/utils/aws.js';
import sequelize, { 
  Department,
  Mentor,
  HOD,
  Section,
  Hostel
} from '@ayra/lib/db/index.js';
import templates from '@ayra/lib/botconfig/templates.js';
import loadConfig from '@ayra/lib/utils/config.js';

loadConfig();

const WORKING_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const processMessage = async (msgInfo, student) => {
  const { value, field } = msgInfo;

  if (field !== 'messages') return res.sendStatus(403);

  if ('messages' in value) {
    const recipientNo = +value.contacts[0].wa_id;
    const messageType = value.messages[0].type;
    let button;
    switch (messageType) {
      case 'interactive':
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
  else if (button === buttons.moreContacts) await sendMoreContactsMessage(recipientNo);
  else if (button === buttons.departmentContacts) await sendDepartmentContactMessage(recipientNo);
  else if (button === buttons.allDepartmentContacts) await sendAllDepartmentContactsMessage(recipientNo);
  else if (button === buttons.classSchedule) await sendClassScheduleMessage(recipientNo, student);
  else if (
    button === buttons.allOptions ||
    button === buttons.moreExamples
  ) await sendAllOptionsMessage(recipientNo);
  else if (
    button === buttons.usageExample ||
    button === buttons.howToUse
  ) await sendUsageExampleMessage(recipientNo);
  else if (button === buttons.anotherExample) await sendAnotherExampleMessage(recipientNo);
  else if (button === buttons.authoritiesContacts) await sendAuthoritiesContactMessage(recipientNo, student);
  else if (button === buttons.facultyContacts) await sendFacultyContactsMessage(recipientNo, student);
};

// Handle the cases where the probability for a class
// is below a certain threshold
const classifyMsg = async (msgText) => {
  const intentId = await classifier(msgText);
  console.log(intentId);

  return intentList[intentId];
};

const processTextMessage = async (intent, recipientNo, student) => {
  if (intent === intentList[0]) {
    await sendHeyMessage(recipientNo);
  } else if (intent === intentList[1]) {
    await sendResultMessage(recipientNo);
  } else if (intent === intentList[2]) {
    await sendAttendanceMessage(recipientNo);
  } else if (intent === intentList[3]) {
    await sendDepartmentContactMessage(recipientNo);
  } else if (intent === intentList[4]) {
    await sendAuthoritiesContactMessage(recipientNo, student);  
  } else if (intent === intentList[5]) {
    await sendClassScheduleMessage(recipientNo, student);
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
            id: "Last Semester Result",
            title: "Last Semester"
          }
        },
        {
          type: "reply",
          reply: {
            id: "All Semesters Result",
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

const sendAllDepartmentContactsMessage = async (recipientNo) => {
  const departments = await Department.findAll({
    attributes: ['name', 'contact'],
    offset: 3
  });
  let text = `_*Following are the contact details of all the rest departments.*_\n`;
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

const sendIntentNotRecognizedMessage = async (recipientNo) => {
  const message = {
    body: "Intent not recognized"
  };
  await metaAPI.sendMessage(recipientNo, message);
};

const sendClassScheduleMessage = async (recipientNo, student) => {
  const everydaySchedule = await sequelize.query(`
    SELECT 
      sub.subject_code,
      day,
      slot
    FROM student s
    JOIN lecture l ON s.section_id = l.section_id
    JOIN course_subject cs ON l.course_subject_id = cs.id
    JOIN subject sub ON sub.id = cs.subject_id
    JOIN hour_slot hs ON hs.id = l.hour_slot_id
    WHERE s.id=${student.id}
    ORDER BY day, hs.id;
  `);
  let text = `*_Sure, here's the schedule of classes for the ongoing semester._*`;
  let currentDay = 0;
  for (let schedule of everydaySchedule[0]) {
    if (currentDay != schedule.day) {
      text += `\n\n*Day: ${WORKING_DAYS[+schedule.day-1]}*`
      currentDay = schedule.day
    }
    text += `\nSubject: ${schedule.subject_code.slice(0, 6)} - Timing: ${schedule.slot}`;
  }
  const message = {
    body: text
  };
  await metaAPI.sendMessage(recipientNo, message, "text");
}

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

const sendAuthoritiesContactMessage = async (recipientNo, student) => {
  const mentor = await Mentor.findByPk(student.mentorId, {
    attributes: ['firstName', 'middleName', 'lastName', 'contact']
  });
  const section = await Section.findByPk(student.sectionId, {
    attributes: ['hodId']
  });
  const hod = await HOD.findByPk(section.hodId, {
    attributes: ['firstName', 'middleName', 'lastName', 'contact']
  });
  const hostel = await Hostel.findByPk(student.hostelId, {
    attributes: ['warden', 'contact']
  });
  console.log(mentor.firstName, mentor.middleName, mentor.lastName, mentor.contact);
  console.log(hod.firstName, hod.middleName, hod.lastName, hod.contact);
  console.log(hostel.warden, hostel.contact);

  const text = `
_*Sure, here are the contact number of authorities you can reach out to.*_

Mentor's Name:  ${mentor.firstName} ${mentor.lastName}
Contact: ${mentor.contact}

Hostel Warden Name: ${hostel.warden}
Contact: ${hostel.contact}

HOD Name: ${hod.firstName} ${hod.lastName}
Contact: ${hod.contact}

If you want to see contact details of your ward's faculty, click on the button below.`;

  const message = {
    type: "button",
    body: { text },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "Faculty Contacts",
            title: "See Faculty Contacts"
          }
        }
      ]
    }
  };

  await metaAPI.sendMessage(recipientNo, message, "interactive");
};

const sendFacultyContactsMessage = async (recipientNo, student) => {
  const faculties = await sequelize.query(`
    SELECT 
      DISTINCT subject_code,
      f.first_name,
      f.middle_name,
      f.last_name,
      f.contact
    FROM student s
    JOIN lecture l ON l.section_id = s.section_id
    JOIN course_subject cs ON l.course_subject_id = cs.id
    JOIN subject sub ON sub.id = cs.subject_id
    JOIN faculty f ON l.faculty_id = f.id
    WHERE s.id=${student.id};
  `);
  let text = `_*Sure, here's the subject-wise faculty for this semester.*_`;
  for (let faculty of faculties[0]) {
    text += `\n
Faculty Name: ${faculty.first_name} ${faculty.last_name}
Subject Code: ${faculty.subject_code.slice(0, 6)}
Contact: ${faculty.contact}`;
  };
  const message = {
    body: text
  }
  await metaAPI.sendMessage(recipientNo, message, "text");
}

const getAttendance = async (recipientNo, student, attendanceType) => {
  let uri = `${process.env.API_URI}/webhook/getAttendanceImage?id=${student.id}&attendanceType=${attendanceType}`;
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
  const message = [
    {
      type: "header",
      parameters: [
        {
          type: "document",
          document: {
            link: url,
            filename: fileName
          }
        }
      ]
    },
    {
      type: "body",
      parameters: [
        {
          type: "text",
          text: student.fatherName
        },
        {
          type: "text",
          text: student.semester
        }
      ]
    }
  ];
  await metaAPI.sendTemplate(recipientNo, templates.resultDeclare.name, message);
};

// Webhook
// Serve attendance images when requested from Meta
export const getAttendanceImage = async (studentId, attendanceType) => {
  const [ student ] = await sequelize.query(`
    SELECT 
      registration_no,
      first_name,
      middle_name,
      last_name,
      course_code,
      semester
    FROM student s
    LEFT JOIN course c
      ON c.id = s.course_id
    WHERE s.id=${studentId};
  `);
  const data = {
    registrationNo: student[0].registration_no,
    name: `${student[0].first_name} ${student[0].middle_name || ''} ${student[0].last_name}`,
    courseCode: student[0].course_code
  };

  // Show today's attendance differently on each day
  // Day 0 and 6 represents Sunday and Saturday respectively
  // So, for those days, attendance of day = 5(Friday) is shown
  let currentDate = new Date(Date.now());
  let day = currentDate.getDay();
  if (day == 0 || day == 6) day = 5;

  switch (attendanceType) {
    case 'today':
      // Fetches the today's attendance in the lectures commenced today
      const [ todaysAttendance ] = await sequelize.query(`
        SELECT 
          sub.subject_code,
          a.status,
          hs.slot,
          date
        FROM student s
        JOIN attendance a ON a.student_id = s.id
        JOIN lecture l ON l.id = a.lecture_id
        JOIN course_subject cs ON cs.id = l.course_subject_id
        JOIN subject sub ON sub.id = cs.id
        JOIN hour_slot hs ON hs.id = l.hour_slot_id
        WHERE s.id=${studentId} AND day='${day.toString()}'
        ORDER BY hs.id;
      `);
      data.attendance = todaysAttendance;
      break;
    case 'overall':
      // Fetches the overall attendance in all subject of the current semester
      const [ overallAttendance ] = await sequelize.query(`
        SELECT 
          subject_code,
          attendance
        FROM student s
        JOIN overall_attendance oa ON oa.student_id = s.id
        JOIN course_subject cs ON cs.id = oa.course_subject_id
        JOIN subject sub ON sub.id = cs.subject_id
        WHERE cs.semester = s.semester AND s.id=4;
      `);
      data.attendance = overallAttendance;
      break;
  }
  const imageBuffer = await generateAttendanceImage(data, attendanceType);
  return imageBuffer;
};