import Hostel from "../models/hostel.model.js";
import Subject from "../models/subject.model.js";
import Mentor from '../models/mentor.model.js';
import Department from '../models/department.model.js';
import Course from '../models/course.model.js';
import Warden from "../models/warden.model.js";
import Student from '../models/student.model.js';
import OverallAttendance from "../models/overall-attendance.model.js";
import Attendance from "../models/attendance.model.js";
import HourSlot from "../models/hour-slot.model.js";
import Result from '../models/result.model.js';

// await Result.bulkCreate([
  // {
  //   id: 1,
  //   registrationNo: 12100435,
  //   semester: 1,
  //   tgpa: 5.34,
  //   marks: [
  //     {
  //       subjectId: 19,
  //       grade: "B+",
  //       ca: 24,
  //       mte: 0,
  //       ete: 38,
  //       attendance: 4
  //     },
  //     {
  //       subjectId: 26,
  //       grade: "A",
  //       ca: 18,
  //       mte: 20,
  //       ete: 44,
  //       attendance: 5
  //     },
  //     {
  //       subjectId: 15,
  //       grade: "O",
  //       ca: 11,
  //       mte: 16,
  //       ete: 28,
  //       attendance: 0
  //     },
  //     {
  //       subjectId: 22,
  //       grade: "A",
  //       ca: 4,
  //       mte: 2,
  //       ete: 12,
  //       attendance: 3
  //     },
  //     {
  //       subjectId: 17,
  //       grade: "+A",
  //       ca: 24,
  //       mte: 16,
  //       ete: 28,
  //       attendance: 4
  //     },
  //     {
  //       subjectId: 24,
  //       grade: "B+",
  //       ca: 24,
  //       mte: 5,
  //       ete: 47,
  //       attendance: 5
  //     },
  //     {
  //       subjectId: 23,
  //       grade: "C",
  //       ca: 11,
  //       mte: 7,
  //       ete: 40,
  //       attendance: 1
  //     },
  //     {
  //       subjectId: 1,
  //       grade: "+A",
  //       ca: 14,
  //       mte: 10,
  //       ete: 49,
  //       attendance: 5
  //     }
  //   ]
  // }, {
  //   id: 2,
  //   registrationNo: 12100435,
  //   semester: 2,
  //   tgpa: 4.79,
  //   marks: [
  //     {
  //       subjectId: 29,
  //       grade: "A",
  //       ca: 18,
  //       mte: 13,
  //       ete: 36,
  //       attendance: 3
  //     },
  //     {
  //       subjectId: 30,
  //       grade: "B+",
  //       ca: 7,
  //       mte: 4,
  //       ete: 10,
  //       attendance: 3
  //     },
  //     {
  //       subjectId: 24,
  //       grade: "D",
  //       ca: 20,
  //       mte: 8,
  //       ete: 33,
  //       attendance: 3
  //     },
  //     {
  //       subjectId: 11,
  //       grade: "C",
  //       ca: 16,
  //       mte: 18,
  //       ete: 24,
  //       attendance: 3
  //     },
  //     {
  //       subjectId: 26,
  //       grade: "C",
  //       ca: 13,
  //       mte: 15,
  //       ete: 1,
  //       attendance: 2
  //     },
  //     {
  //       subjectId: 3,
  //       grade: "O",
  //       ca: 19,
  //       mte: 20,
  //       ete: 41,
  //       attendance: 5
  //     },
  //     {
  //       subjectId: 13,
  //       grade: "C",
  //       ca: 20,
  //       mte: 13,
  //       ete: 47,
  //       attendance: 2
  //     },
  //     {
  //       subjectId: 24,
  //       grade: "A",
  //       ca: 3,
  //       mte: 11,
  //       ete: 9,
  //       attendance: 1
  //     }
  //   ]
  // }, {
  //   id: 3,
  //   registrationNo: 12100435,
  //   semester: 3,
  //   tgpa: 8.64,
  //   marks: [
  //     {
  //       subjectId: 23,
  //       grade: "A",
  //       ca: 14,
  //       mte: 7,
  //       ete: 25,
  //       attendance: 0
  //     },
  //     {
  //       subjectId: 26,
  //       grade: "B+",
  //       ca: 25,
  //       mte: 13,
  //       ete: 39,
  //       attendance: 2
  //     },
  //     {
  //       subjectId: 12,
  //       grade: "C",
  //       ca: 0,
  //       mte: 12,
  //       ete: 0,
  //       attendance: 4
  //     },
  //     {
  //       subjectId: 17,
  //       grade: "+A",
  //       ca: 21,
  //       mte: 6,
  //       ete: 5,
  //       attendance: 1
  //     },
  //     {
  //       subjectId: 27,
  //       grade: "B",
  //       ca: 20,
  //       mte: 13,
  //       ete: 31,
  //       attendance: 4
  //     },
  //     {
  //       subjectId: 7,
  //       grade: "D",
  //       ca: 5,
  //       mte: 7,
  //       ete: 1,
  //       attendance: 1
  //     },
  //     {
  //       subjectId: 19,
  //       grade: "O",
  //       ca: 24,
  //       mte: 0,
  //       ete: 42,
  //       attendance: 2
  //     },
  //     {
  //       subjectId: 22,
  //       grade: "B+",
  //       ca: 18,
  //       mte: 10,
  //       ete: 7,
  //       attendance: 5
  //     }
  //   ]
  // }
//   {
//     "id": 4,
//     "registrationNo": 11937798,
//     "semester": 1,
//     "tgpa": 7.74,
//     "marks": [
//       {
//         "subjectId": 12,
//         "grade": "O",
//         "ca": 12,
//         "mte": 17,
//         "ete": 17,
//         "attendance": 1
//       },
//       {
//         "subjectId": 23,
//         "grade": "B+",
//         "ca": 10,
//         "mte": 13,
//         "ete": 17,
//         "attendance": 0
//       },
//       {
//         "subjectId": 9,
//         "grade": "B",
//         "ca": 13,
//         "mte": 16,
//         "ete": 4,
//         "attendance": 3
//       },
//       {
//         "subjectId": 29,
//         "grade": "C",
//         "ca": 10,
//         "mte": 9,
//         "ete": 12,
//         "attendance": 3
//       },
//       {
//         "subjectId": 20,
//         "grade": "D",
//         "ca": 13,
//         "mte": 8,
//         "ete": 4,
//         "attendance": 1
//       },
//       {
//         "subjectId": 13,
//         "grade": "O",
//         "ca": 7,
//         "mte": 17,
//         "ete": 44,
//         "attendance": 3
//       },
//       {
//         "subjectId": 2,
//         "grade": "A",
//         "ca": 20,
//         "mte": 20,
//         "ete": 22,
//         "attendance": 5
//       },
//       {
//         "subjectId": 9,
//         "grade": "O",
//         "ca": 10,
//         "mte": 2,
//         "ete": 20,
//         "attendance": 1
//       }
//     ]
//   }, {
//     "id": 5,
//     "registrationNo": 11937798,
//     "semester": 2,
//     "tgpa": 3.22,
//     "marks": [
//       {
//         "subjectId": 8,
//         "grade": "D",
//         "ca": 9,
//         "mte": 12,
//         "ete": 28,
//         "attendance": 1
//       },
//       {
//         "subjectId": 3,
//         "grade": "O",
//         "ca": 24,
//         "mte": 20,
//         "ete": 26,
//         "attendance": 1
//       },
//       {
//         "subjectId": 15,
//         "grade": "B+",
//         "ca": 23,
//         "mte": 20,
//         "ete": 26,
//         "attendance": 3
//       },
//       {
//         "subjectId": 14,
//         "grade": "C",
//         "ca": 24,
//         "mte": 16,
//         "ete": 33,
//         "attendance": 5
//       },
//       {
//         "subjectId": 28,
//         "grade": "C",
//         "ca": 10,
//         "mte": 10,
//         "ete": 26,
//         "attendance": 5
//       },
//       {
//         "subjectId": 21,
//         "grade": "C",
//         "ca": 11,
//         "mte": 12,
//         "ete": 47,
//         "attendance": 3
//       },
//       {
//         "subjectId": 9,
//         "grade": "A",
//         "ca": 18,
//         "mte": 4,
//         "ete": 26,
//         "attendance": 2
//       },
//       {
//         "subjectId": 7,
//         "grade": "B",
//         "ca": 13,
//         "mte": 9,
//         "ete": 11,
//         "attendance": 2
//       }
//     ]
//   }, {
//     "id": 6,
//     "registrationNo": 11937798,
//     "semester": 3,
//     "tgpa": 7.38,
//     "marks": [
//       {
//         "subjectId": 7,
//         "grade": "+A",
//         "ca": 7,
//         "mte": 8,
//         "ete": 23,
//         "attendance": 1
//       },
//       {
//         "subjectId": 3,
//         "grade": "+A",
//         "ca": 5,
//         "mte": 18,
//         "ete": 3,
//         "attendance": 3
//       },
//       {
//         "subjectId": 2,
//         "grade": "+A",
//         "ca": 1,
//         "mte": 15,
//         "ete": 31,
//         "attendance": 1
//       },
//       {
//         "subjectId": 16,
//         "grade": "O",
//         "ca": 23,
//         "mte": 0,
//         "ete": 28,
//         "attendance": 5
//       },
//       {
//         "subjectId": 26,
//         "grade": "C",
//         "ca": 6,
//         "mte": 18,
//         "ete": 24,
//         "attendance": 1
//       },
//       {
//         "subjectId": 7,
//         "grade": "D",
//         "ca": 4,
//         "mte": 13,
//         "ete": 46,
//         "attendance": 4
//       },
//       {
//         "subjectId": 16,
//         "grade": "B+",
//         "ca": 9,
//         "mte": 20,
//         "ete": 27,
//         "attendance": 0
//       },
//       {
//         "subjectId": 14,
//         "grade": "C",
//         "ca": 6,
//         "mte": 16,
//         "ete": 39,
//         "attendance": 2
//       }
//     ]
//   }, {
//     "id": 7,
//     "registrationNo": 11937798,
//     "semester": 4,
//     "tgpa": 6.94,
//     "marks": [
//       {
//         "subjectId": 28,
//         "grade": "B+",
//         "ca": 12,
//         "mte": 17,
//         "ete": 27,
//         "attendance": 4
//       },
//       {
//         "subjectId": 15,
//         "grade": "O",
//         "ca": 25,
//         "mte": 3,
//         "ete": 47,
//         "attendance": 4
//       },
//       {
//         "subjectId": 24,
//         "grade": "B+",
//         "ca": 20,
//         "mte": 20,
//         "ete": 9,
//         "attendance": 0
//       },
//       {
//         "subjectId": 16,
//         "grade": "D",
//         "ca": 6,
//         "mte": 15,
//         "ete": 36,
//         "attendance": 0
//       },
//       {
//         "subjectId": 2,
//         "grade": "D",
//         "ca": 22,
//         "mte": 6,
//         "ete": 5,
//         "attendance": 2
//       },
//       {
//         "subjectId": 5,
//         "grade": "D",
//         "ca": 1,
//         "mte": 12,
//         "ete": 3,
//         "attendance": 1
//       },
//       {
//         "subjectId": 7,
//         "grade": "D",
//         "ca": 23,
//         "mte": 11,
//         "ete": 7,
//         "attendance": 3
//       },
//       {
//         "subjectId": 27,
//         "grade": "B+",
//         "ca": 9,
//         "mte": 4,
//         "ete": 17,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 8,
//     "registrationNo": 11937798,
//     "semester": 5,
//     "tgpa": 8.34,
//     "marks": [
//       {
//         "subjectId": 4,
//         "grade": "D",
//         "ca": 8,
//         "mte": 12,
//         "ete": 15,
//         "attendance": 3
//       },
//       {
//         "subjectId": 20,
//         "grade": "B",
//         "ca": 12,
//         "mte": 12,
//         "ete": 26,
//         "attendance": 2
//       },
//       {
//         "subjectId": 19,
//         "grade": "O",
//         "ca": 18,
//         "mte": 13,
//         "ete": 27,
//         "attendance": 0
//       },
//       {
//         "subjectId": 18,
//         "grade": "A",
//         "ca": 4,
//         "mte": 18,
//         "ete": 15,
//         "attendance": 0
//       },
//       {
//         "subjectId": 2,
//         "grade": "+A",
//         "ca": 13,
//         "mte": 14,
//         "ete": 32,
//         "attendance": 2
//       },
//       {
//         "subjectId": 16,
//         "grade": "D",
//         "ca": 17,
//         "mte": 1,
//         "ete": 20,
//         "attendance": 0
//       },
//       {
//         "subjectId": 13,
//         "grade": "+A",
//         "ca": 19,
//         "mte": 13,
//         "ete": 5,
//         "attendance": 4
//       },
//       {
//         "subjectId": 22,
//         "grade": "D",
//         "ca": 4,
//         "mte": 11,
//         "ete": 12,
//         "attendance": 4
//       }
//     ]
//   }, {
//     "id": 9,
//     "registrationNo": 11937798,
//     "semester": 6,
//     "tgpa": 8.07,
//     "marks": [
//       {
//         "subjectId": 21,
//         "grade": "+A",
//         "ca": 13,
//         "mte": 6,
//         "ete": 8,
//         "attendance": 2
//       },
//       {
//         "subjectId": 23,
//         "grade": "B",
//         "ca": 7,
//         "mte": 8,
//         "ete": 34,
//         "attendance": 2
//       },
//       {
//         "subjectId": 1,
//         "grade": "+A",
//         "ca": 1,
//         "mte": 10,
//         "ete": 11,
//         "attendance": 2
//       },
//       {
//         "subjectId": 1,
//         "grade": "C",
//         "ca": 24,
//         "mte": 6,
//         "ete": 2,
//         "attendance": 3
//       },
//       {
//         "subjectId": 1,
//         "grade": "O",
//         "ca": 8,
//         "mte": 17,
//         "ete": 25,
//         "attendance": 0
//       },
//       {
//         "subjectId": 26,
//         "grade": "B",
//         "ca": 18,
//         "mte": 15,
//         "ete": 26,
//         "attendance": 0
//       },
//       {
//         "subjectId": 23,
//         "grade": "A",
//         "ca": 7,
//         "mte": 9,
//         "ete": 42,
//         "attendance": 2
//       },
//       {
//         "subjectId": 24,
//         "grade": "D",
//         "ca": 15,
//         "mte": 10,
//         "ete": 28,
//         "attendance": 3
//       }
//     ]
//   }, {
//     "id": 10,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "tgpa": 6.79,
//     "marks": [
//       {
//         "subjectId": 9,
//         "grade": "C",
//         "ca": 2,
//         "mte": 2,
//         "ete": 31,
//         "attendance": 0
//       },
//       {
//         "subjectId": 5,
//         "grade": "D",
//         "ca": 22,
//         "mte": 13,
//         "ete": 9,
//         "attendance": 3
//       },
//       {
//         "subjectId": 26,
//         "grade": "A",
//         "ca": 20,
//         "mte": 10,
//         "ete": 40,
//         "attendance": 5
//       },
//       {
//         "subjectId": 23,
//         "grade": "C",
//         "ca": 21,
//         "mte": 16,
//         "ete": 20,
//         "attendance": 2
//       },
//       {
//         "subjectId": 23,
//         "grade": "B+",
//         "ca": 13,
//         "mte": 13,
//         "ete": 38,
//         "attendance": 2
//       },
//       {
//         "subjectId": 21,
//         "grade": "C",
//         "ca": 7,
//         "mte": 11,
//         "ete": 22,
//         "attendance": 5
//       },
//       {
//         "subjectId": 30,
//         "grade": "O",
//         "ca": 19,
//         "mte": 6,
//         "ete": 27,
//         "attendance": 5
//       },
//       {
//         "subjectId": 6,
//         "grade": "D",
//         "ca": 0,
//         "mte": 17,
//         "ete": 11,
//         "attendance": 1
//       }
//     ]
//   },
//   {
//     "id": 11,
//     "registrationNo": 12142622,
//     "semester": 1,
//     "tgpa": 5.02,
//     "marks": [
//       {
//         "subjectId": 8,
//         "grade": "C",
//         "ca": 23,
//         "mte": 14,
//         "ete": 10,
//         "attendance": 0
//       },
//       {
//         "subjectId": 8,
//         "grade": "+A",
//         "ca": 0,
//         "mte": 3,
//         "ete": 44,
//         "attendance": 2
//       },
//       {
//         "subjectId": 16,
//         "grade": "C",
//         "ca": 20,
//         "mte": 14,
//         "ete": 21,
//         "attendance": 4
//       },
//       {
//         "subjectId": 9,
//         "grade": "+A",
//         "ca": 8,
//         "mte": 7,
//         "ete": 12,
//         "attendance": 5
//       },
//       {
//         "subjectId": 9,
//         "grade": "O",
//         "ca": 19,
//         "mte": 10,
//         "ete": 6,
//         "attendance": 1
//       },
//       {
//         "subjectId": 19,
//         "grade": "C",
//         "ca": 8,
//         "mte": 13,
//         "ete": 47,
//         "attendance": 1
//       },
//       {
//         "subjectId": 10,
//         "grade": "A",
//         "ca": 20,
//         "mte": 19,
//         "ete": 34,
//         "attendance": 3
//       },
//       {
//         "subjectId": 8,
//         "grade": "+A",
//         "ca": 16,
//         "mte": 9,
//         "ete": 44,
//         "attendance": 0
//       }
//     ]
//   }, {
//     "id": 12,
//     "registrationNo": 12142622,
//     "semester": 2,
//     "tgpa": 8.19,
//     "marks": [
//       {
//         "subjectId": 23,
//         "grade": "+A",
//         "ca": 8,
//         "mte": 15,
//         "ete": 38,
//         "attendance": 3
//       },
//       {
//         "subjectId": 29,
//         "grade": "C",
//         "ca": 25,
//         "mte": 0,
//         "ete": 50,
//         "attendance": 1
//       },
//       {
//         "subjectId": 10,
//         "grade": "C",
//         "ca": 22,
//         "mte": 19,
//         "ete": 25,
//         "attendance": 4
//       },
//       {
//         "subjectId": 30,
//         "grade": "O",
//         "ca": 16,
//         "mte": 20,
//         "ete": 35,
//         "attendance": 1
//       },
//       {
//         "subjectId": 20,
//         "grade": "B",
//         "ca": 5,
//         "mte": 14,
//         "ete": 20,
//         "attendance": 5
//       },
//       {
//         "subjectId": 5,
//         "grade": "O",
//         "ca": 13,
//         "mte": 18,
//         "ete": 16,
//         "attendance": 3
//       },
//       {
//         "subjectId": 28,
//         "grade": "A",
//         "ca": 15,
//         "mte": 9,
//         "ete": 49,
//         "attendance": 3
//       },
//       {
//         "subjectId": 23,
//         "grade": "O",
//         "ca": 7,
//         "mte": 20,
//         "ete": 12,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 13,
//     "registrationNo": 12142622,
//     "semester": 3,
//     "tgpa": 9.52,
//     "marks": [
//       {
//         "subjectId": 3,
//         "grade": "O",
//         "ca": 3,
//         "mte": 5,
//         "ete": 26,
//         "attendance": 2
//       },
//       {
//         "subjectId": 8,
//         "grade": "A",
//         "ca": 2,
//         "mte": 8,
//         "ete": 27,
//         "attendance": 3
//       },
//       {
//         "subjectId": 15,
//         "grade": "+A",
//         "ca": 13,
//         "mte": 11,
//         "ete": 22,
//         "attendance": 1
//       },
//       {
//         "subjectId": 7,
//         "grade": "C",
//         "ca": 5,
//         "mte": 12,
//         "ete": 13,
//         "attendance": 4
//       },
//       {
//         "subjectId": 5,
//         "grade": "B",
//         "ca": 22,
//         "mte": 18,
//         "ete": 35,
//         "attendance": 3
//       },
//       {
//         "subjectId": 25,
//         "grade": "C",
//         "ca": 11,
//         "mte": 3,
//         "ete": 15,
//         "attendance": 0
//       },
//       {
//         "subjectId": 24,
//         "grade": "B",
//         "ca": 10,
//         "mte": 5,
//         "ete": 27,
//         "attendance": 5
//       },
//       {
//         "subjectId": 19,
//         "grade": "A",
//         "ca": 18,
//         "mte": 1,
//         "ete": 44,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 14,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "tgpa": 8.12,
//     "marks": [
//       {
//         "subjectId": 7,
//         "grade": "D",
//         "ca": 17,
//         "mte": 1,
//         "ete": 32,
//         "attendance": 5
//       },
//       {
//         "subjectId": 16,
//         "grade": "C",
//         "ca": 1,
//         "mte": 15,
//         "ete": 13,
//         "attendance": 4
//       },
//       {
//         "subjectId": 14,
//         "grade": "D",
//         "ca": 11,
//         "mte": 14,
//         "ete": 12,
//         "attendance": 5
//       },
//       {
//         "subjectId": 6,
//         "grade": "+A",
//         "ca": 6,
//         "mte": 12,
//         "ete": 16,
//         "attendance": 1
//       },
//       {
//         "subjectId": 1,
//         "grade": "A",
//         "ca": 12,
//         "mte": 6,
//         "ete": 36,
//         "attendance": 0
//       },
//       {
//         "subjectId": 17,
//         "grade": "C",
//         "ca": 24,
//         "mte": 11,
//         "ete": 25,
//         "attendance": 2
//       },
//       {
//         "subjectId": 21,
//         "grade": "O",
//         "ca": 10,
//         "mte": 8,
//         "ete": 24,
//         "attendance": 1
//       },
//       {
//         "subjectId": 30,
//         "grade": "D",
//         "ca": 4,
//         "mte": 0,
//         "ete": 26,
//         "attendance": 0
//       }
//     ]
//   },
//   {
//     "id": 15,
//     "registrationNo": 12276829,
//     "semester": 1,
//     "tgpa": 9.03,
//     "marks": [
//       {
//         "subjectId": 10,
//         "grade": "D",
//         "ca": 18,
//         "mte": 8,
//         "ete": 3,
//         "attendance": 0
//       },
//       {
//         "subjectId": 15,
//         "grade": "B",
//         "ca": 22,
//         "mte": 17,
//         "ete": 37,
//         "attendance": 3
//       },
//       {
//         "subjectId": 4,
//         "grade": "B+",
//         "ca": 21,
//         "mte": 7,
//         "ete": 3,
//         "attendance": 0
//       },
//       {
//         "subjectId": 26,
//         "grade": "A",
//         "ca": 21,
//         "mte": 15,
//         "ete": 47,
//         "attendance": 3
//       },
//       {
//         "subjectId": 8,
//         "grade": "C",
//         "ca": 23,
//         "mte": 10,
//         "ete": 22,
//         "attendance": 4
//       },
//       {
//         "subjectId": 25,
//         "grade": "B+",
//         "ca": 12,
//         "mte": 2,
//         "ete": 29,
//         "attendance": 0
//       },
//       {
//         "subjectId": 3,
//         "grade": "B+",
//         "ca": 4,
//         "mte": 5,
//         "ete": 35,
//         "attendance": 3
//       },
//       {
//         "subjectId": 10,
//         "grade": "D",
//         "ca": 8,
//         "mte": 8,
//         "ete": 6,
//         "attendance": 1
//       }
//     ]
//   }, {
//     "id": 16,
//     "registrationNo": 12276829,
//     "semester": 2,
//     "tgpa": 8.51,
//     "marks": [
//       {
//         "subjectId": 30,
//         "grade": "C",
//         "ca": 24,
//         "mte": 0,
//         "ete": 16,
//         "attendance": 3
//       },
//       {
//         "subjectId": 19,
//         "grade": "C",
//         "ca": 0,
//         "mte": 6,
//         "ete": 18,
//         "attendance": 2
//       },
//       {
//         "subjectId": 25,
//         "grade": "D",
//         "ca": 4,
//         "mte": 12,
//         "ete": 1,
//         "attendance": 2
//       },
//       {
//         "subjectId": 14,
//         "grade": "D",
//         "ca": 24,
//         "mte": 9,
//         "ete": 5,
//         "attendance": 0
//       },
//       {
//         "subjectId": 7,
//         "grade": "C",
//         "ca": 0,
//         "mte": 6,
//         "ete": 8,
//         "attendance": 2
//       },
//       {
//         "subjectId": 17,
//         "grade": "B",
//         "ca": 21,
//         "mte": 2,
//         "ete": 25,
//         "attendance": 3
//       },
//       {
//         "subjectId": 5,
//         "grade": "C",
//         "ca": 3,
//         "mte": 13,
//         "ete": 33,
//         "attendance": 2
//       },
//       {
//         "subjectId": 12,
//         "grade": "O",
//         "ca": 3,
//         "mte": 8,
//         "ete": 19,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 17,
//     "registrationNo": 12276829,
//     "semester": 3,
//     "tgpa": 9.05,
//     "marks": [
//       {
//         "subjectId": 2,
//         "grade": "+A",
//         "ca": 25,
//         "mte": 3,
//         "ete": 26,
//         "attendance": 1
//       },
//       {
//         "subjectId": 13,
//         "grade": "D",
//         "ca": 24,
//         "mte": 16,
//         "ete": 12,
//         "attendance": 4
//       },
//       {
//         "subjectId": 25,
//         "grade": "D",
//         "ca": 22,
//         "mte": 18,
//         "ete": 22,
//         "attendance": 5
//       },
//       {
//         "subjectId": 3,
//         "grade": "B+",
//         "ca": 12,
//         "mte": 0,
//         "ete": 6,
//         "attendance": 5
//       },
//       {
//         "subjectId": 21,
//         "grade": "B+",
//         "ca": 22,
//         "mte": 3,
//         "ete": 32,
//         "attendance": 1
//       },
//       {
//         "subjectId": 15,
//         "grade": "C",
//         "ca": 22,
//         "mte": 15,
//         "ete": 38,
//         "attendance": 5
//       },
//       {
//         "subjectId": 17,
//         "grade": "+A",
//         "ca": 15,
//         "mte": 13,
//         "ete": 37,
//         "attendance": 4
//       },
//       {
//         "subjectId": 27,
//         "grade": "C",
//         "ca": 24,
//         "mte": 13,
//         "ete": 2,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 18,
//     "registrationNo": 12276829,
//     "semester": 4,
//     "tgpa": 7.9,
//     "marks": [
//       {
//         "subjectId": 12,
//         "grade": "B+",
//         "ca": 25,
//         "mte": 2,
//         "ete": 24,
//         "attendance": 0
//       },
//       {
//         "subjectId": 15,
//         "grade": "B",
//         "ca": 2,
//         "mte": 4,
//         "ete": 8,
//         "attendance": 0
//       },
//       {
//         "subjectId": 27,
//         "grade": "+A",
//         "ca": 16,
//         "mte": 9,
//         "ete": 42,
//         "attendance": 2
//       },
//       {
//         "subjectId": 17,
//         "grade": "D",
//         "ca": 20,
//         "mte": 1,
//         "ete": 19,
//         "attendance": 0
//       },
//       {
//         "subjectId": 21,
//         "grade": "B",
//         "ca": 21,
//         "mte": 14,
//         "ete": 19,
//         "attendance": 0
//       },
//       {
//         "subjectId": 1,
//         "grade": "C",
//         "ca": 23,
//         "mte": 2,
//         "ete": 37,
//         "attendance": 4
//       },
//       {
//         "subjectId": 17,
//         "grade": "C",
//         "ca": 12,
//         "mte": 5,
//         "ete": 40,
//         "attendance": 1
//       },
//       {
//         "subjectId": 20,
//         "grade": "D",
//         "ca": 15,
//         "mte": 16,
//         "ete": 39,
//         "attendance": 1
//       }
//     ]
//   }, {
//     "id": 19,
//     "registrationNo": 12276829,
//     "semester": 5,
//     "tgpa": 3.61,
//     "marks": [
//       {
//         "subjectId": 28,
//         "grade": "B+",
//         "ca": 2,
//         "mte": 12,
//         "ete": 47,
//         "attendance": 4
//       },
//       {
//         "subjectId": 18,
//         "grade": "D",
//         "ca": 9,
//         "mte": 4,
//         "ete": 29,
//         "attendance": 2
//       },
//       {
//         "subjectId": 12,
//         "grade": "+A",
//         "ca": 22,
//         "mte": 12,
//         "ete": 2,
//         "attendance": 0
//       },
//       {
//         "subjectId": 6,
//         "grade": "B",
//         "ca": 17,
//         "mte": 2,
//         "ete": 17,
//         "attendance": 0
//       },
//       {
//         "subjectId": 1,
//         "grade": "O",
//         "ca": 11,
//         "mte": 1,
//         "ete": 21,
//         "attendance": 2
//       },
//       {
//         "subjectId": 4,
//         "grade": "A",
//         "ca": 16,
//         "mte": 5,
//         "ete": 41,
//         "attendance": 2
//       },
//       {
//         "subjectId": 3,
//         "grade": "A",
//         "ca": 16,
//         "mte": 12,
//         "ete": 11,
//         "attendance": 2
//       },
//       {
//         "subjectId": 27,
//         "grade": "B",
//         "ca": 16,
//         "mte": 20,
//         "ete": 38,
//         "attendance": 1
//       }
//     ]
//   }, {
//     "id": 20,
//     "registrationNo": 12276829,
//     "semester": 6,
//     "tgpa": 2.84,
//     "marks": [
//       {
//         "subjectId": 11,
//         "grade": "C",
//         "ca": 24,
//         "mte": 13,
//         "ete": 33,
//         "attendance": 3
//       },
//       {
//         "subjectId": 6,
//         "grade": "B",
//         "ca": 9,
//         "mte": 13,
//         "ete": 44,
//         "attendance": 3
//       },
//       {
//         "subjectId": 7,
//         "grade": "+A",
//         "ca": 10,
//         "mte": 0,
//         "ete": 11,
//         "attendance": 1
//       },
//       {
//         "subjectId": 20,
//         "grade": "O",
//         "ca": 16,
//         "mte": 1,
//         "ete": 28,
//         "attendance": 0
//       },
//       {
//         "subjectId": 10,
//         "grade": "B+",
//         "ca": 15,
//         "mte": 4,
//         "ete": 40,
//         "attendance": 3
//       },
//       {
//         "subjectId": 9,
//         "grade": "B",
//         "ca": 19,
//         "mte": 6,
//         "ete": 27,
//         "attendance": 0
//       },
//       {
//         "subjectId": 1,
//         "grade": "B",
//         "ca": 11,
//         "mte": 12,
//         "ete": 26,
//         "attendance": 3
//       },
//       {
//         "subjectId": 21,
//         "grade": "B",
//         "ca": 1,
//         "mte": 12,
//         "ete": 11,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 21,
//     "registrationNo": 12276829,
//     "semester": 7,
//     "tgpa": 8.11,
//     "marks": [
//       {
//         "subjectId": 9,
//         "grade": "D",
//         "ca": 10,
//         "mte": 6,
//         "ete": 16,
//         "attendance": 0
//       },
//       {
//         "subjectId": 2,
//         "grade": "+A",
//         "ca": 11,
//         "mte": 2,
//         "ete": 10,
//         "attendance": 3
//       },
//       {
//         "subjectId": 23,
//         "grade": "C",
//         "ca": 20,
//         "mte": 2,
//         "ete": 44,
//         "attendance": 4
//       },
//       {
//         "subjectId": 26,
//         "grade": "B+",
//         "ca": 19,
//         "mte": 4,
//         "ete": 32,
//         "attendance": 4
//       },
//       {
//         "subjectId": 19,
//         "grade": "A",
//         "ca": 8,
//         "mte": 15,
//         "ete": 13,
//         "attendance": 1
//       },
//       {
//         "subjectId": 11,
//         "grade": "O",
//         "ca": 14,
//         "mte": 1,
//         "ete": 0,
//         "attendance": 5
//       },
//       {
//         "subjectId": 8,
//         "grade": "A",
//         "ca": 24,
//         "mte": 17,
//         "ete": 17,
//         "attendance": 0
//       },
//       {
//         "subjectId": 22,
//         "grade": "O",
//         "ca": 22,
//         "mte": 11,
//         "ete": 34,
//         "attendance": 4
//       }
//     ]
//   }, {
//     "id": 22,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "tgpa": 3.74,
//     "marks": [
//       {
//         "subjectId": 20,
//         "grade": "B",
//         "ca": 18,
//         "mte": 2,
//         "ete": 2,
//         "attendance": 5
//       },
//       {
//         "subjectId": 2,
//         "grade": "B+",
//         "ca": 17,
//         "mte": 3,
//         "ete": 25,
//         "attendance": 0
//       },
//       {
//         "subjectId": 9,
//         "grade": "A",
//         "ca": 3,
//         "mte": 4,
//         "ete": 5,
//         "attendance": 1
//       },
//       {
//         "subjectId": 8,
//         "grade": "A",
//         "ca": 25,
//         "mte": 19,
//         "ete": 46,
//         "attendance": 5
//       },
//       {
//         "subjectId": 24,
//         "grade": "B+",
//         "ca": 5,
//         "mte": 20,
//         "ete": 0,
//         "attendance": 3
//       },
//       {
//         "subjectId": 10,
//         "grade": "C",
//         "ca": 15,
//         "mte": 20,
//         "ete": 21,
//         "attendance": 5
//       },
//       {
//         "subjectId": 26,
//         "grade": "B+",
//         "ca": 8,
//         "mte": 18,
//         "ete": 37,
//         "attendance": 3
//       },
//       {
//         "subjectId": 28,
//         "grade": "B+",
//         "ca": 22,
//         "mte": 17,
//         "ete": 19,
//         "attendance": 5
//       }
//     ]
//   },
//   {
//     "id": 23,
//     "registrationNo": 12100734,
//     "semester": 1,
//     "tgpa": 3.84,
//     "marks": [
//       {
//         "subjectId": 23,
//         "grade": "O",
//         "ca": 10,
//         "mte": 2,
//         "ete": 23,
//         "attendance": 2
//       },
//       {
//         "subjectId": 7,
//         "grade": "B+",
//         "ca": 4,
//         "mte": 15,
//         "ete": 12,
//         "attendance": 1
//       },
//       {
//         "subjectId": 20,
//         "grade": "B",
//         "ca": 11,
//         "mte": 10,
//         "ete": 32,
//         "attendance": 2
//       },
//       {
//         "subjectId": 28,
//         "grade": "+A",
//         "ca": 16,
//         "mte": 0,
//         "ete": 14,
//         "attendance": 5
//       },
//       {
//         "subjectId": 19,
//         "grade": "B+",
//         "ca": 7,
//         "mte": 17,
//         "ete": 38,
//         "attendance": 2
//       },
//       {
//         "subjectId": 8,
//         "grade": "B+",
//         "ca": 11,
//         "mte": 2,
//         "ete": 4,
//         "attendance": 3
//       },
//       {
//         "subjectId": 9,
//         "grade": "A",
//         "ca": 18,
//         "mte": 9,
//         "ete": 22,
//         "attendance": 3
//       },
//       {
//         "subjectId": 16,
//         "grade": "B",
//         "ca": 24,
//         "mte": 15,
//         "ete": 14,
//         "attendance": 1
//       }
//     ]
//   }, {
//     "id": 24,
//     "registrationNo": 12100734,
//     "semester": 2,
//     "tgpa": 1.01,
//     "marks": [
//       {
//         "subjectId": 11,
//         "grade": "C",
//         "ca": 15,
//         "mte": 19,
//         "ete": 47,
//         "attendance": 1
//       },
//       {
//         "subjectId": 27,
//         "grade": "+A",
//         "ca": 25,
//         "mte": 2,
//         "ete": 9,
//         "attendance": 1
//       },
//       {
//         "subjectId": 25,
//         "grade": "B",
//         "ca": 3,
//         "mte": 10,
//         "ete": 16,
//         "attendance": 3
//       },
//       {
//         "subjectId": 3,
//         "grade": "C",
//         "ca": 12,
//         "mte": 9,
//         "ete": 48,
//         "attendance": 0
//       },
//       {
//         "subjectId": 14,
//         "grade": "+A",
//         "ca": 20,
//         "mte": 13,
//         "ete": 25,
//         "attendance": 2
//       },
//       {
//         "subjectId": 21,
//         "grade": "C",
//         "ca": 1,
//         "mte": 10,
//         "ete": 13,
//         "attendance": 3
//       },
//       {
//         "subjectId": 8,
//         "grade": "+A",
//         "ca": 17,
//         "mte": 16,
//         "ete": 7,
//         "attendance": 0
//       },
//       {
//         "subjectId": 1,
//         "grade": "B+",
//         "ca": 18,
//         "mte": 13,
//         "ete": 35,
//         "attendance": 3
//       }
//     ]
//   }, {
//     "id": 25,
//     "registrationNo": 12100734,
//     "semester": 3,
//     "tgpa": 7.49,
//     "marks": [
//       {
//         "subjectId": 25,
//         "grade": "+A",
//         "ca": 9,
//         "mte": 0,
//         "ete": 10,
//         "attendance": 5
//       },
//       {
//         "subjectId": 28,
//         "grade": "C",
//         "ca": 21,
//         "mte": 13,
//         "ete": 12,
//         "attendance": 5
//       },
//       {
//         "subjectId": 12,
//         "grade": "B+",
//         "ca": 25,
//         "mte": 15,
//         "ete": 27,
//         "attendance": 5
//       },
//       {
//         "subjectId": 21,
//         "grade": "B+",
//         "ca": 3,
//         "mte": 17,
//         "ete": 10,
//         "attendance": 0
//       },
//       {
//         "subjectId": 11,
//         "grade": "C",
//         "ca": 13,
//         "mte": 1,
//         "ete": 1,
//         "attendance": 4
//       },
//       {
//         "subjectId": 2,
//         "grade": "A",
//         "ca": 17,
//         "mte": 1,
//         "ete": 46,
//         "attendance": 5
//       },
//       {
//         "subjectId": 3,
//         "grade": "B+",
//         "ca": 12,
//         "mte": 11,
//         "ete": 33,
//         "attendance": 4
//       },
//       {
//         "subjectId": 8,
//         "grade": "O",
//         "ca": 11,
//         "mte": 7,
//         "ete": 32,
//         "attendance": 1
//       }
//     ]
//   }, {
//     "id": 26,
//     "registrationNo": 12100734,
//     "semester": 4,
//     "tgpa": 2.19,
//     "marks": [
//       {
//         "subjectId": 16,
//         "grade": "+A",
//         "ca": 14,
//         "mte": 12,
//         "ete": 32,
//         "attendance": 4
//       },
//       {
//         "subjectId": 26,
//         "grade": "B+",
//         "ca": 6,
//         "mte": 3,
//         "ete": 20,
//         "attendance": 5
//       },
//       {
//         "subjectId": 30,
//         "grade": "C",
//         "ca": 4,
//         "mte": 19,
//         "ete": 2,
//         "attendance": 3
//       },
//       {
//         "subjectId": 9,
//         "grade": "B",
//         "ca": 9,
//         "mte": 16,
//         "ete": 37,
//         "attendance": 1
//       },
//       {
//         "subjectId": 13,
//         "grade": "D",
//         "ca": 12,
//         "mte": 16,
//         "ete": 44,
//         "attendance": 0
//       },
//       {
//         "subjectId": 3,
//         "grade": "C",
//         "ca": 25,
//         "mte": 3,
//         "ete": 26,
//         "attendance": 0
//       },
//       {
//         "subjectId": 22,
//         "grade": "+A",
//         "ca": 24,
//         "mte": 0,
//         "ete": 33,
//         "attendance": 1
//       },
//       {
//         "subjectId": 29,
//         "grade": "B+",
//         "ca": 13,
//         "mte": 3,
//         "ete": 27,
//         "attendance": 5
//       }
//     ]
//   }, {
//     "id": 27,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "tgpa": 6.71,
//     "marks": [
//       {
//         "subjectId": 1,
//         "grade": "C",
//         "ca": 0,
//         "mte": 9,
//         "ete": 21,
//         "attendance": 2
//       },
//       {
//         "subjectId": 10,
//         "grade": "A",
//         "ca": 20,
//         "mte": 15,
//         "ete": 47,
//         "attendance": 2
//       },
//       {
//         "subjectId": 7,
//         "grade": "C",
//         "ca": 24,
//         "mte": 10,
//         "ete": 14,
//         "attendance": 3
//       },
//       {
//         "subjectId": 11,
//         "grade": "O",
//         "ca": 22,
//         "mte": 13,
//         "ete": 44,
//         "attendance": 2
//       },
//       {
//         "subjectId": 25,
//         "grade": "O",
//         "ca": 25,
//         "mte": 19,
//         "ete": 45,
//         "attendance": 3
//       },
//       {
//         "subjectId": 18,
//         "grade": "C",
//         "ca": 2,
//         "mte": 16,
//         "ete": 7,
//         "attendance": 1
//       },
//       {
//         "subjectId": 9,
//         "grade": "D",
//         "ca": 11,
//         "mte": 15,
//         "ete": 39,
//         "attendance": 5
//       },
//       {
//         "subjectId": 12,
//         "grade": "O",
//         "ca": 2,
//         "mte": 17,
//         "ete": 29,
//         "attendance": 4
//       }
//     ]
//   }
// ]);

// await Attendance.bulkCreate([
//   // {
//   //   "id": 1,
//   //   "registrationNo": 12100435,
//   //   "subjectId": 22,
//   //   "hourSlot": 6,
//   //   "attendanceStatus": "A",
//   //   "date": "2023-01-26 19:20:30"
//   // }, {
//   //   "id": 2,
//   //   "registrationNo": 12100435,
//   //   "subjectId": 12,
//   //   "hourSlot": 7,
//   //   "attendanceStatus": "A",
//   //   "date": "2022-04-19 23:11:21"
//   // }, {
//   //   "id": 3,
//   //   "registrationNo": 12100435,
//   //   "subjectId": 15,
//   //   "hourSlot": 5,
//   //   "attendanceStatus": "A",
//   //   "date": "2022-06-14 20:45:31"
//   // }, {
//   //   "id": 4,
//   //   "registrationNo": 12100435,
//   //   "subjectId": 20,
//   //   "hourSlot": 3,
//   //   "attendanceStatus": "P",
//   //   "date": "2022-08-02 12:54:20"
//   // }, {
//   //   "id": 5,
//   //   "registrationNo": 12100435,
//   //   "subjectId": 13,
//   //   "hourSlot": 1,
//   //   "attendanceStatus": "P",
//   //   "date": "2022-05-26 04:41:56"
//   // }, {
//   //   "id": 6,
//   //   "registrationNo": 12100734,
//   //   "subjectId": 7,
//   //   "hourSlot": 4,
//   //   "attendanceStatus": "P",
//   //   "date": "2022-09-28 16:14:51"
//   // }, {
//   //   "id": 7,
//   //   "registrationNo": 12100734,
//   //   "subjectId": 5,
//   //   "hourSlot": 5,
//   //   "attendanceStatus": "N",
//   //   "date": "2023-02-21 00:18:38"
//   // }, {
//   //   "id": 8,
//   //   "registrationNo": 12100734,
//   //   "subjectId": 14,
//   //   "hourSlot": 9,
//   //   "attendanceStatus": "P",
//   //   "date": "2022-06-03 06:29:51"
//   // }, {
//   //   "id": 9,
//   //   "registrationNo": 12100734,
//   //   "subjectId": 18,
//   //   "hourSlot": 2,
//   //   "attendanceStatus": "P",
//   //   "date": "2022-12-02 13:04:45"
//   // }, {
//   //   "id": 10,
//   //   "registrationNo": 12100734,
//   //   "subjectId": 10,
//   //   "hourSlot": 10,
//   //   "attendanceStatus": "P",
//   //   "date": "2022-07-22 17:09:20"
//   // }, {
//   //   "id": 11,
//   //   "registrationNo": 12100734,
//   //   "subjectId": 24,
//   //   "hourSlot": 3,
//   //   "attendanceStatus": "A",
//   //   "date": "2023-03-10 15:52:33"
//   // },
//   {
//     "id": 12,
//     "registrationNo": 11937798,
//     "subjectId": 20,
//     "hourSlot": 3,
//     "attendanceStatus": "N",
//     "date": "2022-08-27 07:13:27"
//   }, {
//     "id": 13,
//     "registrationNo": 11937798,
//     "subjectId": 20,
//     "hourSlot": 4,
//     "attendanceStatus": "A",
//     "date": "2023-03-16 03:21:49"
//   }, {
//     "id": 14,
//     "registrationNo": 11937798,
//     "subjectId": 18,
//     "hourSlot": 8,
//     "attendanceStatus": "P",
//     "date": "2023-02-21 12:06:36"
//   }, {
//     "id": 15,
//     "registrationNo": 11937798,
//     "subjectId": 5,
//     "hourSlot": 7,
//     "attendanceStatus": "N",
//     "date": "2022-11-16 13:57:33"
//   }, {
//     "id": 16,
//     "registrationNo": 12142622,
//     "subjectId": 28,
//     "hourSlot": 10,
//     "attendanceStatus": "A",
//     "date": "2022-12-18 10:33:24"
//   }, {
//     "id": 17,
//     "registrationNo": 12142622,
//     "subjectId": 24,
//     "hourSlot": 2,
//     "attendanceStatus": "A",
//     "date": "2022-06-23 10:31:38"
//   }, {
//     "id": 18,
//     "registrationNo": 12142622,
//     "subjectId": 18,
//     "hourSlot": 6,
//     "attendanceStatus": "P",
//     "date": "2022-06-26 13:20:22"
//   }, {
//     "id": 19,
//     "registrationNo": 12142622,
//     "subjectId": 27,
//     "hourSlot": 5,
//     "attendanceStatus": "P",
//     "date": "2022-04-26 18:59:50"
//   }, {
//     "id": 20,
//     "registrationNo": 12142622,
//     "subjectId": 20,
//     "hourSlot": 4,
//     "attendanceStatus": "P",
//     "date": "2022-11-26 11:19:24"
//   }, {
//     "id": 21,
//     "registrationNo": 12142622,
//     "subjectId": 4,
//     "hourSlot": 9,
//     "attendanceStatus": "N",
//     "date": "2022-10-08 22:03:05"
//   }, {
//     "id": 22,
//     "registrationNo": 12276829,
//     "subjectId": 25,
//     "hourSlot": 9,
//     "attendanceStatus": "A",
//     "date": "2022-05-22 21:22:54"
//   }, {
//     "id": 23,
//     "registrationNo": 12276829,
//     "subjectId": 1,
//     "hourSlot": 3,
//     "attendanceStatus": "A",
//     "date": "2023-02-15 20:34:11"
//   }, {
//     "id": 24,
//     "registrationNo": 12276829,
//     "subjectId": 6,
//     "hourSlot": 4,
//     "attendanceStatus": "A",
//     "date": "2022-11-17 06:02:59"
//   }, {
//     "id": 25,
//     "registrationNo": 12276829,
//     "subjectId": 25,
//     "hourSlot": 5,
//     "attendanceStatus": "N",
//     "date": "2022-08-19 13:08:18"
//   }, {
//     "id": 26,
//     "registrationNo": 12276829,
//     "subjectId": 18,
//     "hourSlot": 6,
//     "attendanceStatus": "A",
//     "date": "2022-10-10 23:49:11"
//   }, {
//     "id": 27,
//     "registrationNo": 12276829,
//     "subjectId": 23,
//     "hourSlot": 3,
//     "attendanceStatus": "A",
//     "date": "2022-08-02 02:17:40"
//   }, {
//     "id": 28,
//     "registrationNo": 12276829,
//     "subjectId": 17,
//     "hourSlot": 7,
//     "attendanceStatus": "P",
//     "date": "2023-01-02 05:10:36"
//   }
// ]);

// await HourSlot.bulkCreate([
//   {
//     id: 1,
//     slot: '7 - 8 a.m.'
//   },
//   {
//     id: 2,
//     slot: '8 - 9 a.m.'
//   },
//   {
//     id: 3,
//     slot: '9 - 10 a.m.'
//   },
//   {
//     id: 4,
//     slot: '10 - 11 a.m.'
//   },
//   {
//     id: 5,
//     slot: '11 a.m. - 12 p.m.'
//   },
//   {
//     id: 6,
//     slot: '12 - 1 p.m.'
//   },
//     {
//     id: 7,
//     slot: '1 - 2 p.m.'
//   },  {
//     id: 8,
//     slot: '2 - 3 p.m.'
//   },
//   {
//     id: 9,
//     slot: '3 - 4 p.m.'
//   },
//     {
//     id: 10,
//     slot: '4 - 5 p.m.'
//   },
// ]);

// await OverallAttendance.bulkCreate([
//   {
//     "id": 1,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 6,
//     "attendance": 25
//   }, {
//     "id": 2,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 7,
//     "attendance": 82
//   }, {
//     "id": 3,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 12,
//     "attendance": 94
//   }, {
//     "id": 4,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 4,
//     "attendance": 13
//   }, {
//     "id": 5,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 1,
//     "attendance": 32
//   }, {
//     "id": 6,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 18,
//     "attendance": 36
//   }, {
//     "id": 7,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 19,
//     "attendance": 45
//   }, {
//     "id": 8,
//     "registrationNo": 12100435,
//     "semester": 3,
//     "subjectId": 15,
//     "attendance": 68
//   }, {
//     "id": 9,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 18,
//     "attendance": 40
//   }, {
//     "id": 10,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 6,
//     "attendance": 84
//   }, {
//     "id": 11,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 6,
//     "attendance": 33
//   }, {
//     "id": 12,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 15,
//     "attendance": 48
//   }, {
//     "id": 13,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 9,
//     "attendance": 3
//   }, {
//     "id": 14,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 14,
//     "attendance": 78
//   }, {
//     "id": 15,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 7,
//     "attendance": 6
//   }, {
//     "id": 16,
//     "registrationNo": 11937798,
//     "semester": 7,
//     "subjectId": 16,
//     "attendance": 69
//   }, {
//     "id": 17,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 13,
//     "attendance": 81
//   }, {
//     "id": 18,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 11,
//     "attendance": 8
//   }, {
//     "id": 19,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 30,
//     "attendance": 8
//   }, {
//     "id": 20,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 27,
//     "attendance": 49
//   }, {
//     "id": 21,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 26,
//     "attendance": 36
//   }, {
//     "id": 22,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 24,
//     "attendance": 44
//   }, {
//     "id": 23,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 21,
//     "attendance": 43
//   }, {
//     "id": 24,
//     "registrationNo": 12100734,
//     "semester": 5,
//     "subjectId": 20,
//     "attendance": 74
//   }, {
//     "id": 25,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 1,
//     "attendance": 26
//   }, {
//     "id": 26,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 28,
//     "attendance": 8
//   }, {
//     "id": 27,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 11,
//     "attendance": 17
//   }, {
//     "id": 28,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 8,
//     "attendance": 62
//   }, {
//     "id": 29,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 26,
//     "attendance": 37
//   }, {
//     "id": 30,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 4,
//     "attendance": 73
//   }, {
//     "id": 31,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 10,
//     "attendance": 20
//   }, {
//     "id": 32,
//     "registrationNo": 12142622,
//     "semester": 4,
//     "subjectId": 24,
//     "attendance": 72
//   }, {
//     "id": 33,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 19,
//     "attendance": 80
//   }, {
//     "id": 34,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 9,
//     "attendance": 76
//   }, {
//     "id": 35,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 14,
//     "attendance": 55
//   }, {
//     "id": 36,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 15,
//     "attendance": 15
//   }, {
//     "id": 37,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 5,
//     "attendance": 76
//   }, {
//     "id": 38,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 18,
//     "attendance": 39
//   }, {
//     "id": 39,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 12,
//     "attendance": 84
//   }, {
//     "id": 40,
//     "registrationNo": 12276829,
//     "semester": 8,
//     "subjectId": 14,
//     "attendance": 18
//   }
// ]);

// await Student.bulkCreate([
//   {
//     "id": 1,
//     "registrationNo": "12100435",
//     "rollNo": 72,
//     "section": "K21VL",
//     "firstName": "Suyash",
//     "middleName": null,
//     "lastName": "Purwar",
//     "session": "2021 - 2025",
//     "contact": "+57 411 558 4582",
//     "courseId": 2,
//     "mentorId": 4,
//     "hostelId": 11,
//     "fatherName": "Sandeep Gupta",
//     "fatherContact": "+917009772298",
//     "motherName": "Sangeeta Gupta",
//     "motherContact": "+52 946 760 2546"
//   }, {
//     "id": 2,
//     "registrationNo": "11937798",
//     "rollNo": 10,
//     "section": "K21UQ",
//     "firstName": "Beatrix",
//     "middleName": "Padden",
//     "lastName": "Aronovich",
//     "session": "2019 - 2023",
//     "contact": "+234 866 778 6772",
//     "courseId": 4,
//     "mentorId": 2,
//     "hostelId": 1,
//     "fatherName": "Putin Aronovich",
//     "fatherContact": "+86 226 130 6916",
//     "motherName": "Christi Aronovich",
//     "motherContact": "+358 568 488 2787"
//   }, {
//     "id": 3,
//     "registrationNo": "1200734",
//     "rollNo": 53,
//     "section": "K21WR",
//     "firstName": "Nikhil",
//     "middleName": "Satyam",
//     "lastName": "Modi",
//     "session": "2021 - 2025",
//     "contact": "+33 421 380 3850",
//     "courseId": 3,
//     "mentorId": 13,
//     "hostelId": 9,
//     "fatherName": "Nikita Raisbeck",
//     "fatherContact": "+919123248814",
//     "motherName": "Lucius Raisbeck",
//     "motherContact": "+370 139 277 5068"
//   }, {
//     "id": 4,
//     "registrationNo": "12142622",
//     "rollNo": 26,
//     "section": "K21JT",
//     "firstName": "Blair",
//     "middleName": "Fellowes",
//     "lastName": "Moncey",
//     "session": "2022 - 2026",
//     "contact": "+47 661 731 2775",
//     "courseId": 4,
//     "mentorId": 8,
//     "hostelId": 7,
//     "fatherName": "Sam Moncey",
//     "fatherContact": "+62 853 533 3140",
//     "motherName": "Monica Moncey",
//     "motherContact": "+509 865 279 7725"
//   }, {
//     "id": 5,
//     "registrationNo": "12276829",
//     "rollNo": 23,
//     "section": "K21EC",
//     "firstName": "Clari",
//     "middleName": "Yanov",
//     "lastName": "Rosander",
//     "session": "2020 - 2024",
//     "contact": "+381 438 835 9031",
//     "courseId": 1,
//     "mentorId": 8,
//     "hostelId": 10,
//     "fatherName": "Tony Rosander",
//     "fatherContact": "+86 577 651 7616",
//     "motherName": "Rosalina Rosander",
//     "motherContact": "+86 587 181 9631"
//   }
// ]);

// await Warden.bulkCreate([
//   {
//     "id": 1,
//     "name": "Karlyn Cutteridge",
//     "hostelId": 1,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+7 122 487 8058"
//   }, {
//     "id": 2,
//     "name": "Stephie Comazzo",
//     "hostelId": 1,
//     "block": "B",
//     "isMainWarden": true,
//     "contact": "+998 277 756 1746"
//   }, {
//     "id": 3,
//     "name": "Dane Jailler",
//     "hostelId": 1,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+47 476 659 7543"
//   }, {
//     "id": 4,
//     "name": "Netty Beaten",
//     "hostelId": 1,
//     "block": "E",
//     "isMainWarden": false,
//     "contact": "+86 431 212 5475"
//   }, {
//     "id": 5,
//     "name": "Ollie Lehrahan",
//     "hostelId": 2,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+81 779 752 8838"
//   }, {
//     "id": 6,
//     "name": "Nev Eamer",
//     "hostelId": 2,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+57 982 428 2168"
//   }, {
//     "id": 7,
//     "name": "Jordon Tavener",
//     "hostelId": 2,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+850 116 374 4772"
//   }, {
//     "id": 8,
//     "name": "Humfrey Hall-Gough",
//     "hostelId": 2,
//     "block": "D",
//     "isMainWarden": false,
//     "contact": "+53 413 796 8748"
//   }, {
//     "id": 9,
//     "name": "Mill Yegorkin",
//     "hostelId": 2,
//     "block": "E",
//     "isMainWarden": true,
//     "contact": "+62 541 152 3556"
//   }, {
//     "id": 10,
//     "name": "Jens Pringuer",
//     "hostelId": 3,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+420 396 439 2089"
//   }, {
//     "id": 11,
//     "name": "Fania Pulbrook",
//     "hostelId": 3,
//     "block": "B",
//     "isMainWarden": true,
//     "contact": "+86 127 589 3024"
//   }, {
//     "id": 12,
//     "name": "Judith Deverson",
//     "hostelId": 3,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+86 230 676 0565"
//   }, {
//     "id": 13,
//     "name": "Reeba Wonter",
//     "hostelId": 3,
//     "block": "D",
//     "isMainWarden": false,
//     "contact": "+967 633 298 2014"
//   }, {
//     "id": 14,
//     "name": "Aleksandr Murrum",
//     "hostelId": 4,
//     "block": "A",
//     "isMainWarden": true,
//     "contact": "+86 299 500 3461"
//   }, {
//     "id": 15,
//     "name": "Suzette Griffith",
//     "hostelId": 4,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+7 890 353 3412"
//   }, {
//     "id": 16,
//     "name": "Magdalena Sineath",
//     "hostelId": 4,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+86 147 638 1205"
//   }, {
//     "id": 17,
//     "name": "Karry Smithers",
//     "hostelId": 4,
//     "block": "D",
//     "isMainWarden": false,
//     "contact": "+249 656 243 6597"
//   }, {
//     "id": 18,
//     "name": "Carlita Barsby",
//     "hostelId": 5,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+383 171 769 8977"
//   }, {
//     "id": 19,
//     "name": "Tracie Clemo",
//     "hostelId": 5,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+221 391 143 2073"
//   }, {
//     "id": 20,
//     "name": "Ariella Tweedlie",
//     "hostelId": 5,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+62 326 531 2105"
//   }, {
//     "id": 21,
//     "name": "Anette Sandey",
//     "hostelId": 5,
//     "block": "D",
//     "isMainWarden": true,
//     "contact": "+48 142 318 9358"
//   }, {
//     "id": 22,
//     "name": "Catherine Raitie",
//     "hostelId": 6,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+55 523 569 5431"
//   }, {
//     "id": 23,
//     "name": "Tadio Sutherley",
//     "hostelId": 6,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+63 253 343 4484"
//   }, {
//     "id": 24,
//     "name": "Francesca Lghan",
//     "hostelId": 6,
//     "block": "C",
//     "isMainWarden": true,
//     "contact": "+55 978 333 4972"
//   }, {
//     "id": 25,
//     "name": "Griffith Ivashechkin",
//     "hostelId": 6,
//     "block": "D",
//     "isMainWarden": false,
//     "contact": "+420 785 938 8409"
//   }, {
//     "id": 26,
//     "name": "Orelie Letten",
//     "hostelId": 7,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+976 220 711 0144"
//   }, {
//     "id": 27,
//     "name": "Adi Mosedale",
//     "hostelId": 7,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+261 233 799 3350"
//   }, {
//     "id": 28,
//     "name": "Yankee Dewes",
//     "hostelId": 7,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+420 114 478 3665"
//   }, {
//     "id": 29,
//     "name": "Joceline Bullivent",
//     "hostelId": 7,
//     "block": "D",
//     "isMainWarden": true,
//     "contact": "+966 765 356 6425"
//   }, {
//     "id": 30,
//     "name": "Rhianna Salvin",
//     "hostelId": 7,
//     "block": "E",
//     "isMainWarden": false,
//     "contact": "+504 382 705 6119"
//   }, {
//     "id": 31,
//     "name": "Rockwell Gregg",
//     "hostelId": 8,
//     "block": "A",
//     "isMainWarden": true,
//     "contact": "+86 367 806 0321"
//   }, {
//     "id": 32,
//     "name": "Marianna Forrestor",
//     "hostelId": 8,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+62 687 979 0786"
//   }, {
//     "id": 33,
//     "name": "Bellina McCullagh",
//     "hostelId": 8,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+7 553 587 1831"
//   }, {
//     "id": 34,
//     "name": "Jennie Bebbington",
//     "hostelId": 9,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+48 526 786 7819"
//   }, {
//     "id": 35,
//     "name": "Dag Russilll",
//     "hostelId": 9,
//     "block": "B",
//     "isMainWarden": true,
//     "contact": "+234 105 192 9406"
//   }, {
//     "id": 36,
//     "name": "Fiann Sarton",
//     "hostelId": 9,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+48 177 587 3068"
//   }, {
//     "id": 37,
//     "name": "Jacquie Hellmer",
//     "hostelId": 9,
//     "block": "D",
//     "isMainWarden": false,
//     "contact": "+86 943 184 5778"
//   }, {
//     "id": 38,
//     "name": "Issie Jelphs",
//     "hostelId": 10,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+420 809 939 6741"
//   }, {
//     "id": 39,
//     "name": "Augie Licciardello",
//     "hostelId": 10,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+966 709 366 6171"
//   }, {
//     "id": 40,
//     "name": "Ogden Massinger",
//     "hostelId": 10,
//     "block": "C",
//     "isMainWarden": true,
//     "contact": "+381 892 763 2720"
//   }, {
//     "id": 41,
//     "name": "Filbert Scurlock",
//     "hostelId": 10,
//     "block": "D",
//     "isMainWarden": false,
//     "contact": "+86 290 950 0657"
//   }, {
//     "id": 42,
//     "name": "Zelig Varney",
//     "hostelId": 11,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+86 105 581 3010"
//   }, {
//     "id": 43,
//     "name": "Geoff Treacher",
//     "hostelId": 11,
//     "block": "B",
//     "isMainWarden": false,
//     "contact": "+420 415 156 0503"
//   }, {
//     "id": 44,
//     "name": "Kiel Wainer",
//     "hostelId": 11,
//     "block": "C",
//     "isMainWarden": true,
//     "contact": "+212 822 780 3330"
//   }, {
//     "id": 45,
//     "name": "Ryley Crittal",
//     "hostelId": 12,
//     "block": "A",
//     "isMainWarden": false,
//     "contact": "+371 673 710 6663"
//   }, {
//     "id": 46,
//     "name": "Kahlil Benettini",
//     "hostelId": 12,
//     "block": "B",
//     "isMainWarden": true,
//     "contact": "+381 227 134 2753"
//   }, {
//     "id": 47,
//     "name": "Rhodia Joney",
//     "hostelId": 12,
//     "block": "C",
//     "isMainWarden": false,
//     "contact": "+86 163 707 1987"
//   }
// ]);

// await Course.bulkCreate([
//   {
//     id: 1,
//     courseCode: 'P132 :: Bachelor of Technology (Computer Science and Engineering)'
//   },
//   {
//     id: 2,
//     courseCode: 'P153 :: Bachelor of Architecture'
//   },
//   {
//     id: 3,
//     courseCode: 'P281 :: Bachelor of Technology (Biotech Engineering)'
//   },
//   {
//     id: 4,
//     courseCode: 'P134 :: Masters in Business Administration (Finanace)'
//   }
// ]);

// await Department.bulkCreate([
//   {
//     id: 1,
//     name: "Department of Fees",
//     block: 34,
//     contact: "+233 860 784 8919",
//     description: "Integer tincidunt ante vel ipsum."
//   }, {
//     id: 2,
//     name: "Department of Counselling and Mental Wellbeing",
//     block: 25,
//     contact: "+351 606 838 9568",
//     description: "Praesent lectus."
//   }, {
//     id: 3,
//     name: "Department of Career Training Services",
//     block: 23,
//     contact: "+55 794 299 1643",
//     description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
//   }, {
//     id: 4,
//     name: "Department of Services",
//     block: 65,
//     contact: "+1 702 479 9401",
//     description: "Ut at dolor quis odio consequat varius."
//   }, {
//     id: 5,
//     name: "Department of Sales",
//     block: 12,
//     contact: "+48 418 441 9980",
//     description: "Nulla suscipit ligula in lacus."
//   }, {
//     id: 6,
//     name: "Department of Human Resources",
//     block: 20,
//     contact: "+351 384 917 1330",
//     description: "Duis at velit eu est congue elementum."
//   }, {
//     id: 7,
//     name: "Department of Residential Services",
//     block: 14,
//     contact: "+86 506 231 8438",
//     description: "Donec semper sapien a libero."
//   }, {
//     id: 8,
//     name: "Department of Research and Development",
//     block: 19,
//     contact: "+62 107 142 5727",
//     description: "In sagittis dui vel nisl."
//   }, {
//     id: 9,
//     name: "Department of Engineering",
//     block: 50,
//     contact: "+7 639 237 3311",
//     description: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa."
//   }, {
//     id: 10,
//     name: "Department of Examination",
//     block: 42,
//     contact: "+265 150 611 5140",
//     description: "Suspendisse potenti."
//   }
// ]);

// await Mentor.bulkCreate([
//   {
//     id: 1,
//     firstName: "Delbert",
//     middleName: "Breznovic",
//     lastName: "Kobsch",
//     contact: "792-491-9491",
//     registrationNo: 80764
//   }, {
//     id: 2,
//     firstName: "Sallee",
//     middleName: "Yashunin",
//     lastName: "Woodruff",
//     contact: "356-652-9079",
//     registrationNo: 31707
//   }, {
//     id: 3,
//     firstName: "Yance",
//     middleName: null,
//     lastName: "Mougeot",
//     contact: "308-292-4103",
//     registrationNo: 21518
//   }, {
//     id: 4,
//     firstName: "Ferdinanda",
//     middleName: null,
//     lastName: "McGarahan",
//     contact: "222-552-2043",
//     registrationNo: 65740
//   }, {
//     id: 5,
//     firstName: "Barnie",
//     middleName: null,
//     lastName: "Boick",
//     contact: "688-113-7154",
//     registrationNo: 91150
//   }, {
//     id: 6,
//     firstName: "Madeleine",
//     middleName: null,
//     lastName: "Batrick",
//     contact: "552-865-3041",
//     registrationNo: 55186
//   }, {
//     id: 7,
//     firstName: "Arielle",
//     middleName: "Infante",
//     lastName: "Follit",
//     contact: "904-420-8523",
//     registrationNo: 70315
//   }, {
//     id: 8,
//     firstName: "Alanna",
//     middleName: "Edworthie",
//     lastName: "McGilvray",
//     contact: "314-348-9437",
//     registrationNo: 50630
//   }, {
//     id: 9,
//     firstName: "Ulric",
//     middleName: null,
//     lastName: "Moubray",
//     contact: "615-389-5671",
//     registrationNo: 83733
//   }, {
//     id: 10,
//     firstName: "Derrek",
//     middleName: null,
//     lastName: "Figura",
//     contact: "601-685-5530",
//     registrationNo: 70214
//   }, {
//     id: 11,
//     firstName: "Boonie",
//     middleName: "Bugg",
//     lastName: "Slessor",
//     contact: "240-729-8698",
//     registrationNo: 92598
//   }, {
//     id: 12,
//     firstName: "Anna",
//     middleName: null,
//     lastName: "Vinton",
//     contact: "954-410-8596",
//     registrationNo: 79002
//   }, {
//     id: 13,
//     firstName: "Mable",
//     middleName: null,
//     lastName: "Twizell",
//     contact: "156-642-6478",
//     registrationNo: 71392
//   }, {
//     id: 14,
//     firstName: "Hedvige",
//     middleName: null,
//     lastName: "Rosser",
//     contact: "159-112-3279",
//     registrationNo: 70683
//   }, {
//     id: 15,
//     firstName: "Vitoria",
//     middleName: null,
//     lastName: "Brandt",
//     contact: "230-216-8807",
//     registrationNo: 85235
//   }, {
//     id: 16,
//     firstName: "Jorgan",
//     middleName: null,
//     lastName: "Gooden",
//     contact: "291-269-6740",
//     registrationNo: 28355
//   }, {
//     id: 17,
//     firstName: "Maybelle",
//     middleName: "Forward",
//     lastName: "Dunkerly",
//     contact: "364-582-2744",
//     registrationNo: 84064
//   }, {
//     id: 18,
//     firstName: "Lilli",
//     middleName: null,
//     lastName: "Inseal",
//     contact: "690-273-6065",
//     registrationNo: 35662
//   }
// ]);

// await Subject.bulkCreate([
//   {
//     id: 1,
//     subjectCode: "ECE131 :: BASIC ELECTRICAL AND ELECTRONICS ENGINEERING",
//     credit: '3'
//   }, {
//     id: 2,
//     subjectCode: "PHY119 :: ENGINEERING PHYSICS LABORATORY",
//     credit: '1'
//   }, {
//     id: 3,
//     subjectCode: "PHY109 :: ENGINEERING PHYSICS",
//     credit: '3'
//   }, {
//     id: 4,
//     subjectCode: "CSE101 :: INTRODUCTION TO PROGRAMMING IN C",
//     credit: '4'
//   },
//   {
//     id: 5,
//     subjectCode: "CSE316 :: OPERTATING SYSTEMS",
//     credit: '3'
//   }, {
//     id: 6,
//     subjectCode: "CSE408 :: DESIGN AND ANALYSIS OF ALGORITHM",
//     credit: '4'
//   }, {
//     id: 7,
//     subjectCode: "INT404 :: ARTIFICIAL INTELLIGENCE",
//     credit: '3'
//   }, {
//     id: 8,
//     subjectCode: "ACC501 :: ACCOUNTING FOR MANAGERS",
//     credit: '2'
//   },
//   {
//     id: 9,
//     subjectCode: "CIV473 :: CONSTRUCTION PROJECT MANAGEMENT",
//     credit: '2'
//   }, {
//     id: 10,
//     subjectCode: "CSE329 :: PRELUDE TO COMPETITIVE CODING",
//     credit: '3'
//   }, {
//     id: 11,
//     subjectCode: "CSE326 :: INTERNET PROGRAMMING LABORATORY",
//     credit: '1'
//   }, {
//     id: 12,
//     subjectCode: "CSE101 :: INTRODUCTION TO PROGRAMMING IN C",
//     credit: '4'
//   },
//   {
//     id: 13,
//     subjectCode: "CSE423 :: VIRTUALIZTION AND CLOUD COMPUTING",
//     credit: '4'
//   }, {
//     id: 14,
//     subjectCode: "ECE310 :: FUNDAMENTALS OF MICROPROCESSORS AND MICROCONTROLLERS",
//     credit: '4'
//   }, {
//     id: 15,
//     subjectCode: "ENT132 :: FUNDAMENTALS OF ENTOMOLOGY",
//     credit: '2'
//   }, {
//     id: 16,
//     subjectCode: "FIN501 :: FINANCIAL MANAGEMENT",
//     credit: '1'
//   },
//   {
//     id: 17,
//     subjectCode: "GPB201 :: FUNDAMENTALS OF PLANT BREEDING",
//     credit: '3'
//   }, {
//     id: 18,
//     subjectCode: "HRT142 :: FUNDAMENTALS OF HORTICULTURE",
//     credit: '4'
//   }, {
//     id: 19,
//     subjectCode: "INT331 :: FUNDAMENTALS OF DEVOPS",
//     credit: '2'
//   }, {
//     id: 20,
//     subjectCode: "MEC113 :: ENGINEERING DRAWING AND GRAPHICS",
//     credit: '1'
//   }, {
  //   id: 21,
  //   subjectCode: 'ECE303 :: DIGITAL SIGNAL PROCESSING',
  //   credit: '3'
  // },
  // {
  //   id: 22,
  //   subjectCode: 'ECE416 :: INDUSTRIAL AUTOMATION',
  //   credit: '2'
  // },
  // {
  //   id: 23,
  //   subjectCode: 'ENT323 :: MANAGEMENT OF BENEFICIAL INSECTS',
  //   credit: '3'
  // },
  // {
  //   id: 24,
  //   subjectCode: 'INT247 :: MACHINE LEARNING FOUNDATION',
  //   credit: '4'
  // }, {
  //   id: 25,
  //   subjectCode: 'INT306 :: DATABASE MANAGEMENT SYSTEM',
  //   credit: '4'
  // }, {
  //   id: 26,
  //   subjectCode: 'INT417 :: MACHINE LEARNING ALGORITHMS',
  //   credit: '3'
  // }, {
  //   id: 27,
  //   subjectCode: 'CSE304 :: COMPUTER GRAPHICS AND VISUALIZATION',
  //   credit: '4'
  // }, {
  //   id: 28,
  //   subjectCode: 'CSE202 :: OBJECT ORIENTED PROGRAMMING',
  //   credit: '3'
  // }, {
  //   id: 29,
  //   subjectCode: 'AGR313 :: PRINCIPLES OF ORGANIC FARMING',
  //   credit: '2'
  // }, {
  //   id: 30,
  //   subjectCode: 'AGE207 :: LIVESTOCK AND POULTRY MANAGEMENT',
  //   credit: '1'
  // }
// ]);

// await Hostel.bulkCreate([
//   {
//     id: 1,
//     name: 'BH1',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 2,
//     name: 'BH2',
//     blocks: ['A', 'B', 'C', 'D', 'E']
//   },
//   {
//     id: 3,
//     name: 'BH3',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 4,
//     name: 'BH4',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 5,
//     name: 'BH5',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 6,
//     name: 'BH6',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 7,
//     name: 'BH1',
//     blocks: ['A', 'B', 'C', 'D', 'E']
//   },
//   {
//     id: 8,
//     name: 'BH8',
//     blocks: ['A', 'B', 'C']
//   },
//   {
//     id: 9,
//     name: 'GH1',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 10,
//     name: 'GH2',
//     blocks: ['A', 'B', 'C', 'D']
//   },
//   {
//     id: 11,
//     name: 'GH3',
//     blocks: ['A', 'B', 'C']
//   },
//   {
//     id: 12,
//     name: 'GH4',
//     blocks: ['A', 'B', 'C']
//   },
// ]);

