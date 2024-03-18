import catchAsyncError from "../utils/catchAsyncError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Student from "../models/Student.model.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
// Student Homepage
export const studHomepage = (req, res) => {
  res.send("Student Homepage");
};

// Student Sign Up
export const SignUp = catchAsyncError(async (req, res) => {
  console.log(req.body);
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { firstName, lastName, email, password } = req.body;
  console.log(req.body, req.file);

  // check if any field is empty or not provided
  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are Required");
  }

  // check if user already exists

  const userExists = await Student.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User Already Registred With This Email ID");
  }

  // check for avatar
  console.log(req.file.path);
  if (!req.file) {
    throw new ApiError(400, "Please Upload Avatar");
  }

  const localFilePath = req.file?.path;
  // upload avatar to cloudinary
  const uploadAvatar = await uploadToCloudinary(localFilePath);
  res.status(200).json(
    new ApiResponse(
      200,
      {
        body: req.body,
        file: req.file,
        url: uploadAvatar?.url,
      },
      "Student Signed Up Successfully"
    )
  );
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
