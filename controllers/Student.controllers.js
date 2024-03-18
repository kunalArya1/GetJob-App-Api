import catchAsyncError from "../utils/catchAsyncError.js";

export const studHomepage = (req, res) => {
  res.send("Student Homepage");
};

export const SignUp = catchAsyncError(async (req, res) => {
  res.send("Student Signed Up Successfully");
});

export const SignIn = catchAsyncError(async (req, res) => {
  res.send("Student Signed In Successfully");
});

export const signOut = catchAsyncError(async (req, res) => {
  res.send("Student Signed Out Successfully");
});

export const forgotPassword = catchAsyncError(async (req, res) => {
  res.send("Student Forgot Password Successfully");
});

export const resetPassword = catchAsyncError(async (req, res) => {
  res.send("Student Reset Password Successfully");
});
