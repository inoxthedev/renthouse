
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#f0dada] bg-[#fffafa]">
      <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] lg:gap-8">

          {/* Brand */}
          <div>
            <a href="#" className="mb-4 flex w-fit items-center gap-2">
              <img
                src="/images/logo.jpg"
                alt="RentPlus"
                className="h-12 w-12 object-contain"
              />
              <span className="text-2xl font-extrabold tracking-tight text-[#800000]">
                RentPlus
              </span>
            </a>

            <h3 className="mb-3 text-base font-medium text-gray-700">
              Kết Nối Chủ Nhà - Đồng Hành Khách Hàng
            </h3>

            <p className="max-w-[340px] text-sm leading-6 text-gray-500">
              Nền tảng kết nối chủ nhà và khách thuê phòng trọ,
              căn hộ. Hỗ trợ tìm kiếm, đăng tin và quản lý
              thông tin thuê phòng nhanh chóng, tiện lợi.
            </p>

            {/* Social Media */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eaea] text-gray-700 transition hover:bg-[#800000] hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8h3.4Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eaea] text-gray-700 transition hover:bg-[#800000] hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M19.6 8.1a7 7 0 0 1-4.2-1.4v8.1a5.8 5.8 0 1 1-5-5.7v3.2a2.7 2.7 0 1 0 1.9 2.6V2.5h3.1c.1 2.4 1.9 4.3 4.2 4.5v3.1Z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8eaea] text-gray-700 transition hover:bg-[#800000] hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                  <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="border-l border-[#f0dada] pl-6">
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Công ty
              <span className="mt-3 block h-1 w-7 rounded-full bg-[#800000]" />
            </h3>

            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Về RentPlus</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Hợp tác</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Tuyển dụng</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Tin tức & Cẩm nang</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Tenant */}
          <div className="border-l border-[#f0dada] pl-6">
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Khách thuê
              <span className="mt-3 block h-1 w-7 rounded-full bg-[#800000]" />
            </h3>

            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Tìm phòng cho thuê</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Phòng yêu thích</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Phòng đã thuê</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Báo tin sai lệch</a></li>
            </ul>
          </div>

          {/* Landlord */}
          <div className="border-l border-[#f0dada] pl-6">
            <h3 className="mb-6 text-lg font-bold text-gray-900">
              Môi giới & Chủ nhà
              <span className="mt-3 block h-1 w-7 rounded-full bg-[#800000]" />
            </h3>

            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Chủ nhà ký gửi phòng</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Đăng ký cộng tác viên</a></li>
              <li><a href="#" className="text-sm text-gray-600 transition hover:text-[#800000]">Đăng nhập</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#f0dada]">
        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-gray-800">
              DỊCH VỤ KẾT NỐI & TÌM PHÒNG
              <span className="font-normal text-gray-500">
                {' '}· RENTPLUS COMPANY LIMITED
              </span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Địa chỉ: Số 143 đường Nguyễn Lương Bằng, Phường Liên Chiểu, Thành Phố Đà Nẵng, Việt Nam
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Điện thoại: 0905123456 - Email: contact@rentplus.gmail.com
            </p>
          </div>

          <div className="border-t border-[#f0dada] pt-4 text-sm text-gray-500 md:border-l md:border-t-0 md:py-2 md:pl-8 md:text-right">
            <p>© {currentYear} RentPlus. Bảo lưu mọi quyền.</p>
            <a href="#" className="mt-2 inline-block underline underline-offset-4 transition hover:text-[#800000]">
              Thỏa thuận sử dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
