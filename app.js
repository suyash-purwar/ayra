import express from 'express';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';

const app = express();

// Sets environment variables for development mode
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: `.env.dev`
  });
}

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send({
    status: 'Successful',
    message: 'We are live! ✅'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on PORT=${process.env.PORT} ✅`);
});