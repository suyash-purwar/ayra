import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import { Student, Result } from '@ayra/lib/db/index.js';
import templates from '@ayra/lib/botconfig/templates.js';

export const firstHello = async (recipientNo) => {
  await metaAPI.sendMenu(recipientNo, templates.initialHello.name);
};

export const publishResult = async () => {
//   const students = await Student.findAll({
//     attributes: ['registrationNo', 'motherContact', 'fatherContact', 'semester']
//   });
//   console.log(students[0].firstName);
//   for (let student of students) {
//     // Blocklisting all numbers other than ALLOWED_NUMBERS
//     const ALLOWED_NUMBERS = ['919058765425', '917009772298'];
//     if (
//       ALLOWED_NUMBERS.indexOf(student.fatherContact) === -1 || 
//       ALLOWED_NUMBERS.indexOf(student.motherContact) === -1
//     ) continue
//     let resultOfStudent = await Result.findOne({
//       where: {
//         id: student.registrationNo
//       }
//     });
//     let lastSemester = resultOfStudent.semester_result[resultOfStudent.semester_result.length - 1];
//     let message = `*Semester ${lastSemester.semester} results are out now.*\n`;
//     for (let subject of lastSemester.marks) {
//       message += `
// Subject Code: ${subject.sub_code}
// Grade: ${subject.grade}\n`;
//     }
//     message += `TGPA: ${lastSemester.tgpa}`;
//     await  metaAPI.sendTextMessage(+student.contact, message);
//   }
  console.log("Running");
};

export const postUMC = async (id, reason, conclusion) => {
  const student = await Student.findOne({ id }, 'name contact guardians.name');
  const msg = `
Respected ${student.guardians.name},

It is being brought to your attention that an indisciple case has been filed against your child, ${student.name} for not adhereing to university's guidelines.

Reason for Indiscipline Case: ${reason}

Punishment/Fine: ${conclusion}

For any queries, contact Security Office.
Contact: +91 9747273623
  `
  await metaApi.sendTextMessage(student.contact, msg);
};