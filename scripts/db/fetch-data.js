import connectBD from "../../db/connect.js";
// Connect to database before making a call to the database
await connectBD();

import Result from "../../models/result.model.js";
import Student from "../../models/student.model.js";

const fetchStudentRecords = async () => {
  const response = await Student.find({});
  console.log(JSON.stringify(response, null, 2));
  console.log(response);
};

const fetchResultRecords = async () => {
  const response = await Result.findOne({ id: 12100435 });
  console.log(response);
};

await fetchStudentRecords();
// await fetchResultRecords();