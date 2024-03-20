import catchAsyncError from "../utils/catchAsyncError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Employe from "../models/Employe.model.js";
import { uploadToCloudinary } from "../utils/Cloudinary.js";
import { sendMail } from "../utils/Nodemailer.js";

// Employe Homepage
export const Homepage = (req, res) => {
  res.send("Secure Homepage for Employe");
};

// Employe Details
export const EmployeDetails = catchAsyncError(async (req, res) => {
  const employe = await Employe.findById(req.user.id).select("-password");
  res
    .status(200)
    .json(new ApiResponse(200, employe, "Employe data Fetched Successfully"));
});

// Employe Sign Up
export const SignUp = catchAsyncError(async (req, res) => {
  const { firstName, lastName, email, password, gender, contact } = req.body;
  // console.log(req.body, req.file);

  // check if any field is empty or not provided
  if (
    [firstName, lastName, email, password, contact].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All Fields are Required");
  }

  // check if user already exists
  const userExists = await Employe.findOne({ email });

  if (userExists) {
    throw new ApiError(400, "User Already Registred With This Email ID");
  }

  // check for avatar
  if (!req.file) {
    throw new ApiError(400, "Please Upload Avatar");
  }

  const localFilePath = req.file?.path;
  // upload avatar to cloudinary
  const uploadAvatar = await uploadToCloudinary(localFilePath);

  const createdEmploye = await Employe.create({
    firstName,
    lastName,
    email,
    password,
    contact,
    gender,
    avatar: uploadAvatar?.url,
  });

  const registredEmploye = await Employe.findById(createdEmploye._id).select(
    "-password"
  );

  if (!registredEmploye) {
    throw new ApiError(500, "Error While Creating Employe");
  }

  // console.log(registredEmploye);
  res
    .status(200)
    .json(
      new ApiResponse(200, registredEmploye, "Employe Signed Up Successfully")
    );
});

// Employe Sign In
export const SignIn = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required!");
  }

  const employe = await Employe.findOne({ email });

  // console.log(student);
  if (!employe) {
    throw new ApiError(401, "Employe with this email is not registred");
  }

  const isPasswordMatching = await employe.isPassportCorrect(password);

  // console.log(isPasswordMatching);

  if (!isPasswordMatching) {
    throw new ApiError(401, "Invalid Password! try again");
  }

  const accesstoken = await employe.generateAccessToken();

  const options = {
    secure: true,
    httpOnly: true,
  };

  res
    .status(200)
    .cookie("accessToken", accesstoken, options)
    .json(new ApiResponse(200, accesstoken, "Sign in SuccessFull"));
});
