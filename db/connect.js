import mongoose from 'mongoose';

export default async function connectBD() {
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lpu-bot-prototype';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI);
    console.log('Database connection established on mongodb://localhost:27017/lpu-bot-prototype. ✅');
  } catch (e) {
    console.log('Database connection failed. 🛑');
    console.log(e.message);
    console.log(e);
  }
};