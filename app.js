import express from 'express';
import * as dotenv from 'dotenv';
import routes from './routes/index.js';
import connectBD from './db/connect.js';

const app = express();

// Sets environment variables for development mode
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: `.env.dev`
  });
}

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send({
    status: 'Successful',
    message: 'We are live! ✅'
  });
});

connectBD()
.then(() => {
  app.listen(process.env.PORT, async () => {
    console.log(`App is running on PORT=${process.env.PORT} ✅`)
  });
});