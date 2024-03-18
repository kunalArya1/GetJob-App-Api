import express from "express";
import connectDB from "./db/Connect.db.js";
import dotenv from "dotenv";
import studentRoutes from "./routes/Student.routes.js";

// Express App
const app = express();
const PORT = process.env.PORT || 3000;

// DotEnv Config
dotenv.config();

// Body parser
app.use(express.json());

// Routes Setup

app.use("/api/student", studentRoutes);

app.get("/", (req, res) => {
  res.send("Hello form Server");
});

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
