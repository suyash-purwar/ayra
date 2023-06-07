import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Course = sequelize.define('course', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  modelName: 'course',
  underscored: true,
  freezeTableName: true
});

export default Course;