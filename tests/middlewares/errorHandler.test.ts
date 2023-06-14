import supertest from 'supertest';
import app from '../../src/app';
import BadRequestError from '../../src/utils/errors/BadRequestError';
import errorHandler from '../../src/middlewares/errorHandler';

const request = supertest(app);

describe('Handle http and server errors', () => {
  app.get('/http-error', (_req, _res, next) => {
    next(new BadRequestError('Error message'));
  });
  app.get('/server-error', (_req, _res, next) => {
    next(new Error('Error message'));
  });
  app.use(errorHandler);

  it('Returns error message and status code according to error in case of HTTP error', async () => {
    const response = await request.get('/http-error');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Error message');
  });

  it('Returns 500 status and server error message in case of all other errors', async () => {
    const response = await request.get('/server-error');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server Error');
  });
});
