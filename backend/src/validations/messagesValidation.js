import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

const createMessageValidation = async (req, res, next) => {
  try {
    const schema = Joi.object({
      chatId: Joi.string().hex().length(24).required().messages({
        'string.hex': 'Chat ID must be a valid ObjectId.',
        'string.length': 'Chat ID must contain 24 characters.',
        'any.required': 'Chat ID is required.',
      }),

      content: Joi.string().required().trim().strict().messages({
        'string.base': 'Message content must be a string.',
        'string.empty': 'Message content is required.',
        'any.required': 'Message content is required.',
      }),

      type: Joi.string().valid('text', 'image', 'file').default('text').messages({
        'any.only': 'Message type must be text, image or file.',
      }),
    });

    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errorMessage = error.details ? error.details.map((detail) => detail.message).join(', ') : error.message;

    next(new ApiError(error.isJoi ? 400 : 500, errorMessage));
  }
};

export { createMessageValidation };
//