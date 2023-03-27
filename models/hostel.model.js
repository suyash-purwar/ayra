import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Hostel = sequelize.define('hostel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: 3
    }
  }
}, {
  modelName: 'hostel'
});

export default Hostel;