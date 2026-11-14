import mongoose from 'mongoose';
import roomsMigration from '../migrations/roomsMigration.js';

const roomSchema = new mongoose.Schema(roomsMigration, {
  timestamps: true,
  versionKey: false,
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
