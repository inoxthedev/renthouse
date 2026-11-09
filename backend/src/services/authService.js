import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usersModel.js';
import { decodedJWT, encodedJWT } from '../utils/jwt.js';
import ApiError from '../utils/ApiError.js';
import redis from '../config/redis.js';
import env from '../config/environment.js';
import mailer from '../utils/mailer.js';

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

const forgotPasswordService = async (email) => {
  try {
    if (!email) {
      throw new ApiError(400, 'Vui lòng cung cấp email!');
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      throw new ApiError(404, 'Email không tồn tại trong hệ thống!');
    }

    if (user.status === 'banned') {
      throw new ApiError(403, 'Tài khoản của bạn đã bị khóa!');
    }

    // Kiểm tra chống spam gửi liên tục (chặn gửi lại trong 2 phút)
    const isSpam = await redis.get(`forgot_password_spam:${user._id}`);
    if (isSpam) {
      throw new ApiError(
        429,
        'Yêu cầu đặt lại mật khẩu đã được gửi, vui lòng kiểm tra hộp thư hoặc thử lại sau 2 phút!'
      );
    }

    // Tạo resetToken hạn 15 phút
    const resetToken = jwt.sign({ userId: user._id, email: user.email }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

    // Lưu token vào Redis với TTL 15 phút để đối chiếu khi reset password
    await redis.set(`reset_password:${resetToken}`, user._id.toString(), 'EX', 15 * 60);

    // Đặt cờ chống spam 2 phút
    await redis.set(`forgot_password_spam:${user._id}`, 'sent', 'EX', 2 * 60);

    const resetLink = `${env.CORS_ORIGIN}/reset-password?token=${resetToken}`;

    const info = await mailer.sendMail({
      from: `"${env.MAIL_FROM_NAME}" <${env.MAIL_USERNAME}>`,
      to: user.email,
      subject: 'Yêu cầu đặt lại mật khẩu - Rent House',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #2b6cb0;">Đặt lại mật khẩu</h2>
          <p>Xin chào <strong>${user.userName || user.email}</strong>,</p>
          <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản Rent House của bạn.</p>
          <p>Vui lòng nhấn vào nút bên dưới để tiến hành đặt mật khẩu mới (Liên kết này có hiệu lực trong <strong>15 phút</strong>):</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" style="background-color: #3182ce; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Đặt lại mật khẩu</a>
          </div>
          <p>Hoặc bạn có thể sao chép liên kết sau dán vào trình duyệt:</p>
          <p style="word-break: break-all; color: #4a5568;"><a href="${resetLink}">${resetLink}</a></p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 13px; color: #718096;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này để bảo vệ tài khoản.</p>
        </div>
      `,
    });

    return {
      message: 'Email hướng dẫn đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư.',
      messageId: info.messageId,
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình gửi email quên mật khẩu!');
  }
};

const changePasswordService = async (userId, oldPassword = '', newPassword = '') => {
  try {
    // 1. Tìm người dùng theo userId lấy từ Token
    const isUser = await userModel.findById(userId);
    if (!isUser) {
      throw new ApiError(404, 'Người dùng không tồn tại!');
    }

    // 2. So sánh mật khẩu cũ (bất đồng bộ)
    const isPassword = await bcrypt.compare(oldPassword, isUser.password);
    if (!isPassword) {
      throw new ApiError(400, 'Mật khẩu cũ không chính xác!');
    }

    // 3. Kiểm tra mật khẩu mới không được trùng mật khẩu cũ
    if (oldPassword === newPassword) {
      throw new ApiError(400, 'Mật khẩu mới không được trùng với mật khẩu cũ!');
    }

    // 4. Hash mật khẩu mới (bất đồng bộ) và lưu DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    isUser.password = hashedPassword;
    await isUser.save();

    // 5. Xóa session trong Redis để vô hiệu hóa token cũ trên các thiết bị
    await redis.del(`refresh:${isUser._id}`);

    return {
      message: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.',
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'ValidationError') {
      throw new ApiError(400, error.message);
    }
    throw new ApiError(500, 'Đã xảy ra lỗi trong quá trình đổi mật khẩu!');
  }
};

const resetPasswordService = async (token = '', newPassword = '') => {
  try {
    if (!token || !newPassword) {
      throw new ApiError(400, 'Token và mật khẩu mới không được để trống!');
    }

    // 1. Kiểm tra token có tồn tại trong Redis không
    const userId = await redis.get(`reset_password:${token}`);
    if (!userId) {
      throw new ApiError(400, 'Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn!');
    }

    // 2. Tìm người dùng trong DB
    const user = await userModel.findById(userId);
    if (!user) {
      throw new ApiError(404, 'Người dùng không tồn tại!');
    }

    if (user.status === 'banned') {
      throw new ApiError(403, 'Tài khoản của bạn đã bị khóa!');
    }

    // 3. Hash mật khẩu mới và lưu vào DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // 4. Xóa token trong Redis để link chỉ dùng được 1 lần
    await redis.del(`reset_password:${token}`);

    // 5. Hủy tất cả các phiên đăng nhập cũ trong Redis
    await redis.del(`refresh:${user._id}`);

    return {
      message: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới.',
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'ValidationError') {
      throw new ApiError(400, error.message);
    }
    throw new ApiError(500, error.message || 'Đã xảy ra lỗi trong quá trình đặt lại mật khẩu!');
  }
};

export {
  loginService,
  registerService,
  logoutService,
  refreshTokenService,
  authUserService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
};
