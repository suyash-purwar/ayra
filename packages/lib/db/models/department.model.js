import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Department = sequelize.define('department', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  block: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  modelName: 'department',
  underscored: true,
  freezeTableName: true
});

export default Department;