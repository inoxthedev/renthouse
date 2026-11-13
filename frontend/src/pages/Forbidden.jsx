import { Link } from 'react-router-dom';

const Forbidden = () => {
  return (
    <div className="mt-2 flex flex-col items-center">
      <h1 className="font-semibold">403 - Forbidden</h1>
      <p className="mt-1 text-sm">Bạn không có quyền truy cập.</p>
      <Link to="/" className="mt-3 rounded-md bg-[#800000] px-3 py-1.5 text-sm text-white hover:bg-[#600000]">
        Về trang chủ
      </Link>
    </div>
  );
};

export default Forbidden;
