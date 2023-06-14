import { Router } from 'express';
import { getUser, updateUser } from '../controllers/users';
import authChecker from '../middlewares/authChecker';

const users = Router();

users.use(authChecker);
users.get('/me', getUser);
users.patch('/me', updateUser);

export default users;
