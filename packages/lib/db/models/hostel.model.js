import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Hostel = sequelize.define('hostel', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 3],
      isAlphanumeric: true
    }
  },
  block: {
    type: DataTypes.ENUM,
    values: ['A', 'B', 'C', 'D', 'E'],
  },
  warden: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isMainWarden: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'hostel',
  underscored: true,
  freezeTableName: true
});

export default Hostel;
