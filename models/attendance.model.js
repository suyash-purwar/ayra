import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Attendance = sequelize.define('attendance', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  registrationNo: {
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
  hourSlot: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hour_slot',
      key: 'id'
    }
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
  modelName: 'attendance',
  underscored: true,
  freezeTableName: true
});

export default Attendance;