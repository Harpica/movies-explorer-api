import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import BadRequestError from '../utils/errors/BadRequestError';
import Movie, { IMovie } from '../models/movie';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';

export const getMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user;
    const movies = await Movie.find({
      owner: owner,
    });

    res.send({ movies: movies });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};

export const saveMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user;
    const movieData: Omit<IMovie, 'owner'> = req.body.data;
    const movies = await Movie.create({
      ...movieData,
      owner: owner,
    });

    res.send({ movies: movies });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const owner = req.user;
    const id = req.params.id;
    const deletedMovie = await Movie.deleteOne({
      _id: id,
      owner: owner,
    }).orFail(
      new DocumentNotFoundError(
        "Movie is not found in the current user's collection"
      )
    );

    res.send({ movie: deletedMovie });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};