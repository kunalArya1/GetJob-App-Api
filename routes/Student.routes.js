import express from "express";
import {
  studHomepage,
  SignUp,
  SignIn,
  signOut,
  forgotPassword,
  resetPassword,
} from "../controllers/Student.controllers.js";
import { upload } from "../middlewares/Multer.middleware.js";
const router = express.Router();

// GET /api/v1/student/
router.route("/").get(studHomepage);

// POST /api/v1/student/sign-up
router.route("/sign-up").post(upload.single("avatar"), SignUp);

// POST /api/v1/student/sign-in
router.route("/sign-in").post(SignIn);

// POST /api/v1/student/sign-out
router.route("/sign-out").post(signOut);

// POST /api/v1/student/forgot-password
router.route("/forgot-password").post(forgotPassword);

// POST /api/v1/student/reset-password
router.route("/reset-password").post(resetPassword);
export default router;
