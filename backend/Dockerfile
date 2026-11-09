# Sử dụng image Node.js LTS bản Alpine (nhẹ và tối ưu dung lượng)
FROM node:20-alpine

# Thiết lập thư mục làm việc bên trong container
WORKDIR /app

# Copy các file quản lý thư viện vào trước để tận dụng Docker cache
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn của dự án vào container
COPY . .

# Mở cổng 5000 (cổng ứng dụng cấu hình trong .env)
EXPOSE 5000

# Lệnh khởi chạy server (chạy trực tiếp server.js với Node.js ESM)
CMD ["node", "server.js"]

