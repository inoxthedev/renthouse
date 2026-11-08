import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  authUserController,
} from '../../controllers/auth/authController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import guestMiddleware from '../../middlewares/guestMiddleware.js';
import { registerValidation, loginValidation } from '../../validations/authValidation.js';

const authRoutes = express.Router();

// [POST] /register - Đăng ký tài khoản mới (chỉ dành cho khách, có validate dữ liệu)
authRoutes.route('/register').post(guestMiddleware, registerValidation, registerController);

// [POST] /login - Đăng nhập hệ thống (chỉ dành cho khách, có validate dữ liệu)
authRoutes.route('/login').post(guestMiddleware, loginValidation, loginController);

// [POST] /refreshtoken - Cấp lại access token mới khi hết hạn
authRoutes.route('/refreshtoken').post(refreshTokenController);

// [POST] /logout - Đăng xuất (yêu cầu Access Token)
authRoutes.route('/logout').post(authMiddleware, logoutController);

// [GET] /me - Lấy thông tin tài khoản hiện tại (yêu cầu Access Token)
authRoutes.route('/me').get(authMiddleware, authUserController);

export default authRoutes;
