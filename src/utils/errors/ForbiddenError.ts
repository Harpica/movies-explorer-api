import { FORBIDDEN } from '../constants';
import HttpError from './HttpError';

class ForbiddenError extends HttpError {
  constructor(message = FORBIDDEN) {
    super(message);
    this.statusCode = 403;
  }
}

export default ForbiddenError;
