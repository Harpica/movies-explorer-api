import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'develop';
export const CLIENT_URL =
  NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:3000';
export const SERVER_PORT = process.env.SERVER_PORT || 5000;

const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_NAME = process.env.MONGODB_NAME || 'bitfilmsdb';
const MONGODB_USERNAME = process.env.MONGODB_USERNAME || '';
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || '';
export const MONGODB_URI = `mongodb://${
  MONGODB_USERNAME !== '' && MONGODB_PASSWORD !== ''
    ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`
    : ''
}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;
