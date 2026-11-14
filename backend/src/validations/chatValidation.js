import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createChatValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      roomId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Room ID must be a valid ObjectId.',
        'string.length': 'Room ID must contain 24 characters.',
        'any.required': 'Room ID is required.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createChatValidation };
//