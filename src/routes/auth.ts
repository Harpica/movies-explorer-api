import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth';

const auth = Router();

auth.post('/signup', signUp);
auth.post('/signin', signIn);
auth.post('/signout', signOut);

export default auth;
