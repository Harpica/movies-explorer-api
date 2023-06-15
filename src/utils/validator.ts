import { Joi } from 'celebrate';
import joi from 'joi';
import isURL from 'validator/lib/isURL';
import { INVALID_URL } from './constants';

const validateUrl = (value: string, helper: joi.CustomHelpers<string>) => {
  if (!isURL(value)) {
    return helper.message({ custom: INVALID_URL });
  }
  return value;
};

const validator = {
  auth: {
    signin: {
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    },
    signup: {
      body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().min(2).max(30).required(),
      }),
    },
  },
  users: {
    update: {
      body: Joi.object().keys({
        email: Joi.string().email().required(),
        name: Joi.string().min(2).max(30).required(),
      }),
    },
  },
  movies: {
    save: {
      body: Joi.object().keys({
        country: Joi.string().required(),
        director: Joi.string().required(),
        duration: Joi.number().required(),
        year: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required().custom(validateUrl),
        trailerLink: Joi.string().required().custom(validateUrl),
        thumbnail: Joi.string().required().custom(validateUrl),
        movieId: Joi.number().required(),
        nameRU: Joi.string().required(),
        nameEN: Joi.string().required(),
      }),
    },
    delete: {
      params: Joi.object().keys({
        id: Joi.string().length(24).hex().required(),
      }),
    },
  },
};

export default validator;
