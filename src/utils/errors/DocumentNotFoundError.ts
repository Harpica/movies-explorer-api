import { NOT_FOUND } from '../constants';
import HttpError from './HttpError';

class DocumentNotFoundError extends HttpError {
  constructor(message = NOT_FOUND) {
    super(message);
    this.statusCode = 404;
  }
}

export default DocumentNotFoundError;
