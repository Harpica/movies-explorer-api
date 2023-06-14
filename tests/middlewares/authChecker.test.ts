import supertest from 'supertest';
import app from '../../src/app';
import authChecker from '../../src/middlewares/authChecker';
import jwt from 'jsonwebtoken';
import { JWT_KEY } from '../../config/config';

const request = supertest(app);

describe('Checks for jwt payload', () => {
  it('If jwt verified writes _id from payload into req.user._id', async () => {
    app.get('/test-user', authChecker, (req, res, _next) => {
      res.send({ user: req.user });
    });
    const token = jwt.sign({ _id: 'test-user-id' }, JWT_KEY, {
      expiresIn: '7d',
    });

    const response = await request
      .get('/test-user')
      .set('Cookie', [`jwt=${token}`]);

    expect(response.body.user).toStrictEqual({ _id: 'test-user-id' });
  });
});
