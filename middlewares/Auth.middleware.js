import { ApiError } from "../utils/ApiError.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";

const isLoggoedIn = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    throw new ApiError(401, "Token is not valid or Expired");
  }

  const user = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;
  next();
});

export { isLoggoedIn };
