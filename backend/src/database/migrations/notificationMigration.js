import mongoose from 'mongoose';

const notificationsMigration = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  content: {
    type: String,
    required: true,
    trim: true,
  },

  type: {
    type: String,
    enum: ['message', 'booking', 'review', 'system'],
    default: 'system',
  },

  isRead: {
    type: Boolean,
    default: false,
  },
};

export default notificationsMigration;
//