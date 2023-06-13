import { NextFunction, Response } from 'express';
import { Error } from 'mongoose';
import User from '../models/user';
import BadRequestError from '../utils/errors/BadRequestError';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import { Request } from 'express-serve-static-core';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user;
    const user = await User.findById(id).orFail(
      new DocumentNotFoundError('User with current _id is not found')
    );

    res.send({ user: user });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user;
    const userData: { email: string; name: string } = req.body.data;
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    }).orFail(new DocumentNotFoundError('User with current _id is not found'));

    res.send({ user: user });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};
