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

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'AshNov06', {
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

