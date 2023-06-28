import cors from 'cors';
import { CLIENT_URL } from '../../config/config';

const corsHandler = cors({
  origin: CLIENT_URL,
  credentials: true,
});

export default corsHandler;
