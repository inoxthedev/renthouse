import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createCategoryValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).required().trim().strict().messages({
        'string.base': 'Category name must be a string.',
        'string.empty': 'Category name is required.',
        'string.min': 'Category name must be at least {#limit} characters.',
        'string.max': 'Category name cannot exceed {#limit} characters.',
        'any.required': 'Category name is required.',
      }),

      description: Joi.string().allow('', null).trim().strict(),

      image: Joi.string().uri().allow('', null).messages({
        'string.uri': 'Image must be a valid URL.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateCategoryValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(2).max(50).trim().strict(),

      description: Joi.string().allow('', null).trim().strict(),

      image: Joi.string().uri().allow('', null),
    }).min(1);

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createCategoryValidation, updateCategoryValidation };
//