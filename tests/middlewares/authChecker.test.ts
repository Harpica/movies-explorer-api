import supertest from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import authChecker from '../../src/middlewares/authChecker';
import { JWT_KEY } from '../../config/config';

describe('Checks for jwt payload', () => {
  const app = express();
  app.use(cookieParser());
  app.get('/test-user', authChecker, (req, res) => {
    res.send({ user: req.user });
  });
  const token = jwt.sign({ _id: 'test-user-id' }, JWT_KEY, {
    expiresIn: '7d',
  });

  const request = supertest(app);
  it('If jwt verified writes _id from payload into req.user._id', async () => {
    const response = await request
      .get('/test-user')
      .set('Cookie', [`jwt=${token}`]);

    expect(response.body.user).toStrictEqual({ _id: 'test-user-id' });
  });
});
