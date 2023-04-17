import express from 'express';
import sequelize from '@ayra/lib/db/index.js';
import loadConfig from '@ayra/lib/utils/config.js';
import routes from './routes/index.js';

loadConfig();
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(routes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(process.env.CRON_PORT, async () => {
  try {
    console.log(`Cron jobs are running on PORT=${process.env.CRON_PORT}. ✅`);
    await sequelize.authenticate();
    console.log('Database connection established. ✅');
  } catch (e) {
    console.log('Database connection failed. 🔴');
    console.log(e.message);
  }
});
