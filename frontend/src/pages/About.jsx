const About = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Page title */}
      <section className="border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-5 py-3">
          <h1 className="text-sm font-medium text-gray-700">Giới thiệu</h1>
        </div>
      </section>

      {/* About banner */}
      <section className="bg-[#fffafa]">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-red-50 px-4 py-1.5 text-xs font-semibold text-[#800000]">
              VỀ CHÚNG TÔI
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
              Kết nối chủ nhà
              <span className="text-[#800000]"> - </span>
              Đồng hành khách hàng
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-600">
              RentPlus là nền tảng kết nối chủ nhà và khách thuê phòng trọ, căn hộ. Chúng tôi mang đến giải pháp tìm
              kiếm, đăng tin và quản lý thông tin thuê phòng nhanh chóng, tiện lợi và hiệu quả.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#800000]">RentPlus</span>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">Giải pháp thuê phòng hiện đại</h2>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              Với mong muốn đơn giản hóa quá trình tìm kiếm và cho thuê nhà, RentPlus xây dựng một nền tảng trực tuyến
              giúp kết nối người có nhu cầu thuê phòng với chủ nhà một cách nhanh chóng.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              Chúng tôi hướng đến việc tạo ra môi trường giao dịch minh bạch, thuận tiện, giúp khách thuê dễ dàng tìm
              được nơi ở phù hợp và hỗ trợ chủ nhà quản lý thông tin cho thuê hiệu quả hơn.
            </p>
          </div>

          <div className="rounded-xl border border-red-100 bg-[#fffafa] p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#800000] text-2xl font-bold text-white">
              R
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">RentPlus</h3>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              Đồng hành cùng bạn trên hành trình tìm kiếm không gian sống phù hợp.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="bg-[#fffafa]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Sứ mệnh và tầm nhìn</h2>
            <p className="mt-2 text-sm text-gray-500">Những giá trị RentPlus hướng đến</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-red-100 bg-white p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-[#800000]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2m0 14v2M3 12h2m14 0h2M5.64 5.64l1.42 1.42m9.88 9.88 1.42 1.42m0-12.72-1.42 1.42m-9.88 9.88-1.42 1.42M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-gray-900">Sứ mệnh</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Kết nối chủ nhà và khách thuê trên một nền tảng tiện lợi, minh bạch và đáng tin cậy. Giúp quá trình tìm
                kiếm và cho thuê phòng trở nên đơn giản hơn.
              </p>
            </div>

            <div className="rounded-xl border border-red-100 bg-white p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-50 text-[#800000]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12s3.5-6 9.75-6 9.75 6 9.75 6-3.5 6-9.75 6-9.75-6-9.75-6Z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-gray-900">Tầm nhìn</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                Trở thành nền tảng kết nối thuê và cho thuê bất động sản đáng tin cậy, mang lại trải nghiệm tốt hơn cho
                cả chủ nhà và khách thuê.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Giá trị cốt lõi</h2>
          <p className="mt-2 text-sm text-gray-500">Những giá trị tạo nên sự khác biệt của RentPlus</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              title: 'Minh bạch',
              description: 'Thông tin phòng thuê rõ ràng, hỗ trợ người dùng đưa ra lựa chọn phù hợp.',
            },
            {
              title: 'Tiện lợi',
              description: 'Đơn giản hóa quá trình tìm kiếm, đăng tin và quản lý thông tin thuê phòng.',
            },
            {
              title: 'Kết nối',
              description: 'Tạo cầu nối giữa chủ nhà và khách thuê, hướng đến trải nghiệm hiệu quả.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 p-6 transition hover:border-red-200 hover:shadow-sm"
            >
              <div className="mb-4 h-1 w-10 rounded-full bg-[#800000]" />

              <h3 className="text-base font-bold text-gray-900">{item.title}</h3>

              <p className="mt-3 text-sm leading-7 text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-xl bg-[#800000] px-6 py-10 text-center text-white md:px-12">
          <h2 className="text-xl font-bold md:text-2xl">Cùng RentPlus tìm kiếm không gian sống lý tưởng</h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-red-100">
            Chúng tôi luôn sẵn sàng đồng hành và hỗ trợ bạn trong quá trình tìm kiếm hoặc cho thuê phòng.
          </p>

          <a
            href="#"
            className="mt-6 inline-flex rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-[#800000] transition hover:bg-red-50"
          >
            Khám phá phòng cho thuê
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
