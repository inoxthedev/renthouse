import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f2] p-4">
      {/* Main Card */}
      <div
        className="
          grid h-auto w-full max-w-[960px]
          grid-cols-1 overflow-hidden
          rounded-2xl border border-gray-100
          bg-white shadow-lg
          md:h-[min(560px,calc(100svh-32px))]
          md:grid-cols-2
        "
      >
        {/* Left: Login Form */}
        <div
          className="
            flex flex-col justify-center
            px-7 py-8
            sm:px-10
            md:px-9 md:py-7
            lg:px-11
          "
        >
          {/* Heading */}
          <div className="mb-6">
            <h1 className="mb-1 text-2xl font-bold text-gray-900">Đăng nhập</h1>
            <p className="text-sm text-gray-500">Chào mừng bạn quay trở lại với Rent House.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email"
                required
                className="
                  h-11 w-full rounded-lg
                  border border-gray-200
                  px-3.5 text-sm outline-none
                  transition
                  focus:border-[#800000]
                  focus:ring-2 focus:ring-[#800000]/10
                "
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Mật khẩu</label>

                <Link to="/forgot-password" className="text-xs font-medium text-[#800000] hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
                  className="
                    h-11 w-full rounded-lg
                    border border-gray-200
                    px-3.5 pr-12 text-sm outline-none
                    transition
                    focus:border-[#800000]
                    focus:ring-2 focus:ring-[#800000]/10
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-3.5 top-1/2
                    -translate-y-1/2 text-gray-400
                  "
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                      <path d="M16.68 16.68A10.94 10.94 0 0 1 12 17.5c-5 0-8.27-3.11-10-5.5a12.5 12.5 0 0 1 4.17-3.83" />
                      <path d="M9.9 5.24A10.93 10.93 0 0 1 12 5c5 0 8.27 3.11 10 5.5a12.5 12.5 0 0 1-2.17 2.83" />
                      <path d="m2 2 20 20" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3.64-7 10-7 10 7 10 7-3.64 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Login */}
            <div>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="h-4 w-4 accent-[#800000]" />
                Ghi nhớ đăng nhập
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                h-11 w-full rounded-lg
                bg-[#800000]
                text-sm font-semibold text-white
                transition hover:bg-[#680000]
              "
            >
              Đăng nhập
            </button>

            {/* Google Login */}
            <button
              type="button"
              className="
                flex h-11 w-full items-center justify-center gap-2.5
                rounded-lg border border-gray-200
                text-sm font-semibold text-gray-700
                transition hover:bg-gray-50
              "
            >
              <svg viewBox="0 0 48 48" className="h-5 w-5">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.72 7.18l7.28 5.65c4.25-3.92 7.48-9.72 7.48-17.3z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.9 23.9 0 0 0 0 21.56l7.98-6.19z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.79l-7.28-5.65c-2.02 1.35-4.6 2.15-8.62 2.15-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              Đăng nhập bằng Google
            </button>
          </form>

          {/* Register */}
          <p className="mt-5 text-center text-sm text-gray-500">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-semibold text-[#800000] hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Right: Introduction */}
        <div
          className="
            relative hidden flex-col justify-center
            overflow-hidden bg-[#211d1d]
            px-8 py-7 text-white
            md:flex
            lg:px-9
          "
        >
          {/* Background Decoration */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#800000]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#a52a2a]/20 blur-3xl" />

          <div className="relative z-10">
            {/* Brand */}
            <span
              className="
                mb-5 inline-block rounded-full
                bg-white/10 px-3 py-1
                text-xs font-medium text-white/80
              "
            >
              RENT HOUSE
            </span>

            {/* Introduction Heading */}
            <h2 className="mb-3 text-xl font-bold leading-snug lg:text-2xl">
              Tìm kiếm phòng trọ phù hợp,
              <br />
              dễ dàng và nhanh chóng
            </h2>

            <p className="mb-7 text-sm leading-6 text-gray-300">
              Khám phá hàng ngàn phòng trọ chất lượng và kết nối trực tiếp với chủ trọ ngay trên Rent House.
            </p>

            {/* Feature 1 */}
            <div className="mb-5">
              <h3 className="mb-1 text-sm font-semibold">- Tìm kiếm phòng trọ</h3>
              <p className="text-xs leading-5 text-gray-300">
                Dễ dàng tìm phòng theo khu vực, giá thuê và nhu cầu của bạn.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="mb-5">
              <h3 className="mb-1 text-sm font-semibold">- Lưu phòng yêu thích</h3>
              <p className="text-xs leading-5 text-gray-300">
                Lưu lại những phòng phù hợp để dễ dàng xem lại và so sánh.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="mb-1 text-sm font-semibold">- Kết nối trực tiếp</h3>
              <p className="text-xs leading-5 text-gray-300">
                Liên hệ với chủ trọ để trao đổi thông tin và đặt lịch xem phòng.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-white/15 pt-4">
              <p className="text-xs text-gray-300">
                Bắt đầu hành trình tìm phòng của bạn cùng <span className="font-semibold text-white">Rent House.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;