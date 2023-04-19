import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Query = sequelize.define('query', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  query: {
    type: DataTypes.STRING,
    allowNull: false
  },
  label: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['1', '2', '3', '4', '5', '6', '7']
  }
}, {
  modelName: 'query',
  underscored: true,
  freezeTableName: true
});

export default Query;