import {
  registerService,
  loginService,
  logoutService,
  refreshTokenService,
  authUserService,
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

export {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
  authUserController,
};
