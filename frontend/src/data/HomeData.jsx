export const location = [
  'Tất cả',
  'TP. Hồ Chí Minh',
  'Hà Nội',
  'Gò Vấp',
  'Quận 12',
  'Bình Thạnh',
  'Thủ Đức',
  'Tân Bình',
  'Thuận An',
  'Dĩ An',
  'Biên Hòa',
];

export const filters = [
  {
    label: 'Bộ lọc',
    icon: (
      <>
        <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3" />
        <path d="M2 14h4m4-6h4m4 4h4" />
      </>
    ),
  },
  {
    label: 'Ngân sách',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="15" rx="2" />
        <path d="M3 8h18m-5 5h2" />
      </>
    ),
  },
  {
    label: 'Mọi khu vực',
    dropdown: true,
    icon: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
  {
    label: 'Gần tôi',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      </>
    ),
  },
  {
    label: 'Mọi loại phòng',
    dropdown: true,
    icon: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z" />
        <path d="M9 21v-8h6v8" />
      </>
    ),
  },
  {
    label: 'Được yêu thích',
    icon: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
  },
  {
    label: 'Giá tốt',
    icon: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1" />
      </>
    ),
  },
];