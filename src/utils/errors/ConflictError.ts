import { CONFLICT } from '../constants';
import HttpError from './HttpError';

class ConflictError extends HttpError {
  constructor(message = CONFLICT) {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
