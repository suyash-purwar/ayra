import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const OverallAttendance = sequelize.define('overall_attendance', {
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
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'subject',
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