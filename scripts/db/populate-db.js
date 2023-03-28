import Hostel from "../../models/hostel.model.js";
import Subject from "../../models/subject.model.js";
import Mentor from '../../models/mentor.model.js';
import Department from '../../models/department.model.js';
import Course from '../../models/course.model.js';

await Course.bulkCreate([
  {
    id: 1,
    courseCode: 'P132 :: Bachelor of Technology (Computer Science and Engineering)'
  },
  {
    id: 2,
    courseCode: 'P153 :: Bachelor of Architecture'
  },
  {
    id: 3,
    courseCode: 'P281 :: Bachelor of Technology (Biotech Engineering)'
  },
  {
    id: 4,
    courseCode: 'P134 :: Masters in Business Administration (Finanace)'
  }
]);

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
//   },
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

