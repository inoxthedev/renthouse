import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersModel.js';
import { decodedJWT, encodedJWT } from '../utils/jwt.js';
import ApiError from '../utils/ApiError.js';
import redis from '../config/redis.js';
import env from '../config/environment.js';

const loginService = async (email, password) => {
  try {
    const isUser = await userModel.findOne({ email });
    if (!isUser) {
      throw new ApiError(400, 'Email or password not correct!');
    }

    if (isUser.status === 'banned') {
      throw new ApiError(403, 'Tài khoản của bạn đã bị khóa!');
    }

    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      throw new ApiError(400, 'Email or password not correct!');
    }

    const accessToken = encodedJWT(isUser, 'access_token');
    const refreshToken = encodedJWT(isUser, 'refresh_token');

    // Lưu refresh token vào Redis
    await redis.set(`refresh:${isUser._id}`, refreshToken, 'EX', env.REDIS_REFRESH_EXPIRES_IN);

    // Cập nhật trạng thái online và thời gian đăng nhập
    await userModel.updateOne({ _id: isUser._id }, { isOnline: true, lastLoginAt: new Date() });

    const res = {
      accessToken,
      refreshToken,
      user: {
        _id: isUser._id,
        userName: isUser.userName,
        email: isUser.email,
        role: isUser.role,
        plan: isUser.plan,
        avatar: isUser.avatar,
        isOnline: true,
      },
    };

    return res;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'ValidationError') {
      throw new ApiError(400, error.message);
    }
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình đăng nhập!');
  }
};

const registerService = async (userName, email, password, fullName = null) => {
  try {
    const isUser = await userModel.findOne({ email });
    if (isUser) {
      throw new ApiError(400, 'Email đã tồn tại!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      fullName,
    });

    const res = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };
    return res;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'ValidationError') {
      throw new ApiError(400, error.message);
    }
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình đăng ký!');
  }
};

const logoutService = async (userId) => {
  try {
    const isUser = await userModel.findById(userId);

    if (!isUser) {
      throw new ApiError(404, 'User does not exist!');
    }

    await redis.del(`refresh:${isUser._id}`);
    await userModel.updateOne({ _id: isUser._id }, { isOnline: false });

    return {
      message: 'logout successfully!',
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình đăng xuất!');
  }
};

const refreshTokenService = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new ApiError(400, 'Refresh token không được để trống!');
    }

    const decoded = decodedJWT(refreshToken, 'refresh_token');
    const userId = decoded.id;

    // Lấy refresh token từ Redis và kiểm tra
    const storedToken = await redis.get(`refresh:${userId}`);
    if (!storedToken) {
      throw new ApiError(401, 'Token không hợp lệ hoặc đã hết hạn');
    }
    if (storedToken !== refreshToken) {
      throw new ApiError(401, 'Token không khớp');
    }

    // Đảm bảo user tồn tại và không bị khóa
    const user = await userModel.findById(userId);
    if (!user || user.status === 'banned') {
      await redis.del(`refresh:${userId}`);
      throw new ApiError(403, 'Người dùng không tồn tại hoặc đã bị khóa');
    }

    const accessToken = encodedJWT(user, 'access_token');

    return { accessToken };
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      // Dùng jwt.decode để đọc payload token đã hết hạn mà không bị văng lỗi
      const decoded = jwt.decode(refreshToken);
      if (decoded?.id) {
        await redis.del(`refresh:${decoded.id}`);
      }
      throw new ApiError(401, 'Refresh token đã hết hạn');
    }

    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình xử lý token!');
  }
};

const authUserService = async (id) => {
  try {
    const user = await userModel.findById(id).select('-password -__v -deletedAt');
    if (!user) {
      throw new ApiError(404, 'Người dùng không tồn tại');
    }
    return user;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình xác thực!');
  }
};

export { loginService, registerService, logoutService, refreshTokenService, authUserService };
