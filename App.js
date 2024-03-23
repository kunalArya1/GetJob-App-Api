import express from "express";
import connectDB from "./db/Connect.db.js";
import dotenv from "dotenv";
import studentRoutes from "./routes/Student.routes.js";
import resumeRoutes from "./routes/Resume.routes.js";
import cookieParser from "cookie-parser";
import employeRoutes from "./routes/Employe.routes.js";
import { customError } from "./utils/CustomError.js";
import {
  readAllInternship,
  readAllJobs,
} from "./controllers/Student.controllers.js";
import helmet from "helmet";

// Express App
const app = express();
const PORT = process.env.PORT || 3000;

// DotEnv Config
dotenv.config();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Static Folder

app.use(express.static("./public"));

// Helmet Added
app.use(helmet());

// Routes Setup

// Get all Job And Internships

app.route("/api/v1/all-Jobs").get(readAllJobs);

app.route("/api/v1/all-internships").get(readAllInternship);

// Student Routes
app.use("/api/v1/student", studentRoutes);

// Employe Routes
app.use("/api/v1/employe", employeRoutes);

// Resume Routes
app.use("/api/v1/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.send("Hello form Server");
});

app.use("*", customError);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`App is running on Port ${PORT}`);
    });
  } catch (error) {
    console.log("Error While Connecting to Database. ", error);
  }
};

start();
