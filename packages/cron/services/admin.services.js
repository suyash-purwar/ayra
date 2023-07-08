import * as metaAPI from '@ayra/lib/apis/meta.api.js';
import sequelize, { Student, TGPA } from '@ayra/lib/db/index.js';
import templates from '@ayra/lib/botconfig/templates.js';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
import { addToBucket, getObject, getObjectURL } from '@ayra/lib/utils/aws.js';

export const firstHello = async (recipientNo) => {
  await metaAPI.sendTemplate(recipientNo, templates.initialHello.name);
};

const fetchNextBatchOfStudents = async (offset) => {
  const students =  await sequelize.query(`
    SELECT 
      s.id,
      registration_no,
      first_name,
      middle_name,
      last_name,
      session,
      c.course_code,
      semester,
      father_name,
      father_contact,
      mother_name
    FROM student s
    JOIN course c ON s.course_id = c.id
    WHERE registration_no IN (12100435, 11937798, 12276829)
    ORDER BY s.id
    LIMIT 10 OFFSET ${offset};
  `);
  return students[0];
};

const fetchStudentResult = async (studentId) => {
  // Get semester and subject wise grades
  const result = await sequelize.query(`
    SELECT 
      cs.semester,
      subject_code,
      grade
    FROM result r
    JOIN student s ON s.id = r.student_id
    JOIN course_subject cs ON cs.id = r.course_subject_id
    JOIN subject sub ON sub.id = cs.subject_id
    WHERE s.id=${studentId}
    ORDER BY semester;
  `);
  // Get semester wise tgpa
  const tgpa = await TGPA.findAll({
    where: { studentId },
    attributes: ['semester', 'tgpa']
  });
  return { 
    studentSemesterWiseGrades: result[0],
    studentSemesterWiseTGPA: tgpa 
  };
};

const combineAndFormatStudentData = (student, studentPhoto, grades, tgpa) => {
  delete student['id'];
  student.photo = studentPhoto;
  const pdfData = {
    ...student,
    result: []
  };
  for (let semesterTgpa of tgpa) {
    pdfData.result.push({
      semester: semesterTgpa.semester,
      tgpa: semesterTgpa.tgpa,
      grades: []
    });
  }
  for (let grade of grades) {
    pdfData.result[grade.semester - 1].grades.push(grade);
  }
  return pdfData;
};

const launchBrowser = async () => {
  // Launch browser and tabs
  const browser = await puppeteer.launch();
  const tabForAllSemesterPdf = await browser.newPage();
  const tabForLastSemesterPdf = await browser.newPage();

  // Renders Pdf
  return {
    async renderPdf(pdfData) {
      const resultTemplatePath = "/media/suyash/HDD/realwork/lpu-bot-prototype/packages/lib/static/template/result.ejs";
      const registrationNo = pdfData.student.registration_no;
      
      pdfData.resultType = 'all semester';
      const allSemesterPdfHtml = await ejs.renderFile(resultTemplatePath, pdfData);
      await tabForAllSemesterPdf.setContent(allSemesterPdfHtml, { waitUntil: 'domcontentloaded' });
      await tabForAllSemesterPdf.emulateMediaType('screen');
      const allSemesterResultPdfBuffer = await tabForAllSemesterPdf.pdf({
        printBackground: true,
        format: 'A4'
      });

      pdfData.resultType = 'last semester';
      const lastSemesterPdfHtml = await ejs.renderFile(resultTemplatePath, pdfData);
      await tabForLastSemesterPdf.setContent(lastSemesterPdfHtml, { waitUntil: 'domcontentloaded' });
      await tabForAllSemesterPdf.emulateMediaType('screen');
      const lastSemesterResultPdfBuffer = await tabForLastSemesterPdf.pdf({
        printBackground: true,
        format: 'A4'
      });

      return {
        lastSemesterResultPdf: {
          filename: `Last Semester Result ${registrationNo}.pdf`,
          buffer: lastSemesterResultPdfBuffer,
        },
        allSemesterResultPdf: {
          filename: `All Semester Result ${registrationNo}.pdf`,
          buffer: allSemesterResultPdfBuffer
        }
      };
    }
  }
}

const sendLastSemesterResultToParents = async (fatherName, fatherContact, semester, pdfName, pdfUrl) => {
  const message = [
    {
      type: "header",
      parameters: [
        {
          type: "document",
          document: {
            link: pdfUrl,
            filename: pdfName
          }
        }
      ]
    },
    {
      type: "body",
      parameters: [
        {
          type: "text",
          text: fatherName
        },
        {
          type: "text",
          text: semester
        }
      ]
    }
  ];

  await metaAPI.sendTemplate(fatherContact, templates.resultDeclare.name, message);
};

export const publishResult = async () => {
  // Get static resources
  const lpuLogo = (await fs.readFile("/media/suyash/HDD/realwork/lpu-bot-prototype/packages/lib/media/raw/full-logo-no-bg.png")).toString("base64");
  const pdfData = {
    pdfAssets: {
      lpuLogo
    }
  };
  const offset = 0;
  const browser = await launchBrowser();
  let studentsBatch;
  do {
    let index = 0;  
    // Fetches the data of 10 students at once
    studentsBatch = await fetchNextBatchOfStudents(offset);
    while (index < studentsBatch.length) {
      const student = studentsBatch[index];
      const { studentSemesterWiseGrades, studentSemesterWiseTGPA } = await fetchStudentResult(student.id);
      
      // Get student's photo from S3
      const studentPhoto = await getObject('profile-image', `${student.registration_no}.png`);
  
      // Unify the student, studentSemesterWiseGrades, studentSemesterWiseTGPA, and studentPhoto into a single coherent object
      let completeStudentData = combineAndFormatStudentData(student, studentPhoto, studentSemesterWiseGrades, studentSemesterWiseTGPA);
      pdfData.student = completeStudentData;
  
      // Generate PDF and get the buffers of them
      const { lastSemesterResultPdf, allSemesterResultPdf } = await browser.renderPdf(pdfData);
  
      // Push the all semesters and previous semesters result to S3 bucket
      await addToBucket('result', lastSemesterResultPdf.filename, lastSemesterResultPdf.buffer);
      await addToBucket('result', allSemesterResultPdf.filename, allSemesterResultPdf.buffer);
      
      let lastSemesterResultPdfUrl = await getObjectURL('result', lastSemesterResultPdf.filename);
  
      console.log(lastSemesterResultPdfUrl);
      await sendLastSemesterResultToParents(
        student.father_name,
        student.father_contact, 
        student.semester,
        lastSemesterResultPdf.filename,
        lastSemesterResultPdfUrl
      );
      index++;
    }
  } while (studentsBatch.length === 10); // Fetch the next batch of student only if the previous batch was full
};

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