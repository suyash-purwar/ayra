import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Subject = sequelize.define('subject', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  credit: {
    type: DataTypes.ENUM,
    values: ['0', '1', '2', '3', '4'],
    allowNull: false
  }
}, {
  modelName: 'subject',
  underscored: true,
  freezeTableName: true
});

export default Subject;