import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const TrainingQuery = sequelize.define('training_query', {
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
  completion: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ['0', '1', '2', '3', '4', '5', '6']
  }
}, {
  modelName: 'training_query',
  underscored: true,
  timestamps: false,
  freezeTableName: true
});

export default TrainingQuery;