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
  addresponsibilities,
  editresponsibilities,
  deleteresponsibilities,
  addproject,
  editproject,
  deleteproject,
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

{
  /** ---------------------- responsibilities Routes ----------------------- */
}

// POST /api/v1/resume/add-responsibilities
router.route("/add-responsibilities").post(isLoggoedIn, addresponsibilities);

// POST  /api/v1/resume/edit-responsibilities/:id
router
  .route("/edit-responsibilities/:resnid")
  .post(isLoggoedIn, editresponsibilities);

// POST /api/v1/resmue/delete-responsibilities/:id
router
  .route("/delete-responsibilities/:resid")
  .post(isLoggoedIn, deleteresponsibilities);

{
  /** ---------------------- projects Routes ----------------------- */
}

// POST /api/v1/resume/add-project
router.route("/add-project").post(isLoggoedIn, addproject);

// POST  /api/v1/resume/edit-project/:projectid
router.route("/edit-project/:projectid").post(isLoggoedIn, editproject);

// POST /api/v1/resmue/delete-project/:projectid
router.route("/delete-project/:projectid").post(isLoggoedIn, deleteproject);

{
  /** ---------------------- skills Routes ----------------------- */
}

// POST /api/v1/resume/add-skill
router.route("/add-skill").post(isLoggoedIn, addskill);

// POST  /api/v1/resume/edit-skill/:skillid
router.route("/edit-skill/:skillid").post(isLoggoedIn, editskill);

// POST /api/v1/resmue/delete-skill/:skillid
router.route("/delete-skill/:skilltid").post(isLoggoedIn, deleteskill);

export default router;
