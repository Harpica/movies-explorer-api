import { Router } from 'express';
import authChecker from '../middlewares/authChecker';

const movies = Router();

movies.use(authChecker);
movies.get('/');
movies.post('/');
movies.delete('/:id');

export default movies;
