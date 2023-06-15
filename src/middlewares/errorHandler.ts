import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/errors/HttpError';
import { SERVER_ERROR } from '../utils/constants';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }
  res.status(500).send({ message: SERVER_ERROR });
  next();
};

export default errorHandler;
