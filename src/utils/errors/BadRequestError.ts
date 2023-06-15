import { BAD_REQUEST } from '../constants';
import HttpError from './HttpError';

class BadRequestError extends HttpError {
  constructor(message = BAD_REQUEST) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
