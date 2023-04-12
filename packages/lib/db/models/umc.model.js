import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const UMC = sequelize.define('umc', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  registrationNo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  issuedOn: {
    type: DataTypes.DATE,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 100]
    }
  },
  issuedByDepartment: {
    type: DataTypes.ENUM,
    values: ['faculty', 'security', 'hostel warden'],
    allowNull: false
  },
  issuedBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  modelName: 'umc',
  underscored: true,
  freezeTableName: true
});

export default UMC;