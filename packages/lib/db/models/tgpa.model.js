import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const TGPA = sequelize.define('tgpa', {
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
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tgpa: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'tgpa',
  underscored: true,
  freezeTableName: true
});

export default TGPA;