import * as dotenv from 'dotenv';

// Sets environment variables for development mode
export default function loadConfig() {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: `../../.env.dev`
    });
  }
}
