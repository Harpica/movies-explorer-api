import { Router } from 'express';
import { getUser, updateUser } from '../controllers/users';

const users = Router();

users.get('/me', getUser);
users.patch('/me', updateUser);

export default users;
