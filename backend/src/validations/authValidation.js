import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const registerValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      userName: Joi.string().min(3).max(30).required().trim().strict().messages({
        'string.base': 'Username must be a string.',
        'string.empty': 'Username is required.',
        'string.min': 'Username must be at least {#limit} characters long.',
        'string.max': 'Username cannot exceed {#limit} characters.',
        'any.required': 'Username is required.',
      }),

      email: Joi.string().email().required().trim().strict().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
      }),

      password: Joi.string().min(8).max(50).required().strict().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'string.max': 'Password cannot exceed {#limit} characters.',
        'any.required': 'Password is required.',
      }),

      confirmPassword: Joi.string().valid(Joi.ref('password')).required().strict().messages({
        'string.base': 'Confirm password must be a string.',
        'string.empty': 'Confirm password is required.',
        'any.only': 'Confirm password does not match.',
        'any.required': 'Confirm password is required.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const loginValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required().trim().strict().messages({
        'string.base': 'Email must be a string.',
        'string.empty': 'Email is required.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.',
      }),

      password: Joi.string().required().strict().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { registerValidation, loginValidation };
