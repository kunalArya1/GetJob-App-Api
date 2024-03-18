import catchAsyncError from "../utils/catchAsyncError.js";

// Student Homepage
export const studHomepage = (req, res) => {
  res.send("Student Homepage");
};

// Student Sign Up
export const SignUp = catchAsyncError(async (req, res) => {
  res.send("Student Signed Up Successfully");
});

// Student Sign In
export const SignIn = catchAsyncError(async (req, res) => {
  res.send("Student Signed In Successfully");
});

// Student Sign Out
export const signOut = catchAsyncError(async (req, res) => {
  res.send("Student Signed Out Successfully");
});

// Student Forgot Password
export const forgotPassword = catchAsyncError(async (req, res) => {
  res.send("Student Forgot Password Successfully");
});

// Student Reset Password
export const resetPassword = catchAsyncError(async (req, res) => {
  res.send("Student Reset Password Successfully");
});
