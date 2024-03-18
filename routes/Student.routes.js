import express from "express";
import { studHomepage } from "../controllers/Student.controllers.js";
const router = express.Router();

// Student Homepage
router.route("/").get(studHomepage);

export default router;
