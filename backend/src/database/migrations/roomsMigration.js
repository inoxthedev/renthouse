import mongoose from 'mongoose';

const roomsMigration = {
    
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  area: {
    type: Number,
    required: true,
    min: 0,
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  images: {
    type: [String],
    default: [],
  },

  amenities: {
    type: [String],
    default: [],
  },

  status: {
    type: String,
    enum: ['available', 'rented', 'hidden'],
    default: 'available',
  },

  deletedAt: {
    type: Date,
    default: null,
  },
};

export default roomsMigration;
//