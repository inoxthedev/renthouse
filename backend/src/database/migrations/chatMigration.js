import mongoose from 'mongoose';

const chatMigration = {
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },

  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],

  lastMessage: {
    type: String,
    default: null,
  },

  lastMessageAt: {
    type: Date,
    default: null,
  },
};

export default chatMigration;
//