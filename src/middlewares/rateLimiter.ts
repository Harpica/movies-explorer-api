import rateLimit from 'express-rate-limit';
import { RATE_LIMIT } from '../utils/constants';

const rateLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 100,
  message: RATE_LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
