import { Model, Schema, Types, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import UnauthorizedError from '../utils/errors/UnauthorizedError';

interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

interface IUserMethods {
  getUserWithRemovedPassport: () => Omit<IUser, 'password'>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  generateHash: (password: string) => string;
  validatePassword: (password: string, hash: string) => boolean;
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Omit<IUser, 'password'>>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [isEmail, 'Value is not valid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.methods.getUserWithRemovedPassport = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

userSchema.statics.validatePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash);
};

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user || !this.validatePassword(password, user.password)) {
    throw new UnauthorizedError('Email or password is incorrect');
  }
  const newUser = user.getUserWithRemovedPassport();
  return newUser;
};

const User = model<IUser, UserModel>('user', userSchema);
export default User;
