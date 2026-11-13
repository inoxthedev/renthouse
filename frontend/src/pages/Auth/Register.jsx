import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerAPI } from '../../apis/auth';
import { useToast } from '../../hooks/useToast';

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      userName: Yup.string().trim().required('Vui lòng nhập tên người dùng').min(3, 'Tên người dùng phải có ít nhất 3 ký tự').max(50, 'Tên người dùng không được vượt quá 50 ký tự'),
      email: Yup.string().trim().email('Email không hợp lệ').required('Vui lòng nhập email'),
      password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
      confirmPassword: Yup.string().required('Vui lòng xác nhận mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
    }),

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const { fullName, email, password } = values;
        const response = await registerAPI(fullName.trim(), email.trim(), password);
        showToast(response.data.message || 'Đăng ký tài khoản thành công!', 'success');
        formik.resetForm();
        navigate('/login');
      } catch (error) {
        const message = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
        showToast(message, 'error');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-sm">
        <div className="rounded-xl border border-gray-200 bg-gray-100/80 p-6 sm:p-7">
          {/* Header */}
          <div className="mb-7 text-center">
            <h1 className="text-lg font-semibold text-gray-800">Đăng ký</h1>
            <p className="mt-1 text-sm text-gray-500">Tạo tài khoản để bắt đầu sử dụng</p>
          </div>

          {/* Register Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
                Họ và tên <span className="text-red-500">*</span>
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Nhập họ và tên"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
              />

              {formik.errors.fullName && formik.touched.fullName && <p className="mt-1 text-xs text-red-500">{formik.errors.fullName}</p>}
            </div>

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
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
              />

              {formik.errors.email && formik.touched.email && <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                Mật khẩu <span className="text-red-500">*</span>
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
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 transition hover:text-gray-600"
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

              {formik.errors.password && formik.touched.password && <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
                Xác nhận mật khẩu <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 transition hover:text-gray-600"
                  aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  {showConfirmPassword ? (
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

              {formik.errors.confirmPassword && formik.touched.confirmPassword && <p className="mt-1 text-xs text-red-500">{formik.errors.confirmPassword}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#800000] py-2.5 text-sm font-semibold text-white transition hover:bg-[#600000] focus:outline-none focus:ring-2 focus:ring-[#800000] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-5 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-semibold text-[#800000] hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-5 text-center text-xs text-gray-400">© 2026 Rent House. All rights reserved.</p>
      </section>
    </main>
  );
};

export default Register;
