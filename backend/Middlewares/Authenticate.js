import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "./ErrorHandler.js";
import jwt from "jsonwebtoken";

export const isUserAuthenticated = catchAsyncError(async (req, res, next) => {
  const userToken = req.cookies.UserToken;
  console.log(req.cookies);

  console.log(userToken);

  if (!userToken) {
    return next(
      new ErrorHandler(
        401,
        "Please login to access this resource unavailable token",
      ),
    );
  }
  const decode = jwt.verify(userToken, process.env.JWT_SCERET);
  if (!decode) {
    return next(
      new ErrorHandler(
        401,
        "Please login to access this resource invalid token",
      ),
    );
  }
  console.log("decode", decode);
  //             decode {
  //   id: '69df304274d881c29d662977',
  //   email: 'bhavesh@gmail.com',
  //   iat: 1776236501,
  //   exp: 1776841301
  // }
  req.user = decode;
  next();
});
