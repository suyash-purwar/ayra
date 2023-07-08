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
    values: ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'E', 'F']
  }
}, {
  tableName: 'result',
  underscored: true,
  freezeTableName: true
});

export default Result;
