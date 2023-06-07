import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Result = sequelize.define('result', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  courseSubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'course_subject',
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'student',
      key: 'id'
    }
  },
  grade: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['O', 'A+']
  }
}, {
  tableName: 'result',
  underscore: true,
  freezeTableName: true
});

export default Result;

// const Result = sequelize.define('result', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   registrationNo: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   semester: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   tgpa: {
//     type: DataTypes.FLOAT,
//     allowNull: false
//   },
//   marks: {
//     type: DataTypes.ARRAY(DataTypes.JSON),
//     allowNull: false
//   }
// }, {
//   modelName: 'result',
//   underscored: true,
//   freezeTableName: true
// });

// export default Result;