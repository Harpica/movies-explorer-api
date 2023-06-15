import { NextFunction, Response } from 'express';
import { Error } from 'mongoose';
import { Request } from 'express-serve-static-core';
import User from '../models/user';
import BadRequestError from '../utils/errors/BadRequestError';
import DocumentNotFoundError from '../utils/errors/DocumentNotFoundError';
import { EMAIL_USED, USER_NOT_FOUND } from '../utils/constants';
import ConflictError from '../utils/errors/ConflictError';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).orFail(
      new DocumentNotFoundError(USER_NOT_FOUND)
    );

    res.send({ user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user._id;
    const userData: { email: string; name: string } = req.body;
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    }).orFail(new DocumentNotFoundError(USER_NOT_FOUND));

    res.send({ user });
  } catch (err: any) {
    if (err.code === 11000) {
      next(new ConflictError(EMAIL_USED));
      return;
    }
    if (err instanceof Error.ValidationError) {
      next(new BadRequestError());
      return;
    }
    next(err);
  }
};
