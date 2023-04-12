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
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lectureCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tutorialCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  practicalCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  modelName: 'course_subject',
  underscored: true,
  freezeTableName: true
});

export default CourseSubject;