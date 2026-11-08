
const slugify = (text) => {
  return String(text)
    .normalize("NFD")               // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "")// Loại bỏ dấu tiếng Việt
    .replace(/đ/g, "d")             // Chuyển đ thành d
    .replace(/Đ/g, "D")             // Chuyển Đ thành D
    .toLowerCase()                  // Chuyển thành chữ thường
    .trim()                         // Loại bỏ khoảng trắng đầu và cuối
    .replace(/[^a-z0-9\s-]/g, "")   // Loại bỏ ký tự đặc biệt
    .replace(/[\s_-]+/g, "-")       // Thay khoảng trắng và dấu gạch dưới bằng dấu gạch ngang
    .replace(/^-+|-+$/g, "");       // Loại bỏ dấu gạch ngang ở đầu và cuối
};

export default slugify;
//