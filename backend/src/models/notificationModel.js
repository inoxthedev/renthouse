import mongoose from 'mongoose';
import notificationsMigration from '../database/migrations/notificationMigration.js';

const notificationSchema = new mongoose.Schema(notificationMigration, {
  timestamps: true,
  versionKey: false,
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
