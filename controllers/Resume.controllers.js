import Student from "../models/Student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import { v4 as uuidv4 } from "uuid";

export const homePage = catchAsyncError(async (req, res, next) => {
  res.send("Resume HomePage");
});

{
  /** ----------------------------Eduacation Details-------------------------- */
}

export const addEducation = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.education.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json(new ApiResponse(200, req.body, "Education Added!"));
});

export const editEduaction = catchAsyncError(async (req, res, next) => {
  const student = await student.findById(req.user.id).select("-password");
  const eduIndex = student.resmue.education.findIndex(
    (i) => i.id === req.params.eduid
  );

  student.resmue.education[eduIndex] = {
    ...student.resmue.education[eduIndex],
    ...req.body,
  };
  await student.save();
  res.status(200).json(new ApiResponse(200, req.body, "Education Updated!"));
});

export const deleteEducation = catchAsyncError(async (req, res, next) => {
  res.send("Education Deleted");
});
