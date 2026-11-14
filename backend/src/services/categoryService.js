import Category from '../models/Category.js';
import ApiError from '../utils/ApiError.js';
import redis from '../config/redis.js';

const getAllCategories = async () => {
  const cacheKey = 'categories:all';

  try {
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('Redis get error:', error);
  }

  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    try {
      await redis.set(cacheKey, JSON.stringify(categories), 'EX', 60 * 60);
    } catch (error) {
      console.error('Redis set error:', error);
    }

    return categories;
  } catch (error) {
    throw new ApiError(500, 'Failed to retrieve categories');
  }
};

export { getAllCategories };
