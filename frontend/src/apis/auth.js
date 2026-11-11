import instance from '../utils/http';

const registerAPI = (userName, email, password) => {
  return instance.post('/auth/register', {
    userName,
    email,
    password,
  });
};

const loginAPI = (email, password) => {
  return instance.post('/auth/login', {
    email,
    password,
  });
};

const logoutAPI = () => {
  return instance.post('/auth/logout');
};

const refreshTokenAPI = (refreshToken) => {
  return instance.post('/auth/refresh-token', {
    refreshToken,
  });
};

const authUserAPI = () => {
  return instance.get('/auth/me');
};

const changePasswordAPI = (oldPassword, newPassword) => {
  return instance.post('/auth/change-password', {
    oldPassword,
    newPassword,
  });
};

const forgotPasswordAPI = (email) => {
  return instance.post('/auth/forgot-password', {
    email,
  });
};

const resetPasswordAPI = (token, password) => {
  return instance.post('/auth/reset-password', {
    token,
    password,
  });
};

export {
  registerAPI,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
  authUserAPI,
  changePasswordAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
};