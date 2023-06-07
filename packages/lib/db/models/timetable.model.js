import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Timetable = sequelize.define('timetable', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
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
  }
}, {
  tableName: 'timetable',
  underscore: true,
  freezeTableName: true
});

export default Timetable;