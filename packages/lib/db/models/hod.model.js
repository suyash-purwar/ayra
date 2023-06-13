import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const HOD = sequelize.define('hod', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  registrationNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
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
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING
  }
}, {
  modelName: 'hod',
  underscored: true,
  freezeTableName: true
});

export default HOD;