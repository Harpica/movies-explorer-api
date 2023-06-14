import mongoose from 'mongoose';
import { MONGODB_URI, SERVER_PORT } from '../config/config';
import app from './app';

mongoose
  .connect(MONGODB_URI)
  .then(() =>
    app.listen(SERVER_PORT, () => {
      console.log('Listening to', SERVER_PORT);
    })
  )
  .catch((err) => {
    console.error('message:', err.message);
  });
