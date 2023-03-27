import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const TodayAttendance = sequelize.define('today_attendance', {
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
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'subject',
      key: 'id'
    }
  },
  timing: {
    type: DataTypes.STRING,
    allowNull: false
  },
  attendanceStatus: {
    type: DataTypes.ENUM,
    values: ['P', 'A', 'N'],
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  modelName: 'today_attendance',
  underscored: true
});

export default TodayAttendance;