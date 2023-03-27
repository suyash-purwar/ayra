import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Result = sequelize.define('result', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  registratioNo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tgpa: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  // Add custom validator
  /**
   * Sample
   * marks: [
   *  {
   *    subjectCode: 'CSE211 ::  Computer Architecure & Organization',
   *    grade: 'A+',
   *    values: {
   *      ca: 22,
   *      mte: 13,
   *      ete: 34,
   *      attendance: 3
   *    }
   *  }
   * ]
   */
  marks: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('marks'));
    },
    set(value) {
      return this.setDataValue('marks', JSON.stringify(value));
    }
  }
}, {
  modelName: 'result',
  underscored: true
});

export default Result;

// import mongoose from 'mongoose';

// mongoose.pluralize(null);

// const Result = mongoose.model('result', new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true
//   },
//   overall_cgpa: {
//     type: String
//   },
//   semester_result: [
//     {
//       semester: {
//         type: Number,
//         // required: true
//       },
//       tgpa: {
//         type: Number,
//         // required: true
//       },
//       marks: [
//         {
//           sub_code: {
//             type: String,
//             // required: true
//           },
//           grade: {
//             type: String,
//             enum: ['A', 'B', 'C', 'D', 'E', 'F'],
//             // required: true
//           },
//           value: {
//             CA: {
//               type: Number,
//               // required: true,
//             },
//             MTE: {
//               type: Number,
//               // required: true
//             },
//             ETE: {
//               type: Number,
//               // required: true
//             },
//             ATTENDANCE: {
//               type: Number
//             }
//           },
//           total_marks: {
//             type: Number
//           }
//         }
//       ]
//     }
//   ]
// }));

// export default Result;