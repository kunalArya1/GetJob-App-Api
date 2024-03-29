import catchAsyncError from "../utils/catchAsyncError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import Employe from "../models/Employe.model.js";
import Internship from "../models/Internship.models.js";
import Job from "../models/job.models.js";
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

// Employe Sign Out
export const signOut = catchAsyncError(async (req, res) => {
  res.clearCookie("accessToken");
  const user = req.user;
  res.json(new ApiResponse(200, user, "SignOut Success"));
});

// Employe Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  // Get user Emial from Body
  const { email } = req.body;
  // console.log(email);

  const employe = await Employe.findOne({ email });

  // Check the given email is registered with your App or not
  if (!employe) {
    throw new ApiError(
      401,
      "Invalid Email! Please try with your correct Email"
    );
  }

  // Create a url where user change their password
  const url = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/student/forgot-password-link/${employe._id}`;

  // console.log(url);
  // send the link to user email
  sendMail(url, req, res, next);
  employe.resetPawwordToken = "1";
  await employe.save();

  res.status(200).json(new ApiResponse(200, url, "Email has been sent"));
});

// Employe Forgot Passsword Link
export const forgotPasswordLink = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;
  //   console.log(id);

  const employe = await Employe.findById(id);
  // console.log(student);
  if (!employe) {
    throw new ApiError(401, "Invalid Link ! Try again with correct Link");
  }
  //   console.log(req.body.password, employe.password);

  if (employe.resetPawwordToken == "1") {
    employe.resetPawwordToken = "0";
    employe.password = req.body.password;
    await employe.save();
  } else {
    return next(new ApiError(500, "Invalid Forgot Passsword Link"));
  }

  //   console.log(employe.password);

  res
    .status(200)

    .json(
      new ApiResponse(200, {}, "Password Changed SuccessFully! Do Remember..")
    );
});

// Employe Reset Password
export const resetPassword = catchAsyncError(async (req, res) => {
  //   console.log(req.user);
  const employe = await Employe.findById(req.user.id);

  employe.password = req.body.password;
  await employe.save();

  const accessToken = await employe.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, accessToken, "Password reset Successfully!"));
});

{
  /* <------------------Internship EndPoint----------------------> */
}

// Employe Add Internship

export const addInternship = catchAsyncError(async (req, res) => {
  const employe = await Employe.findById(req.user.id);

  const intership = await Internship.create(req.body);

  employe.internships.push(intership._id);
  intership.employe = employe._id;
  await employe.save();
  await intership.save();

  res
    .status(200)
    .json(new ApiResponse(200, intership, "Internship Added Successfully"));
});
// Get All Employee's Internships

export const readInternship = catchAsyncError(async (req, res) => {
  const { internships } = await Employe.findById(req.user.id).populate(
    "internships"
  );

  if (!internships) {
    throw new ApiError(404, "No Internships Found");
  }
  res
    .status(200)
    .json(
      new ApiResponse(200, internships, "Internships Fetched Successfully")
    );
});

// Get Single Internship by ID from all employee's internships
export const readsingleInternship = catchAsyncError(async (req, res) => {
  const internship = await Internship.findById(req.params.internshipid);

  if (!internship) {
    throw new ApiError(404, "Internship Not Found with this id");
  }

  res.status(200).json(new ApiResponse(200, internship, "Internship Fetched"));
});

{
  /* <------------------Job EndPoint----------------------> */
}

export const addJob = catchAsyncError(async (req, res) => {
  const employe = await Employe.findById(req.user.id);

  const job = await Job.create(req.body);

  employe.jobs.push(job._id);
  job.employe = employe._id;
  await job.save();
  await employe.save();

  res.status(201).json(new ApiResponse(201, job, "Job Added Successfully"));
});

export const readJob = catchAsyncError(async (req, res) => {
  const { jobs } = await Employe.findById(req.user.id).populate("jobs");

  if (!jobs) {
    throw new ApiError(404, "No Jobs Found");
  }

  res.status(200).json(new ApiResponse(200, jobs, "Jobs Fetched Successfully"));
});

export const readSingleJob = catchAsyncError(async (req, res) => {
  const job = await Job.findById(req.params.jobid);

  if (!job) {
    throw new ApiError(404, "Job Not Found with this id");
  }

  res.status(200).json(new ApiResponse(200, job, "Job Fetched"));
});
