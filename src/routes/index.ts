import { Router } from 'express';
import users from './users';
import movies from './movies';
import errorHandler from '../middlewares/errorHandler';
import auth from './auth';
import authChecker from '../middlewares/authChecker';

const routes = Router();

routes.use('/', auth);
routes.use(authChecker);
routes.use('/users', users);
routes.use('/movies', movies);
routes.use(errorHandler);

export default routes;
