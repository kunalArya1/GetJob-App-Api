import express from "express";
import {
  Homepage,
  SignUp,
  SignIn,
  signOut,
  forgotPassword,
  resetPassword,
  StudentDetails,
} from "../controllers/Student.controllers.js";
import { upload } from "../middlewares/Multer.middleware.js";
import { isLoggoedIn } from "../middlewares/Auth.middleware.js";
const router = express.Router();

// GET /api/v1/student/homepage ✅
router.route("/").get(Homepage);

// GET  /api/v1/student/student-data ✅
router.route("/student-data").get(isLoggoedIn, StudentDetails);

// POST /api/v1/student/sign-up ✅
router.route("/sign-up").post(upload.single("avatar"), SignUp);

// POST /api/v1/student/sign-in ✅
router.route("/sign-in").post(SignIn);

// POST /api/v1/student/sign-out ✅
router.route("/sign-out").post(isLoggoedIn, signOut);

// POST /api/v1/student/forgot-password
router.route("/forgot-password").post(forgotPassword);

// POST /api/v1/student/reset-password
router.route("/reset-password").post(resetPassword);
export default router;
