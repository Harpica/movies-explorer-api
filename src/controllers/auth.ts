import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';
import User from '../models/user';
import { JWT_KEY } from '../../config/config';
import BadRequestError from '../utils/errors/BadRequestError';
import ConflictError from '../utils/errors/ConflictError';
import {
  EMAIL_USED,
  INCORRECT_DATA_USER_CREATION,
  TOKEN_CLEARED,
} from '../utils/constants';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    userData.password = User.generateHash(userData.password);
    const newUser = await User.create(userData);
    const user = newUser.getUserWithRemovedPassport();

    const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ user });
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError(EMAIL_USED));
      return;
    }
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError(INCORRECT_DATA_USER_CREATION));
      return;
    }
    next(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ user });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (_req: Request, res: Response) => {
  res.clearCookie('jwt', { httpOnly: true }).send({ message: TOKEN_CLEARED });
};
