import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const CourseSubject = sequelize.define('course_subject', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'course',
      key: 'id'
    }
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'subject',
      key: 'id'
    }
  },
  credit: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['1', '2', '3', '4']
  },
  lectureCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  modelName: 'course_subject',
  underscored: true,
  freezeTableName: true
});

export default CourseSubject;