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

    Cookies.set(
      'user',
      JSON.stringify({
        name: user.name,
        email: user.email,
      }),
      { path: '/' },
    );

    setInfo(user);

    if (user.role) {
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
      setIsLoading(true);

      try {
        const { data } = await loginAPI(values.email, values.password);

        handleLoginSuccess(data.user, data.accessToken, data.refreshToken);

        handleShowToast('Đăng nhập thành công!', 'success');
      } catch (error) {
        handleShowToast(error.message || 'Đăng nhập thất bại!', 'error');
      } finally {
        setIsLoading(false);
      }
    },
  });

  // const handleGoogleSuccess = async (credentialResponse) => {
  //   try {
  //     const res = await oAuthGoogleApi(credentialResponse.credential);

  //     if (res.success) {
  //       handleLoginSuccess(res.data.user, res.data.accessToken, res.data.refreshToken);

  //       handleShowToast(res.message, 'success');
  //     }
  //   } catch (error) {
  //     handleShowToast(error.message || 'Đăng nhập Google thất bại!', 'error');
  //   }
  // };

  const inputClass = (field) => `
    w-full rounded-lg border px-3 py-2.5
    text-sm outline-none transition
    ${
      formik.touched[field] && formik.errors[field]
        ? 'border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-gray-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10'
    }
  `;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Logo */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#800000]">RENT HOUSE</h1>

          <p className="mt-1 text-sm text-gray-500">Chào mừng bạn quay trở lại!</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Nhập email của bạn"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={inputClass('email')}
          />

          {formik.touched.email && formik.errors.email && <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
            Mật khẩu
          </label>

          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${inputClass('password')} pr-12`}
            />

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-[#800000]">
              {showPassword ? 'Ẩn' : 'Hiện'}
            </button>
          </div>

          {formik.touched.password && formik.errors.password && <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>}
        </div>

        {/* Forgot password */}
        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-xs font-medium text-[#800000] hover:underline">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-[#800000] py-2.5 text-sm font-semibold text-white transition hover:bg-[#680000] disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
        </button>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">Hoặc tiếp tục với</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Google Login
        <div className="flex justify-center">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => handleShowToast('Đăng nhập Google thất bại!', 'error')} width="320" />
        </div> */}

        {/* Register */}
        <p className="mt-5 text-center text-sm text-gray-500">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-semibold text-[#800000] hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
