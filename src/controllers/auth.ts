import { NextFunction, Response } from 'express';
import { Request } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_KEY } from '../../config/config';
import BadRequestError from '../utils/errors/BadRequestError';
import { Error } from 'mongoose';
import ConflictError from '../utils/errors/ConflictError';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body;
    userData.password = User.generateHash(userData.password);
    const user = await User.create(userData).then((user) => {
      return user.getUserWithRemovedPassport();
    });

    res.send({ user: user });
  } catch (err: any) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      next(new ConflictError('This e-mail is already used'));
      return;
    }
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError('Incorrect data for user creation'));
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
    const { email, password } = req.body.data;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ user: user });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.clearCookie('jwt', { httpOnly: true }).send({ message: 'Token cleared' });
};