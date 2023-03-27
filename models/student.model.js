import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Student = sequelize.define('student', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  registrationNo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'mentors',
      key: 'id'
    }
  },
  hostelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hostels',
      key: 'id'
    }
  },
  fatherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fatherContact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motherContact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rollNo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  modelName: 'student',
  underscored: true
});

export default Student;

// import mongoose from 'mongoose';

// mongoose.pluralize(null);

// const Student = mongoose.model('student', new mongoose.Schema({
//   id: {
//     type: Number,
//     required: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   contact: {
//     type: String,
//     required: true
//   },
//   guardians: {
//     name: {
//       type: String,
//       required: true
//     },
//     contact: {
//       type: String,
//       required: true
//     },
//     relation: {
//       type: String
//     }
//   },
//   attendance: {
//     overall: [
//       {
//         sub_code: {
//           type: String,
//           required: true
//         },
//         attendance: {
//           type: Number,
//           required: true
//         }
//       }
//     ],
//     todays_attendance: {
//       date: Date,
//       value: [
//         {
//           sub_code: {
//             type: String,
//             required: true
//           },
//           time: {
//             type: String,
//             required: true
//           },
//           attendance: {
//             type: String,
//             required: true,
//             enum: ['present', 'absent', 'waiting']
//           },
//           type: {
//             type: String,
//             enum: ['L', 'T', 'P']
//           }
//         }
//       ]
//     }
//   },
//   mentor: {
//     name: {
//       type: String,
//       required: true
//     },
//     contact: {
//       type: String,
//       required: true
//     }
//   },
//   is_hosteller: {
//     type: Boolean,
//     required: true
//   },
//   hostel: {
//     code: {
//       type: String
//     },
//     block: {
//       type: String,
//       enum: ['A', 'B', 'C', 'D', 'E']
//     },
//     room_no: {
//       type: Number
//     },
//     bed: {
//       type: String,
//       enum: ['A', 'B', 'C', 'D']
//     }
//   }
// }));

// export default Student;