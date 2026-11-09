FROM node:20-alpine

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Port mặc định của Vite
EXPOSE 5173

# Chạy Vite dev server (thêm flag --host để cho phép truy cập từ bên ngoài container)
CMD ["npm", "run", "dev", "--", "--host"]
