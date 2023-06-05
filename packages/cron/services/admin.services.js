import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import sequelize, { Student } from '@ayra/lib/db/index.js';
import templates from '@ayra/lib/botconfig/templates.js';
import generatePDFAndUploadToS3 from '@ayra/lib/utils/generate-pdf.js';

export const firstHello = async (recipientNo) => {
  await metaAPI.sendTemplate(recipientNo, templates.initialHello.name);
};

export const publishResult = async () => {
  // Fetches the grades of every subject in every semester for every student
  // As of now, targeting only two students
  const [ subjectGrades ] = await sequelize.query(`
    SELECT registration_no, semester, subject_code, grade, tgpa FROM (
      SELECT
      registration_no,
      semester,
      tgpa,
      unnest(marks) ->> 'subjectId' AS subject_id,
      unnest(marks) ->> 'grade' AS grade
      FROM result
    ) AS new_result
    LEFT JOIN subject ON subject.id = CAST (new_result.subject_id AS INTEGER)
    WHERE registration_no IN (12100435, 11937798)
    ORDER BY registration_no, semester;
  `);

  // Organizes the subjectGrades 1d array into 3d array
  const allSemesterResult = convertToStudentAndSemesterWiseGrades(subjectGrades);
  
  await generatePDFAndUploadToS3(allSemesterResult);
};

const convertToStudentAndSemesterWiseGrades = (subjectGrades) => {
  /**
   * Organized the 1d array of subject grades into 3d array
   * 
   * result = [
   *  student1[ 
   *    semester1[ 
   *      subject1{},
   *      subject2{},
   *      ...
   *    ],
   *    semester2[
   *      subject1{},
   *      subject2{},
   *      ...
   *    ],
   *    ...
   *  ],
   *  student2[
   *    semester1[ 
   *      subject1{},
   *      subject2{},
   *      ...
   *    ],
   *    semester2[
   *      subject1{},
   *      subject2{},
   *      ...
   *    ],
   *    ...
   *  ]
   * ]
   */

  let initialRegistrationNo = subjectGrades[0].registration_no;
  let initialSem = subjectGrades[0].semester;
  let allSemesterResult = [];
  let tempSubjectArray = [];
  let tempSemesterArray = [];
  
  for (let subject of subjectGrades) {
    if (initialRegistrationNo !== subject.registration_no) {
      initialSem = subject.semester;
      tempSemesterArray.push(tempSubjectArray)
      tempSubjectArray = [];
      allSemesterResult.push(tempSemesterArray);
      tempSemesterArray = [];
      initialRegistrationNo = subject.registration_no;
    }
    if (initialSem !== subject.semester) {
      initialSem = subject.semester;
      tempSemesterArray.push(tempSubjectArray);
      tempSubjectArray = [];
    }
    tempSubjectArray.push(subject);
  }
  tempSemesterArray.push(tempSubjectArray);
  allSemesterResult.push(tempSemesterArray);

  return allSemesterResult;
}

export const postUMC = async (id, reason, conclusion) => {
  const student = await Student.findOne({
    where: {
      registrationNo: +id
    }
  });
  const text = `
Respected ${student.dataValues.fatherName},

It is being brought to your attention that an indisciple case has been filed against your child, ${student.firstName} ${student.lastName} for not adhereing to university's guidelines.

Reason for Indiscipline Case: ${reason}

Punishment/Fine: ${conclusion}

For any queries, contact Security Office.
Contact: +91 9747273623
  `
  const message = {
    body: text
  };
  await metaAPI.sendMessage(student.fatherContact, message, "text");
  await metaAPI.sendTextMessage(student.fatherContact, msg);
};