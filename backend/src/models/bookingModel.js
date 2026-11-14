import mongoose from 'mongoose';
import bookingsMigration from '../database/migrations/bookingsMigration.js';

const bookingSchema = new mongoose.Schema(bookingsMigration, {
  timestamps: true,
  versionKey: false,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;