/**
 * Direct Postgres Connection
 */

import pg from 'pg';

// const client = new pg.Client({
//   host: 'localhost',
//   user: 'postgres',
//   port: 5432,
//   password: 'AshNov06',
//   database: 'postgres'
// });

// client.connect()
// .then(() => console.log('Database connection established'))
// .catch((err) => console.log(err));

// client.query("SELECT * FROM users;")
// .then(res => console.log(res.rows))
// .catch((e) => console.log(e));

// client.end()
// .then(() => console.log('Connection closed'))
// .catch((err) => console.log(err));





/**
 * Postgres Connection through Sequelize
 */

import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('ayra', 'postgres', 'AshNov06', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
}, {
  modelName: 'users',
  underscored: true
});

// await User.sync({ force: true });

const user = new User({
  id: 1
});

await user.save();

// User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
// User.sync({ force: true }) - This creates the table, dropping it first if it already existed
// User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model