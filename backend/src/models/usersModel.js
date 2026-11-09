import mongoose from 'mongoose';
import usersMigration from '../database/migrations/usersMigration.js';

const userSchema = new mongoose.Schema(usersMigration, {
  timestamps: true,
  versionKey: false,
});

const User = mongoose.model('User', userSchema);

export default User;
