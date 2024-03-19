import Student from "../models/Student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import catchAsyncError from "../utils/catchAsyncError.js";
import { v4 as uuidv4 } from "uuid";

export const homePage = catchAsyncError(async (req, res, next) => {
  res.send("Resume HomePage");
});

{
  /** ----------------------------Eduacation EndPoint-------------------------- */
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
  const student = await Student.findById(req.user.id).select("-password");
  const filteredEdu = student.resmue.education.filter(
    (i) => i.id !== req.params.eduid
  );
  student.resmue.education = filteredEdu;
  await student.save();

  res.status(200).json(new ApiResponse(200, {}, "Education Deleted!"));
});

{
  /** ----------------------------Job  EndPoint-------------------------- */
}

export const addjob = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  student.resmue.jobs.push({ ...req.body, id: uuidv4() });
  await student.save();
  res.status(200).json(new ApiResponse(200, req.body, "Job Added!"));
});

export const editjob = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const jobIndex = student.resmue.jobs.findIndex(
    (i) => i.id === req.params.jobid
  );

  student.resmue.jobs[jobIndex] = {
    ...student.resmue.jobs[jobIndex],
    ...req.body,
  };

  await student.save();
  res.status(200).json(new ApiResponse(200, req.body, "Job Updated!"));
});

export const deletejob = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const filteredJob = student.resume.jobs.filter(
    (i) => i.id !== req.params.jobid
  );

  student.resmue.jobs = filteredJob;
  await student.save();
  res.status(200).json(new ApiResponse(200, {}, "Job Removed!"));
});

{
  /** ----------------------------InternShip EndPoint-------------------------- */
}

export const addinternship = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.internships.push({ ...req.body, id: uuidv4() });
  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Internship added!"));
});

export const editinternship = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  const internshipIndex = student.resmue.internships.findIndex(
    (i) => i.id === req.params.internid
  );

  student.resmue.internships[internshipIndex] = {
    ...student.resume.internships[internshipIndex],
    ...req.body,
  };

  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Internship updated!"));
});

export const deleteinternship = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const filteredIntership = student.resmue.internships.filter(
    (i) => i.id !== req.params.internid
  );

  student.resmue.internships = filteredIntership;
  await student.save();

  res.status(200).json(new ApiResponse(200, {}, " Internship Removed!"));
});
