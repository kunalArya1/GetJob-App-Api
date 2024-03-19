import catchAsyncError from "../utils/catchAsyncError.js";

export const homePage = catchAsyncError(async (req, res, next) => {
  res.send("Resume HomePage");
});
