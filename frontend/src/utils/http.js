import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshTokenAPI } from '../apis/clients/auth';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động gắn Access Token vào header
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Xử lý response và tự động refresh token khi hết hạn
instance.interceptors.response.use(
  (response) => response?.data ?? response,
  async (error) => {
    const originalRequest = error.config;

    // Chỉ xử lý refresh khi: lỗi 401 + chưa retry + có refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refresh_token');
      if (refreshToken) {
        try {
          const res = await refreshTokenAPI(refreshToken);

          if (res?.data?.accessToken) {
            Cookies.set('access_token', res.data.accessToken);
            originalRequest.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
        }
      }

      // Refresh thất bại hoặc không có refresh token → Đăng xuất
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Xử lý các lỗi khác
    if (error.response) {
      const message = error.response.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error('Không có phản hồi từ server'));
    }

    return Promise.reject(new Error(error.message));
  }
);

export default instance;