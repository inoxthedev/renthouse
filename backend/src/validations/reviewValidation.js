import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createReviewValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Room ID must be a valid ObjectId.',
        'string.length': 'Room ID must contain 24 characters.',
        'any.required': 'Room ID is required.',
      }),

      rating: Joi.number().integer().min(1).max(5).required().messages({
        'number.base': 'Rating must be a number.',
        'number.integer': 'Rating must be an integer.',
        'number.min': 'Rating must be at least {#limit}.',
        'number.max': 'Rating cannot exceed {#limit}.',
        'any.required': 'Rating is required.',
      }),

      comment: Joi.string().max(1000).allow('', null).trim().strict().messages({
        'string.max': 'Review comment cannot exceed {#limit} characters.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateReviewValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      rating: Joi.number().integer().min(1).max(5),

      comment: Joi.string().max(1000).allow('', null).trim().strict(),
    }).min(1);

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createReviewValidation, updateReviewValidation };