import { Router } from 'express';

const movies = Router();

movies.get('/');
movies.post('/');
movies.delete('/:id');

export default movies;
