import { Router } from 'express';
import errorHandler from '../middlewares/errorHandler';

const routes = Router();

routes.use(errorHandler);

export default routes;
