import { DataTypes } from 'sequelize';
import sequelize from '../db/connect.js';

const Subject = sequelize.define('subject', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  subjectCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: 6
    }
  },
  credit: {
    type: DataTypes.ENUM,
    values: [0, 1, 2, 3, 4],
    allowNull: false
  }
}, {
  modelName: 'subject',
  underscored: true
});

export default Subject;