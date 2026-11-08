import ApiError from '../utils/ApiError.js';
import { decodedJWT } from '../utils/jwt.js';
import redis from '../config/redis.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Lấy Access Token từ header Authorization
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ApiError(401, 'Không tìm thấy token');
    }

    // Xác thực Access Token
    const decoded = decodedJWT(token, 'access_token');

    // Kiểm tra phiên đăng nhập trong Redis
    const isLogin = await redis.exists(`refresh:${decoded.id}`);

    if (!isLogin) {
      throw new ApiError(401, 'Người dùng không hợp lệ hoặc đã đăng xuất');
    }

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token đã hết hạn'));
    }

    next(error);
  }
};

export default authMiddleware;
