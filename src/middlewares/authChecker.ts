import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';
import UnauthorizedError from '../utils/errors/UnauthorizedError';
import { JWT_KEY } from '../../config/config';
import { REQUIRED_AUTH } from '../utils/constants';

const authChecker = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;
    const payload = jwt.verify(token, JWT_KEY);
    req.user = { _id: (payload as jwt.JwtPayload)._id };
    next();
  } catch (err) {
    next(new UnauthorizedError(REQUIRED_AUTH));
  }
};

export default authChecker;
