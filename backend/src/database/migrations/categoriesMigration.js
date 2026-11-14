import mongoose from 'mongoose';

const categoriesMigration = {
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  description: {
    type: String,
    default: null,
    trim: true,
  },

  image: {
    type: String,
    default: null,
  },

  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
};

export default categoriesMigration;
//