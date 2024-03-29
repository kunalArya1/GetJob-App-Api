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

  console.log(req.body);
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

{
  /** ----------------------Responsibilities EndPoint--------------------- */
}

export const addresponsibilities = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.responsibilities.push({ ...req.body, id: uuidv4() });
  await student.save();

  res
    .status(200)
    .json(new ApiResponse(200, req.body, " responsibilities added!"));
});

export const editresponsibilities = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  const responsibilitiesIndex = student.resmue.responsibilities.findIndex(
    (i) => i.id === req.params.resid
  );

  student.resmue.responsibilities[responsibilitiesIndex] = {
    ...student.resume.responsibilities[responsibilitiesIndex],
    ...req.body,
  };

  await student.save();

  res
    .status(200)
    .json(new ApiResponse(200, req.body, " responsibilities updated!"));
});

export const deleteresponsibilities = catchAsyncError(
  async (req, res, next) => {
    const student = await Student.findById(req.user.id).select("-password");
    const filteredresponsibilities = student.resmue.responsibilities.filter(
      (i) => i.id !== req.params.resid
    );

    student.resmue.responsibilities = filteredresponsibilities;
    await student.save();

    res
      .status(200)
      .json(new ApiResponse(200, {}, " responsibilities Removed!"));
  }
);

{
  /** ----------------------courses EndPoint--------------------- */
}

export const addcourse = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.courses.push({ ...req.body, id: uuidv4() });
  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Courses added!"));
});

export const editcourse = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  const courseIndex = student.resmue.courses.findIndex(
    (i) => i.id === req.params.courseid
  );

  student.resmue.courses[courseIndex] = {
    ...student.resume.courses[courseIndex],
    ...req.body,
  };

  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Courses updated!"));
});

export const deletecourse = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const filteredcourses = student.resmue.courses.filter(
    (i) => i.id !== req.params.courseid
  );

  student.resmue.courses = filteredcourses;
  await student.save();

  res.status(200).json(new ApiResponse(200, {}, " Courses Removed!"));
});

{
  /** ----------------------projects EndPoint--------------------- */
}

export const addproject = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.projects.push({ ...req.body, id: uuidv4() });
  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Project added!"));
});

export const editproject = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  const projectIndex = student.resmue.projects.findIndex(
    (i) => i.id === req.params.projectid
  );

  student.resmue.projects[projectIndex] = {
    ...student.resume.projects[projectIndex],
    ...req.body,
  };

  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Projects updated!"));
});

export const deleteproject = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const filteredprojects = student.resmue.projects.filter(
    (i) => i.id !== req.params.projectid
  );

  student.resmue.projects = filteredprojects;
  await student.save();

  res.status(200).json(new ApiResponse(200, {}, " Projects Removed!"));
});

{
  /** ----------------------skills EndPoint--------------------- */
}

export const addskill = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.skills.push({ ...req.body, id: uuidv4() });
  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Skills added!"));
});

export const editskill = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  const skillIndex = student.resmue.skills.findIndex(
    (i) => i.id === req.params.skillid
  );

  student.resmue.skills[skillIndex] = {
    ...student.resume.skills[skillIndex],
    ...req.body,
  };

  await student.save();

  res.status(200).json(new ApiResponse(200, req.body, " Skills updated!"));
});

export const deleteskill = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const filteredskills = student.resmue.skills.filter(
    (i) => i.id !== req.params.skillid
  );

  student.resmue.skills = filteredskills;
  await student.save();

  res.status(200).json(new ApiResponse(200, {}, " Skills Removed!"));
});

{
  /** ----------------------accomplishments EndPoint--------------------- */
}

export const addaccomplishments = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  student.resmue.accomplishments.push({ ...req.body, id: uuidv4() });
  await student.save();

  res
    .status(200)
    .json(new ApiResponse(200, req.body, " Accomplishments added!"));
});

export const editaccomplishments = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");

  const accIndex = student.resmue.accomplishments.findIndex(
    (i) => i.id === req.params.acid
  );

  student.resmue.accomplishments[accIndex] = {
    ...student.resume.accomplishments[accIndex],
    ...req.body,
  };

  await student.save();

  res
    .status(200)
    .json(new ApiResponse(200, req.body, " Accomplishments updated!"));
});

export const deleteaccomplishments = catchAsyncError(async (req, res, next) => {
  const student = await Student.findById(req.user.id).select("-password");
  const filteredacc = student.resmue.accomplishments.filter(
    (i) => i.id !== req.params.acid
  );

  student.resmue.accomplishments = filteredacc;
  await student.save();

  res.status(200).json(new ApiResponse(200, {}, " Accomplishments Removed!"));
});
