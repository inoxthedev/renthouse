import mongoose from 'mongoose';

const messagesMigration = {
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true,
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  content: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    enum: ['text', 'image', 'file'],
    default: 'text',
  },

  isRead: {
    type: Boolean,
    default: false,
  },
};

export default messagesMigration;
//