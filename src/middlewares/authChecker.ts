import jwt from 'jsonwebtoken';
import UnauthorizedError from '../utils/errors/UnauthorizedError.js';
import { JWT_KEY } from '../../config/config.js';
import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';

const authChecker = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    const payload = jwt.verify(token, JWT_KEY);
    req.user = payload.toString();
    next();
  } catch (err) {
    next(new UnauthorizedError('Authorization is required'));
  }
};

export default authChecker;
