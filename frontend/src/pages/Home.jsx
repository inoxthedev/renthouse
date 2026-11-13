import { useState } from 'react';
import { location, filters } from '../data/HomeData';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [activeLocation, setActiveLocation] = useState('');

  return (
    <main className="min-h-screen">
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_50%,rgba(128,0,0,0.13)_0%,rgba(128,0,0,0.07)_45%,rgba(128,0,0,0.025)_75%,transparent_100%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-7 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
              Tìm phòng trọ dễ dàng –<span className="block text-[#800000]">An tâm lựa chọn, thoải mái sống</span>
            </h1>
            <p className="mx-auto mt-2.5 max-w-xl text-sm leading-relaxed text-gray-500">
              Tìm kiếm phòng trọ phù hợp với ngân sách, khu vực và nhu cầu của bạn. Kết nối nhanh chóng với chủ trọ, tiết kiệm thời gian và chi phí.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Tìm kiếm:', keyword);
            }}
            className="glass mx-auto mt-5 flex max-w-xl items-center gap-2 rounded-full p-1 shadow-[0_6px_24px_rgba(128,0,0,0.06)] transition focus-within:border-[#800000]/40 focus-within:shadow-[0_6px_24px_rgba(128,0,0,0.12)]">
            <svg className="ml-2.5 h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập khu vực, tên đường hoặc mã phòng..."
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
            <button type="submit" className="shrink-0 rounded-full bg-[#800000] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#600000]">
              Tìm phòng
            </button>
          </form>

          <div className="mx-auto mt-3 flex flex-nowrap justify-start gap-1.5 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            {filters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/60 bg-white/60 px-2.5 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-lg transition hover:border-[#800000] hover:bg-red-50 hover:text-[#800000]">
                <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {filter.icon}
                </svg>
                {filter.label}
                {filter.dropdown && (
                  <svg className="h-3 w-3 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-2.5 flex flex-nowrap items-center justify-start gap-1.5 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
            <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-500">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Khu vực:
            </span>
            {location.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveLocation(item)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs transition ${activeLocation === item
                    ? 'border-[#800000] bg-[#800000] text-white'
                    : 'border-[#e8caca] bg-[#800000]/[0.035] text-gray-600 hover:border-[#800000] hover:text-[#800000]'
                }`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;