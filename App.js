import express from "express";
import connectDB from "./db/Connect.db.js";
import dotenv from "dotenv";
import studentRoutes from "./routes/Student.routes.js";
import cookieParser from "cookie-parser";
import { customError } from "./utils/CustomError.js";

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
// Routes Setup

app.use("/api/v1/student", studentRoutes);

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
