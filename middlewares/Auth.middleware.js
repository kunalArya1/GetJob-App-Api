import { ApiError } from "../utils/ApiError.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import jwt from "jsonwebtoken";

const isLoggoedIn = catchAsyncError(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new ApiError(
      401,
      "Please SignIn to access the resourse or token is expired"
    );
  }

  const user = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = user;
  next();
});

export { isLoggoedIn };
