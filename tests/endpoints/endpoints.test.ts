import mongoose from 'mongoose';
import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import { MONGODB_URI, JWT_KEY } from '../../config/config';
import User from '../../src/models/user';
import { MOCK_MOVIE, MOCK_USER } from '../fixtures/fixtures';
import app from '../../src/app';

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGODB_URI));

afterAll(() => mongoose.disconnect());

describe('Endpoints tests', () => {
  let userId: string;
  let token: string;
  beforeAll(async () => {
    await User.create(MOCK_USER).then((user) => {
      userId = user._id.toString();
      token = jwt.sign({ _id: userId }, JWT_KEY, {
        expiresIn: '7d',
      });
    });
  });
  afterAll(() => User.deleteOne({ _id: userId }));

  describe('Users endpoints', () => {
    it("GET /users/me Returns user's data without password", async () => {
      const response = await request
        .get('/users/me')
        .set('Cookie', [`jwt=${token}`]);

      expect(response.status).toBe(200);
      expect(response.body.user._id).toBe(userId);
      expect(response.body.user.password).toBe(undefined);
    });

    it("PATCH /users/me Returns updated user's data without password", async () => {
      const response = await request
        .patch('/users/me')
        .set('Cookie', [`jwt=${token}`])
        .send({ name: 'New Mock Name' });

      expect(response.status).toBe(200);
      expect(response.body.user._id).toBe(userId);
      expect(response.body.user.name).toBe('New Mock Name');
      expect(response.body.user.password).toBe(undefined);
    });

    it('GET /users/me Returns DocumentNotFoundError if user with requested id does not exist', async () => {
      const errorToken = jwt.sign(
        { _id: '646b38b9787fe146b846fb04' },
        JWT_KEY,
        {
          expiresIn: '7d',
        },
      );
      const response = await request
        .get('/users/me')
        .set('Cookie', [`jwt=${errorToken}`]);

      expect(response.status).toBe(404);
    });

    it('PATCH /users/me Returns DocumentNotFoundError if user with requested id does not exist', async () => {
      const errorToken = jwt.sign(
        { _id: '646b38b9787fe146b846fb04' },
        JWT_KEY,
        {
          expiresIn: '7d',
        },
      );
      const response = await request
        .patch('/users/me')
        .set('Cookie', [`jwt=${errorToken}`])
        .send({ name: 'New Mock Name' });

      expect(response.status).toBe(404);
    });

    it('PATCH /users/me Returns BadRequestError if update data is incorrect', async () => {
      const errorToken = jwt.sign({ _id: 'incorrect id' }, JWT_KEY, {
        expiresIn: '7d',
      });
      const response = await request
        .patch('/users/me')
        .set('Cookie', [`jwt=${errorToken}`])
        .send({ email: 'none' });

      expect(response.status).toBe(400);
    });
  });
  describe('Movies endpoints', () => {
    let movieMongoId: string;
    it('POST /movies - Saves movie', async () => {
      const response = await request
        .post('/movies')
        .send(MOCK_MOVIE)
        .set('Cookie', [`jwt=${token}`]);

      movieMongoId = response.body.movie._id;

      expect(response.body.movie.movieId).toBe(MOCK_MOVIE.movieId);
      expect(response.status).toBe(200);
    });

    it('DELETE /movies/:id - Deletes movie by id', async () => {
      const response = await request
        .delete(`/movies/${movieMongoId}`)
        .set('Cookie', [`jwt=${token}`]);

      expect(response.body.deletedMovieId).toBe(movieMongoId);
      expect(response.status).toBe(200);
    });
  });
});
