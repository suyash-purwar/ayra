import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const OverallAttendance = sequelize.define('overall_attendance', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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
  attendance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      max: 100,
      min: 0
    }
  }
}, {
  modelName: 'overall_attendance',
  underscored: true,
  freezeTableName: true
});

export default OverallAttendance;