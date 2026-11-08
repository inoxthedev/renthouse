import mongoose from 'mongoose';

const categoriesMigration = {
  name: {
    type: String,
    required: [true, 'Category name is required'],
    min: [2, 'Category name must be at least 2 characters long'],
    max: [100, 'Category name cannot exceed 100 characters'],
    trim: true,
  },

  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },

  description: {
    type: String,
    default: '',
    maxlength: [500, 'Description cannot exceed 500 characters'],
    trim: true,
  },

  image: {
    type: String,
    default: '',
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  sortOrder: {
    type: Number,
    default: 0,
  },
};

export default categoriesMigration;
