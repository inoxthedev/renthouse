import mongoose from 'mongoose';

const usersMigration = {
  
  userName: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [50, 'Username must not exceed 50 characters'],
  },

  fullName: {
    type: String,
    default: null,
    trim: true,
    maxlength: [100, 'Full name must not exceed 100 characters'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
  },

  phone: {
    type: String,
    default: null,
    trim: true,
    match: [/^(0|\+84)[0-9]{9}$/, 'Invalid Vietnamese phone number'],
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },

  avatar: {
    type: String,
    default: null,
  },

  role: {
    type: String,
    enum: ['user', 'partner', 'admin'],
    default: 'user',
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PricingPlan',
    default: null,
  },

  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  },

  isOnline: {
    type: Boolean,
    default: false,
  },

  lastLoginAt: {
    type: Date,
    default: null,
  },

  deletedAt: {
    type: Date,
    default: null,
  },
};

export default usersMigration;
