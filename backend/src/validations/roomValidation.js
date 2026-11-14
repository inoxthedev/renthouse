import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createRoomValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      categoryId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Category ID must be a valid ObjectId.',
        'string.length': 'Category ID must contain 24 characters.',
        'any.required': 'Category ID is required.',
      }),

      title: Joi.string().min(5).max(100).required().trim().strict().messages({
        'string.empty': 'Room title is required.',
        'string.min': 'Room title must be at least {#limit} characters.',
        'string.max': 'Room title cannot exceed {#limit} characters.',
        'any.required': 'Room title is required.',
      }),

      description: Joi.string().min(10).required().trim().strict().messages({
        'string.empty': 'Room description is required.',
        'string.min': 'Room description must be at least {#limit} characters.',
        'any.required': 'Room description is required.',
      }),

      price: Joi.number().min(0).required().messages({
        'number.base': 'Room price must be a number.',
        'number.min': 'Room price cannot be negative.',
        'any.required': 'Room price is required.',
      }),

      area: Joi.number().min(1).required().messages({
        'number.base': 'Room area must be a number.',
        'number.min': 'Room area must be greater than 0.',
        'any.required': 'Room area is required.',
      }),

      address: Joi.string().required().trim().strict().messages({
        'string.empty': 'Room address is required.',
        'any.required': 'Room address is required.',
      }),

      images: Joi.array().items(Joi.string().uri()).messages({
        'array.base': 'Room images must be an array.',
        'string.uri': 'Each room image must be a valid URL.',
      }),

      amenities: Joi.array().items(Joi.string().trim().strict()).messages({
        'array.base': 'Room amenities must be an array.',
        'string.base': 'Each room amenity must be a string.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateRoomValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      categoryId: Joi.string().hex().length(24),

      title: Joi.string().min(5).max(100).trim().strict(),

      description: Joi.string().min(10).trim().strict(),

      price: Joi.number().min(0),

      area: Joi.number().min(1),

      address: Joi.string().trim().strict(),

      images: Joi.array().items(Joi.string().uri()),

      amenities: Joi.array().items(Joi.string().trim().strict()),
    }).min(1);

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const searchRoomValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      keyword: Joi.string().trim().allow(''),

      categoryId: Joi.string().hex().length(24),

      minPrice: Joi.number().min(0),

      maxPrice: Joi.number().min(0),

      minArea: Joi.number().min(0),

      maxArea: Joi.number().min(0),

      page: Joi.number().integer().min(1).default(1),

      limit: Joi.number().integer().min(1).max(50).default(10),

      sort: Joi.string().valid('newest', 'price_asc', 'price_desc'),
    });

    await schema.validateAsync(req.query, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { 
  createRoomValidation, 
  updateRoomValidation, 
  searchRoomValidation 
};
