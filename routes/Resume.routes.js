import express from "express";
import {
  homePage,
  addEducation,
  editEduaction,
  deleteEducation,
  addjob,
  editjob,
  deletejob,
} from "../controllers/Resume.controllers.js";
import { isLoggoedIn } from "../middlewares/Auth.middleware.js";
const router = express.Router();

router.route("/").get(homePage);

{
  /** ---------------------- Education ----------------------- */
}

// POST /api/v1/resume/add-education
router.route("/add-education").post(isLoggoedIn, addEducation);

// POST  /api/v1/resume/edit-education/:id
router.route("/edit-education/:eduid").post(isLoggoedIn, editEduaction);

// POST /api/v1/resmue/delete-education/:id
router.route("/delete-education/:eduid").post(isLoggoedIn, deleteEducation);

{
  /** ---------------------- Jobs ----------------------- */
}

// POST /api/v1/resume/add-education
router.route("/add-job").post(isLoggoedIn, addjob);

// POST  /api/v1/resume/edit-education/:id
router.route("/edit-job/:jobid").post(isLoggoedIn, editjob);

// POST /api/v1/resmue/delete-education/:id
router.route("/delete-job/:jobid").post(isLoggoedIn, deletejob);

export default router;
