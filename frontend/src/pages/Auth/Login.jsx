import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { loginAPI } from '../../apis/auth';
import { useToast } from '../../hooks/useToast';
import { useInfo } from '../../hooks/useInfo';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleShowToast } = useToast();
  const { setInfo } = useInfo();

  const handleLoginSuccess = (user, accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, { path: '/' });
    Cookies.set('refresh_token', refreshToken, { path: '/' });

    Cookies.set('user',
      JSON.stringify({
        userName: user.userName,
        email: user.email,
        role: user.role,
      }),
      { path: '/' },
    );
    setInfo(user);
    handleShowToast('Đăng nhập thành công!', 'success');

    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string().email('Email không đúng định dạng').required('Vui lòng nhập email'),
      password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 ký tự').max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
    }),

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { data } = await loginAPI(values.email.trim(), values.password);
        handleLoginSuccess(data.user, data.accessToken, data.refreshToken);
      } catch (error) {
        handleShowToast(error.response?.data?.message || 'Đăng nhập thất bại!', 'error');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-sm">
        <div className="rounded-xl border border-gray-200 bg-gray-100/80 p-6 sm:p-7">
          <div className="mb-7 text-center">
            <h1 className="text-lg font-semibold text-gray-800">Đăng nhập</h1>
            <p className="mt-1 text-sm text-gray-500">Chào mừng bạn quay trở lại!</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm outline-none focus:border-[#800000] ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {formik.touched.email && formik.errors.email && <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>}
            </div>
            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <Link to="/forgot-password" className="text-xs font-medium text-[#800000] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full rounded-md border bg-white px-3 py-2.5 pr-11 text-sm outline-none focus:border-[#800000] ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                      <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 9 5 9 7s-1.5 3.5-3.5 5" />
                      <path d="M6.2 6.2C3.6 7.7 2 10.1 2 12c0 2 4 7 10 7 1 0 2-.2 2.9-.5" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#800000] py-2.5 text-sm font-semibold text-white transition hover:bg-[#600000] disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-[#800000] hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
        <p className="mt-5 text-center text-xs text-gray-400">© 2026 Rent House. All rights reserved.</p>
      </section>
    </main>
  );
};

export default Login;
