import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Section = sequelize.define('section', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  hodId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'hod',
      key: 'id'
    },
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'section',
  underscored: 'true',
  frameElement: true
});

export default Section;