import ApiError from '../utils/ApiError.js';
import { decodedJWT } from '../utils/jwt.js';

const guestMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next();
  }

  try {
    decodedJWT(token, 'access_token');
    return next(new ApiError(403, 'Bạn đã đăng nhập, không thể truy cập chức năng này.'));
  } catch (error) {
    return next();
  }
};

export default guestMiddleware;
