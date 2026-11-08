
const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = 500; // Mặc định lỗi máy chủ

  const responseError = {
    success: false,
    statusCode: err.statusCode,
    message: err.message || "Có lỗi xảy ra trong máy chủ",
    stack: err.stack,
  };

  res.status(err.statusCode).json(responseError);
};

export default errorHandlingMiddleware;
