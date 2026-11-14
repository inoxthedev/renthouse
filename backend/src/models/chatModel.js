import mongoose from 'mongoose';
import chatMigration from '../database/migrations/chatMigration.js';

const chatSchema = new mongoose.Schema(chatMigration, {
  timestamps: true,
  versionKey: false,
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;