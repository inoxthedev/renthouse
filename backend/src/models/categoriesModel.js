import mongoose from 'mongoose';
import categoriesMigration from '../database/migrations/categoriesMigration.js';

const categoriesSchema = new mongoose.Schema(categoriesMigration, {
  timestamps: true,
  versionKey: false,
});

const Category = mongoose.model('Category', categoriesSchema);

export default Category;