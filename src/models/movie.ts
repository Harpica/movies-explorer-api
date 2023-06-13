import { Schema, Types, model } from 'mongoose';
import isURL from 'validator/lib/isURL';

interface IMovie {
  country: string;
  director: string;
  duration: number;
  year: string;
  description: string;
  image: string;
  trailerLink: string;
  thumbnail: string;
  owner: Types.ObjectId;
  movieId: number;
  nameRU: string;
  nameEN: string;
}

const movieSchema = new Schema<IMovie>({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, 'Value is not valid URL'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isURL, 'Value is not valid URL'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isURL, 'Value is not valid URL'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

const Movie = model<IMovie>('movie', movieSchema);
export default Movie;
