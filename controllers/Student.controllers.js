import catchAsyncError from "../utils/catchAsyncError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Student from "../models/Student.model.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
import { sendMail } from "../utils/Nodemailer.js";
// Student Homepage
export const Homepage = (req, res) => {
  res.send("Secure Homepage");
};

export const StudentDetails = catchAsyncError(async (req, res) => {
  const student = await Student.findById(req.user.id).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, student, "Student data Fetched Successfully"));
});
// Student Sign Up
export const SignUp = catchAsyncError(async (req, res) => {
  // console.log(req.body);
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
  // console.log(req.body, req.file);

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
  // console.log(req.file);
  if (!req.file) {
    throw new ApiError(400, "Please Upload Avatar");
  }

  const localFilePath = req.file?.path;
  // upload avatar to cloudinary
  const uploadAvatar = await uploadToCloudinary(localFilePath);

  const createdStudent = await Student.create({
    firstName,
    lastName,
    email,
    password,
    avatar: uploadAvatar?.url,
  });

  const registredStudent = await Student.findById(createdStudent._id).select(
    "-password"
  );

  if (!registredStudent) {
    throw new ApiError(500, "Error While Creating Student");
  }

  // console.log(registredStudent);
  res
    .status(200)
    .json(
      new ApiResponse(200, registredStudent, "Student Signed Up Successfully")
    );
});

// Student Sign In
export const SignIn = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required!");
  }

  const student = await Student.findOne({ email });

  if (!student) {
    throw new ApiError(401, "Student with this email is not registred");
  }

  const isPasswordMatching = student.isPassportCorrect(password);

  if (!isPasswordMatching) {
    throw new ApiError(401, "Invalid Password! try again");
  }

  const accesstoken = await student.generateAccessToken();

  const options = {
    secure: true,
    httpOnly: true,
    exipres: "2d",
  };

  res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .json(new ApiResponse(200, accesstoken, "Sign in SuccessFull"));
});

// Student Sign Out
export const signOut = catchAsyncError(async (req, res) => {
  const user = req.user;
  console.log(user);
  res.json(new ApiResponse(200, user, "SignOut Success"));
});

// Student Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  // Get user Emial from Body
  const { email } = req.body;
  // console.log(email);

  const student = await Student.findOne({ email });

  // Check the given email is registered with your App or not
  if (!student) {
    throw new ApiError(
      401,
      "Invalid Email! Please try with your correct Email"
    );
  }

  // Create a url where user change their password
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/student/forgot-password-link/${student._id}`;

  // console.log(url);
  // send the link to user email
  sendMail(url, req, res, next);

  res.status(200).json(new ApiResponse(200, url, "Email has been sent"));
});

// Student Forgot Passsword Link
export const forgotPasswordLink = catchAsyncError(async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const student = await Student.findById(id);
  // console.log(student);
  if (!student) {
    throw new ApiError(401, "Invalid Link ! Try again with correct Link");
  }
  console.log(req.body.password, student.password);
  student.password = req.body.password;
  await student.save();

  console.log(student.password);

  res
    .status(200)

    .json(
      new ApiResponse(200, {}, "Password Changed SuccessFully! Do Remember..")
    );
});

// Student Reset Password
export const resetPassword = catchAsyncError(async (req, res) => {
  res.send("Student Reset Password Successfully");
});
