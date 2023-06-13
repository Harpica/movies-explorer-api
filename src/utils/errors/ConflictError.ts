import HttpError from './HttpError';

class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
