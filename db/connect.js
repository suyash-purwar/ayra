import { Sequelize } from 'sequelize';
import loadConfig from '../utils/config.js';

loadConfig();

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB_NAME,
  username: process.env.POSTGRES_DB_USER,
  password: process.env.POSTGRES_DB_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres'
});

export default sequelize;