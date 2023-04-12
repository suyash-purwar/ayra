import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const HostelLeave = sequelize.define('hostel_leave', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  registrationNo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  leaveType: {
    type: DataTypes.ENUM,
    values: ['day', 'night'],
    allowNull: false
  },
  from: {
    type: DataTypes.DATE,
    allowNull: false
  },
  to: {
    type: DataTypes.DATE,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 100]
    }
  }
}, {
  modelName: 'hostel_leave',
  underscored: true,
  freezeTableName: true
});

export default HostelLeave;