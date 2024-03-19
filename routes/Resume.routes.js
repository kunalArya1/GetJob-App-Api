import express from "express";
import {
  homePage,
  addEducation,
  editEduaction,
  deleteEducation,
  addjob,
  editjob,
  deletejob,
  addinternship,
  editinternship,
  deleteinternship,
} from "../controllers/Resume.controllers.js";
import { isLoggoedIn } from "../middlewares/Auth.middleware.js";
const router = express.Router();

router.route("/").get(homePage);

{
  /** ---------------------- Education ----------------------- */
}

// POST /api/v1/resume/add-education
router.route("/add-education").post(isLoggoedIn, addEducation);

// POST  /api/v1/resume/edit-education/:eduid
router.route("/edit-education/:eduid").post(isLoggoedIn, editEduaction);

// POST /api/v1/resmue/delete-education/:eduid
router.route("/delete-education/:eduid").post(isLoggoedIn, deleteEducation);

{
  /** ---------------------- Jobs Routes ----------------------- */
}

// POST /api/v1/resume/add-job
router.route("/add-job").post(isLoggoedIn, addjob);

// POST  /api/v1/resume/edit-job/:jobid
router.route("/edit-job/:jobid").post(isLoggoedIn, editjob);

// POST /api/v1/resmue/delete-job/:jobid
router.route("/delete-job/:jobid").post(isLoggoedIn, deletejob);

{
  /** ---------------------- internships Routes ----------------------- */
}

// POST /api/v1/resume/add-internship
router.route("/add-internship").post(isLoggoedIn, addinternship);

// POST  /api/v1/resume/edit-internship/:id
router.route("/edit-internship/:internid").post(isLoggoedIn, editinternship);

// POST /api/v1/resmue/delete-internship/:id
router
  .route("/delete-internship/:internid")
  .post(isLoggoedIn, deleteinternship);

export default router;
