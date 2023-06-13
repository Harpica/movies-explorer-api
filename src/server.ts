import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { CLIENT_URL, MONGODB_URI, SERVER_PORT } from './utils/constants';

const app = express();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

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
