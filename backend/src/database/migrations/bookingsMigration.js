import mongoose from 'mongoose';

const bookingsMigration = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },

  bookingDate: {
    type: Date,
    required: true,
  },

  note: {
    type: String,
    default: null,
    trim: true,
  },

  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
};

export default bookingsMigration;
