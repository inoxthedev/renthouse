import { useState } from 'react';

const Home = () => {
  const [keyword, setKeyword] = useState('');
  const [activeLocation, setActiveLocation] = useState('Tất cả');

  const locations = ['Tất cả', 'TP. Hồ Chí Minh', 'Hà Nội', 'Gò Vấp', 'Quận 12', 'Bình Thạnh', 'Thủ Đức', 'Tân Bình', 'Thuận An', 'Dĩ An', 'Biên Hòa'];

  const filters = [
    { label: 'Bộ lọc', icon: 'sliders' },
    { label: 'Ngân sách', icon: 'wallet' },
    { label: 'Mọi khu vực', icon: 'map-pin', dropdown: true },
    { label: 'Gần tôi', icon: 'target' },
    { label: 'Mọi loại phòng', icon: 'home', dropdown: true },
    { label: 'Được yêu thích', icon: 'heart' },
    { label: 'Giá tốt', icon: 'tag' },
  ];

  const icons = {
    sliders: (
      <>
        <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3" />
        <path d="M2 14h4m4-6h4m4 4h4" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 8h18m-5 5h2" />
      </>
    ),
    'map-pin': (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
        <path d="M9 21v-8h6v8" />
      </>
    ),
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    tag: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    ),
  };

  return (
    <section className="relative isolate overflow-hidden bg-transparent">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(128,0,0,0.13)_0%,rgba(128,0,0,0.07)_45%,rgba(128,0,0,0.025)_75%,transparent_100%)]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:py-9">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl">
            Tìm phòng trọ dễ dàng –<span className="block text-[#800000]">An tâm lựa chọn, thoải mái sống</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Tìm kiếm phòng trọ phù hợp với ngân sách, khu vực và nhu cầu của bạn. Kết nối nhanh chóng với chủ trọ, tiết kiệm thời gian và chi phí.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Tìm kiếm:', keyword);
          }}
          className="glass mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-full p-1 shadow-[0_6px_24px_rgba(128,0,0,0.06)] transition focus-within:border-[#800000]/40 focus-within:shadow-[0_6px_24px_rgba(128,0,0,0.12)]">
          <svg className="ml-2.5 h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Nhập khu vực, tên đường hoặc mã phòng..."
            className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button type="submit" className="shrink-0 rounded-full bg-[#800000] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600000]">
            Tìm phòng
          </button>
        </form>

        {/* Filters */}
        <div
          className="
            mx-auto mt-3 flex max-w-5xl
            flex-nowrap justify-start gap-1.5
            overflow-x-auto overscroll-x-contain
            pb-1
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:justify-center sm:flex-wrap sm:overflow-visible sm:pb-0
          ">
          {filters.map((filter) => (
            <button
              key={filter.label}
              type="button"
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-white/60 bg-white/60 px-3 py-2 text-xs font-medium text-gray-700 backdrop-blur-lg transition hover:border-[#800000] hover:bg-red-50 hover:text-[#800000]">
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {icons[filter.icon]}
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

        {/* Locations */}
        <div
          className="
            mx-auto mt-3 flex max-w-5xl
            flex-nowrap items-center justify-start gap-1.5
            overflow-x-auto overscroll-x-contain
            pb-1
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:justify-center sm:flex-wrap sm:overflow-visible sm:pb-0
          ">
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-500">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {icons['map-pin']}
            </svg>
            Khu vực:
          </span>

          {locations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => setActiveLocation(location)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs transition ${
                activeLocation === location
                  ? 'border-[#800000] bg-[#800000] text-white'
                  : 'border-[#e8caca] bg-[#800000]/[0.035] text-gray-600 hover:border-[#800000] hover:text-[#800000]'
              }`}>
              {location}
            </button>
          ))}
        </div>

        <section className="mt-10">
          {/* Section heading */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="sh-ic is-fill"
                aria-hidden="true">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
              Phòng nổi bật
            </h2>

            <button type="button" className="flex items-center gap-1 text-xs font-semibold text-[#800000] transition hover:text-red-700">
              Xem tất cả
              <span>→</span>
            </button>
          </div>

          {/* Room grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-gray-100" />

                <div className="space-y-2 p-3">
                  <div className="h-3 w-3/4 rounded bg-gray-100" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                  <div className="h-4 w-2/5 rounded bg-red-100" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-9">
          {/* Section heading */}
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
              <svg className="h-5 w-5 shrink-0 text-[#800000]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {icons.heart}
              </svg>
              Được yêu thích nhiều nhất
            </h2>

            {/* Navigation */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Phòng trước"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#800000] hover:bg-red-50 hover:text-[#800000]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Phòng tiếp theo"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-[#800000] hover:bg-red-50 hover:text-[#800000]">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <button type="button" className="ml-1 flex items-center gap-1 text-xs font-semibold text-[#800000] transition hover:text-red-700">
                Xem tất cả
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Room grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-gray-100" />

                <div className="space-y-2 p-3">
                  <div className="h-3 w-3/4 rounded bg-gray-100" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                  <div className="h-4 w-2/5 rounded bg-red-100" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
