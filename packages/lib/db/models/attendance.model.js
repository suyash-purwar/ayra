import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Attendance = sequelize.define('attendance', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'student',
      key: 'id'
    }
  },
  lectureId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'lecture',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM,
    values: ['P', 'A', 'N'],
    allowNull: false,
    defaultValue: 'N'
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