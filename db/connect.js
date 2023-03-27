import { Sequelize } from 'sequelize';

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

export default sequelize;

// import mongoose from 'mongoose';

// export default async function connectBD() {
//   const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lpu-bot-prototype';
//   try {
//     mongoose.set('strictQuery', false);
//     await mongoose.connect(MONGODB_URI);
//     console.log('Database connection established on mongodb://localhost:27017/lpu-bot-prototype. ✅');
//   } catch (e) {
//     console.log('Database connection failed. 🛑');
//     console.log(e.message);
//     console.log(e);
//   }
// };