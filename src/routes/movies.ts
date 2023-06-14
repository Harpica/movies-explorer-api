import { Router } from 'express';
import authChecker from '../middlewares/authChecker';
import validator from '../utils/validator';
import { deleteMovie, getMovies, saveMovie } from '../controllers/movies';
import { celebrate } from 'celebrate';

const movies = Router();

movies.use(authChecker);
movies.get('/', getMovies);
movies.post('/', celebrate(validator.movies.save), saveMovie);
movies.delete('/:id', celebrate(validator.movies.delete), deleteMovie);

export default movies;
