import express from 'express';
import {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  authUserController,
  forgotPasswordController,
  resetPasswordController,
  changePasswordController,
} from '../../controllers/auth/authController.js';
import authMiddleware from '../../middlewares/authMiddleware.js';
import guestMiddleware from '../../middlewares/guestMiddleware.js';
import { registerValidation, loginValidation } from '../../validations/authValidation.js';

const authRoutes = express.Router();

authRoutes.route('/register')
  .post(guestMiddleware, registerValidation, registerController);

authRoutes.route('/login')
  .post(guestMiddleware, loginValidation, loginController);

authRoutes.route('/refreshtoken')
  .post(refreshTokenController);

authRoutes.route('/logout')
  .post(authMiddleware, logoutController);

authRoutes.route('/me')
  .get(authMiddleware, authUserController);

authRoutes.route('/forgot-password')
  .post(guestMiddleware, forgotPasswordController);

authRoutes.route('/reset-password')
  .post(guestMiddleware, resetPasswordController);

authRoutes.route('/change-password')
  .post(authMiddleware, changePasswordController);

export default authRoutes;