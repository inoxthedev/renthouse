
const Loading = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#800000]/20 border-t-[#800000]" />

      <p className="mt-4 animate-pulse font-medium text-[#800000]">
        Đang tải dữ liệu...
      </p>
    </div>
  );
};

export default Loading;
