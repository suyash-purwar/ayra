import express from 'express';
import sequelize from '@ayra/lib/db/index.js';
import loadConfig from '@ayra/lib/utils/config.js';

loadConfig();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log("CRON project setup");
});

app.listen(process.env.CRON_PORT, async () => {
  try {
    console.log(`App is running on PORT=${process.env.PORT}. ✅`);
    await sequelize.authenticate();
    console.log('Database connection established. ✅');
  } catch (e) {
    console.log('Database connection failed. 🔴');
    console.log(e.message);
  }
});
