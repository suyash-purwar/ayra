import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Warden = sequelize.define('warden', {
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
  hostelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'hostel',
      key: 'id'
    }
  },
  block: {
    type: DataTypes.ENUM,
    values: ['A', 'B', 'C', 'D', 'E'],
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
  modelName: 'warden',
  underscored: true,
  freezeTableName: true
});

export default Warden;