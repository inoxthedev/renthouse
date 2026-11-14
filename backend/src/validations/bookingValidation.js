import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createBookingValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Room ID must be a valid ObjectId.',
        'string.length': 'Room ID must contain 24 characters.',
        'any.required': 'Room ID is required.',
      }),

      bookingDate: Joi.date().iso().greater('now').required().messages({
        'date.base': 'Booking date must be a valid date.',
        'date.format': 'Booking date must use ISO date format.',
        'date.greater': 'Booking date must be in the future.',
        'any.required': 'Booking date is required.',
      }),

      note: Joi.string().max(500).allow('', null).trim().strict().messages({
        'string.max': 'Booking note cannot exceed {#limit} characters.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

const updateBookingValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      bookingDate: Joi.date().iso().greater('now'),

      note: Joi.string().max(500).allow('', null).trim().strict(),

      status: Joi.string().valid('confirmed', 'cancelled', 'completed'),
    }).min(1);

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createBookingValidation, updateBookingValidation };
