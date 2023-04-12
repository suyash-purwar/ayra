import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const HourSlot = sequelize.define('hour_slot', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  slot: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  modelName: 'hour_slot',
  freezeTableName: true,
  underscored: true
});

export default HourSlot;