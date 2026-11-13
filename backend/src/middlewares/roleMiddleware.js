import ApiError from '../utils/ApiError.js';
import userModel from '../models/usersModel.js';
import { decodedJWT } from '../utils/jwt.js';

const roleMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header dạng: "Bearer <token>"

  if (!token) {
    throw new ApiError(401, 'Không tìm thấy token.');
  }
  
  try {
    const decoded = decodedJWT(token, 'access_token'); // kiểm tra token
    const user = await userModel.findById(decoded.id);

    if (!user || !user.role) {
      throw new ApiError(401, 'Người dùng không hợp lệ hoặc đã đăng xuất.');
    }

    req.user = decoded; // lưu thông tin người dùng vào req để sử dụng sau
    next(); // tiếp tục middleware tiếp theo
  } catch (error) {

    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Token đã hết hạn.'));
    }

    next(error);
  }
};

export default roleMiddleware;