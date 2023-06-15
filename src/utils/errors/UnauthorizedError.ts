import { UNAUTHORIZED } from '../constants';
import HttpError from './HttpError';

class UnauthorizedError extends HttpError {
  constructor(message = UNAUTHORIZED) {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthorizedError;
