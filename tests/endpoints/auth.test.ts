import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../src/app';
import { MONGODB_URI } from '../../config/config';
import { MOCK_USER } from '../fixtures/fixtures';
import User from '../../src/models/user';

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGODB_URI));

afterAll(() => mongoose.disconnect());

describe('Auth endpoints', () => {
  afterAll(() => User.deleteOne({ name: MOCK_USER.name }));

  it('POST /signup - Creates new user', async () => {
    const response = await request.post('/signup').send(MOCK_USER);

    expect(response.body.user.name).toBe(MOCK_USER.name);
  });

  it('POST /signin - Logs in user, returns cookie and user data', async () => {
    const response = await request
      .post('/signin')
      .send({ email: MOCK_USER.email, password: MOCK_USER.password });

    expect(response.headers).toHaveProperty('set-cookie');
    expect(response.body.user.name).toBe(MOCK_USER.name);
  });
});
