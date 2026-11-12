import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('VI');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-1">
          <img src="/images/logo.jpg" alt="Logo" className="h-16 w-16 object-contain" />
          <span className="text-xl font-extrabold tracking-tight text-[#800000]">RentPlus</span>
        </NavLink>

        {/* Navigation */}
        <nav
          className={`${
            isOpen ? 'flex' : 'hidden'
          } absolute left-0 top-16 w-full flex-col gap-1 border-b border-gray-100 bg-white/95 p-4 backdrop-blur-xl md:static md:flex md:w-auto md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none`}>
          <NavLink to="/" end onClick={() => setIsOpen(false)} className="px-2 py-2 text-sm font-medium text-black transition-colors hover:text-[#800000]">
            Trang chủ
          </NavLink>

          <NavLink to="#" onClick={() => setIsOpen(false)} className="px-2 py-2 text-sm font-medium text-black transition-colors hover:text-[#800000]">
            Tìm phòng
          </NavLink>

          <NavLink to="#" onClick={() => setIsOpen(false)} className="px-2 py-2 text-sm font-medium text-black transition-colors hover:text-[#800000]">
            Đăng tin
          </NavLink>

          <NavLink to="/about" onClick={() => setIsOpen(false)} className="px-2 py-2 text-sm font-medium text-black transition-colors hover:text-[#800000]">
            Giới thiệu
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:text-[#800000]"
              aria-label="Chọn ngôn ngữ"
              aria-expanded={isLanguageOpen}>
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M3 12H21M12 3C14.5 5.5 15.5 8.5 15.5 12C15.5 15.5 14.5 18.5 12 21C9.5 18.5 8.5 15.5 8.5 12C8.5 8.5 9.5 5.5 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>

              {language}

              <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Language Dropdown */}
            {isLanguageOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('VI');
                    setIsLanguageOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-gray-50 ${
                    language === 'VI' ? 'font-semibold text-[#800000]' : 'text-gray-600'
                  }`}>
                  Tiếng Việt
                  {language === 'VI' && <span>✓</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLanguage('EN');
                    setIsLanguageOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition hover:bg-gray-50 ${
                    language === 'EN' ? 'font-semibold text-[#800000]' : 'text-gray-600'
                  }`}>
                  English
                  {language === 'EN' && <span>✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* Favorite */}
          <NavLink
            to="/"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-[#800000] hover:text-[#800000]"
            aria-label="Yêu thích">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>

          {/* Login */}
          <NavLink
            to="/login"
            className="rounded-full bg-[#800000] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#600000] hover:shadow-md active:scale-95">
            Đăng nhập
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-lg border border-gray-200 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}>
          <span className="h-0.5 w-5 rounded bg-gray-700" />
          <span className="h-0.5 w-5 rounded bg-gray-700" />
          <span className="h-0.5 w-5 rounded bg-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
