import {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
  authUserService,
  changePasswordService,
  forgotPasswordService,
  resetPasswordService,
} from '../../services/authService.js';

const registerController = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    const user = await registerService(userName, email, password);

    res.status(201).json({
      success: true,
      message: 'Register successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const data = await loginService(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await logoutService(userId);

    res.status(200).json({
      success: true,
      message: 'Logout successfully',
    });
  } catch (error) {
    next(error);
  }
};

const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const data = await refreshTokenService(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Refresh token successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const authUserController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await authUserService(userId);

    res.status(200).json({
      success: true,
      message: 'Get user successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const changePasswordController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const result = await changePasswordService(userId, oldPassword, newPassword);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgotPasswordService(email);
    
    res.status(200).json({ 
      success: true, 
      message: result.message 
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const result = await resetPasswordService(token, password);
    res.status(200).json({ 
      success: true, 
      message: result.message 
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  authUserController,
  changePasswordController,
  forgotPasswordController,
  resetPasswordController,
};
