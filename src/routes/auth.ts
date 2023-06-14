import { Router } from 'express';
import { signIn, signOut, signUp } from '../controllers/auth';
import { celebrate } from 'celebrate';
import validator from '../utils/validator';

const auth = Router();

auth.post('/signup', celebrate(validator.auth.signup), signUp);
auth.post('/signin', celebrate(validator.auth.signin), signIn);
auth.post('/signout', signOut);

export default auth;
