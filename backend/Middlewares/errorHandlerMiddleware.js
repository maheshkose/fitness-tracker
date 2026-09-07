const errorHandler = (err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // 🔴 MongoDB duplicate key error
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = `Duplicate field value entered for ${Object.keys(err.keyValue)}. Please use another value!`;
  }

  // 🔴 Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Resource not found. Invalid: ${err.path}`;
  }

  // 🔴 Mongoose Validation Error
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // 🔴 JWT Errors
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Token expired";
  }

  console.log(err);
  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(", ")
    : err.message;

  // Response
  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage
  });
};

export default errorHandler;
