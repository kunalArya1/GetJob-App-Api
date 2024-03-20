import express from "express";
import {
  Homepage,
  SignUp,
  SignIn,
  signOut,
  forgotPassword,
  resetPassword,
  EmployeDetails,
  forgotPasswordLink,
} from "../controllers/Employe.controllers.js";
import { upload } from "../middlewares/Multer.middleware.js";
import { isLoggoedIn } from "../middlewares/Auth.middleware.js";
const router = express.Router();

// GET /api/v1/student/homepage ✅
router.route("/").get(Homepage);

// GET  /api/v1/student/student-data ✅
router.route("/employe-data").get(isLoggoedIn, EmployeDetails);

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
