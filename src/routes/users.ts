import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getUser, updateUser } from '../controllers/users';
import authChecker from '../middlewares/authChecker';
import validator from '../utils/validator';

const users = Router();

users.use(authChecker);
users.get('/me', getUser);
users.patch('/me', celebrate(validator.users.update), updateUser);

export default users;
