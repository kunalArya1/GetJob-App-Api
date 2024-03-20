import express from "express";
import {
  Homepage,
  SignUp,
  SignIn,
  signOut,
  forgotPassword,
  resetPassword,
  StudentDetails,
  forgotPasswordLink,
  readAllJobs,
  readAllInternship,
  applyInternship,
  applyJob,
} from "../controllers/Student.controllers.js";
import { upload } from "../middlewares/Multer.middleware.js";
import { isLoggoedIn } from "../middlewares/Auth.middleware.js";
const router = express.Router();

// GET /api/v1/student/homepage ✅
router.route("/").get(Homepage);

// GET  /api/v1/student/student-data ✅
router.route("/details").get(isLoggoedIn, StudentDetails);

// POST /api/v1/student/sign-up ✅
router.route("/sign-up").post(upload.single("avatar"), SignUp);

// POST /api/v1/student/sign-in ✅
router.route("/sign-in").post(SignIn);

// POST /api/v1/student/sign-out ✅
router.route("/sign-out").post(isLoggoedIn, signOut);

// POST /api/v1/student/forgot-password ✅
router.route("/forgot-password").post(forgotPassword);

// GET  /api/v1/student/forgot-password-link ✅
router.route("/forgot-password-link/:id").get(forgotPasswordLink);

// POST /api/v1/student/reset-password ✅
router.route("/reset-password").post(isLoggoedIn, resetPassword);
export default router;

{
  /** Read All Internship  and Jobs */
}

// POST /api/v1/read-all-internships ✅
router.route("/get-all-internships").post(isLoggoedIn, readAllInternship);

// POST /api/v1/read-all-jobs ✅
router.route("/get-all-jobs").post(isLoggoedIn, readAllJobs);

{
  /**     Apply for Jobs And Interships */
}

// POST /api/v1/apply/internship/:internshipid  ✅
router
  .route("/apply/internship/:internshipid")
  .post(isLoggoedIn, applyInternship);

// POST /api/v1/apply/job/:jobid  ✅
router.route("/apply/job/:jobid").post(isLoggoedIn, applyJob);
