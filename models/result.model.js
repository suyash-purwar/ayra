import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Result = sequelize.define('result', {
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
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tgpa: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  marks: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false
  }
}, {
  modelName: 'result',
  underscored: true,
  freezeTableName: true
});

export default Result;