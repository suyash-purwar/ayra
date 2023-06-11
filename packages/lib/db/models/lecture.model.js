import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Lecture = sequelize.define('lecture', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  courseSubjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'course_subject',
      key: 'id'
    }
  },
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'section',
      key: 'id'
    }
  },
  facultyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'faculty',
      key: 'id'
    }
  },
  day: {
    type: DataTypes.ENUM,
    values: ['1', '2', '3', '4', '5'],
    allowNull: false,
    comment: 'Monday is mapped with 1 and so on.'
  },
  hourSlotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hour_slot',
      key: 'id'
    }
  }
}, {
  tableName: 'lecture',
  underscored: true,
  freezeTableName: true
});

export default Lecture;