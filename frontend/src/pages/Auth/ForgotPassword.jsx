import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { forgotPasswordAPI } from '../../apis/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { handleShowToast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return handleShowToast('Vui lòng nhập email!', 'error');
    }
    setIsLoading(true);
    try {
      const res = await forgotPasswordAPI(email);
      if (res.success) {
        handleShowToast(res.message, 'success');
      } else {
        handleShowToast(res.message || 'Gửi yêu cầu thất bại!', 'error');
      }
    } catch (error) {
      handleShowToast(error.message || 'Không thể gửi yêu cầu. Vui lòng thử lại!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4 py-10">
      <section className="w-full max-w-sm">
        <div className="rounded-xl border border-gray-200 bg-gray-100/80 p-6 sm:p-7">
          <div className="mb-7 text-center">
            <h1 className="text-lg font-semibold text-gray-800">Quên mật khẩu</h1>
            <p className="mt-1 text-sm text-gray-500">Nhập email của bạn để khôi phục mật khẩu</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#800000] focus:ring-1 focus:ring-[#800000]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#800000] py-2.5 text-sm font-semibold text-white transition hover:bg-[#600000] disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </button>
          </form>

          {/* Back to Login */}
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

export default ForgotPassword;