import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Student = sequelize.define('student', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  registrationNo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  middleName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  session: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'course',
      key: 'id'
    }
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'mentor',
      key: 'id'
    }
  },
  hostelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hostel',
      key: 'id'
    }
  },
  fatherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fatherContact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motherName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motherContact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rollNo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  modelName: 'student',
  underscored: true,
  freezeTableName: true
});

export default Student;