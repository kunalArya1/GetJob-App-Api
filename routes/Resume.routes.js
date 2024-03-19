import express from "express";
import { homePage } from "../controllers/Resume.controllers.js";
const router = express.Router();

router.get("/", homePage);
export default router;
