import mongoose from 'mongoose';
import favoritesMigration from '../database/migrations/favoritesMigration.js';

const favoriteSchema = new mongoose.Schema(favoritesMigration, {
  timestamps: true,
  versionKey: false,
});

favoriteSchema.index({ userId: 1, roomId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;