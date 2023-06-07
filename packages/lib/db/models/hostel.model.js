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
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'hostel',
  underscored: true,
  freezeTableName: true
});

export default Hostel;

// const Hostel = sequelize.define('hostel', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//     allowNull: false
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       len: 3
//     }
//   },
//   /**
//    * Sample
//    * blocks: {'A', 'B', 'C', 'D'}
//    */
//   blocks: {
//     type: DataTypes.ARRAY(DataTypes.STRING),
//     allowNull: false,
//     // Add calidator to validae if the items inside the array are capitalized character
//   }
// }, {
//   modelName: 'hostel',
//   underscored: true,
//   freezeTableName: true
// });

// export default Hostel;