import express from 'express';
import routes from './routes/index.js';
import sequelize from './db/connect.js';
import loadConfig from './utils/config.js';

loadConfig();
const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send({
    status: 'Successful',
    message: 'We are live! ✅'
  });
});

app.listen(process.env.PORT, async () => {
  try {
    console.log(`App is running on PORT=${process.env.PORT}. ✅`);
    await sequelize.authenticate();
    console.log('Database connection established. ✅');
  } catch (e) {
    console.log('Database connection failed. 🔴');
    console.log(e.message);
  }
});
