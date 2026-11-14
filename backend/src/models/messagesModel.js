import mongoose from 'mongoose';
import messagesMigration from '../database/migrations/messagesMigration.js';

const messagesSchema = new mongoose.Schema(messagesMigration, {
  timestamps: true,
  versionKey: false,
});

const Message = mongoose.model('Message', messagesSchema);

export default Message;
