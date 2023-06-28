import { Router } from 'express';
import { errors } from 'celebrate';
import users from './users';
import movies from './movies';
import errorHandler from '../middlewares/errorHandler';
import auth from './auth';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import { errorLogger } from '../middlewares/logger';
import authChecker from '../middlewares/authChecker';

const routes = Router();

routes.use('/', auth);
routes.use('/users', users);
routes.use('/movies', movies);

routes.use(authChecker, () => {
  throw new DocumentNotFoundError();
});

routes.use(errorLogger);
routes.use(errors());
routes.use(errorHandler);

export default routes;
