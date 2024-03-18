import express from "express";
import connectDB from "./db/Connect.db.js";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 3000;

// DotEnv Config
dotenv.config();

// Body parser
app.use(express.json());

// Routes
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
