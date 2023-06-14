import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';
import corsHandler from './middlewares/cors';

const app = express();

app.use(corsHandler);
app.use(helmet());
app.use(rateLimiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

export default app;
