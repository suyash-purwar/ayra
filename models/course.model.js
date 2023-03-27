import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Course = sequelize.define('course', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  courseCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Add custom validator to validate the array of incoming objects
  curriculum: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    get() {
      return JSON.parse(this.getDataValue('curriculum'));
    },
    set(value) {
      return this.setDataValue('curriculum', JSON.stringify(value));
    }
  },
}, {
  modelName: 'course',
  underscored: true
});

export default Course;