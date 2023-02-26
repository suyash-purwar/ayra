import * as metaAPI from './../apis/meta.api.js';
import Student from './../models/student.model.js';
import Result from './../models/result.model.js';

export const firstHello = async (recipientNo) => {
  await metaAPI.sendMenu(recipientNo, 'first_hello');
};

export const publishResult = async () => {
  // Query the Student doc, fetch the Reg. Id and phone no
  // Query the Result doc by matching Reg. Id. and send the message to
  // the associated phone numbers

  // Add a temporary student filter for testing purposes
  const students = await Student.find({}, 'id contact');
  console.log(students);
  for (let student of students) {
    // Blocklisting all numbers other than these two
    if (['919058765425', '919631733112'].indexOf(student.contact) === -1) continue
    let resultOfStudent = await Result.findOne({
      id: student.id
    }, 'overall_cgpa semester_result');
    let lastSemester = resultOfStudent.semester_result[resultOfStudent.semester_result.length - 1];
    let message = `*Semester ${lastSemester.semester} results are out now.*\n`;
    for (let subject of lastSemester.marks) {
      message += `
Subject Code: ${subject.sub_code}
Grade: ${subject.grade}\n`;
    }
    message += `TGPA: ${lastSemester.tgpa}`;
    // Send message to the student
    console.log(message);
    await metaAPI.sendTextMessage(+student.contact, message);
  }
};