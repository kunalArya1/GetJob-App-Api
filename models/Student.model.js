import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLenght: [5, "First name must be at least 5 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minLenght: [5, "Last name must be at least 5 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minLenght: [5, "Email must be at least 5 characters long"],
      //   match: [
      //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //     "Please fill a valid email address",
      //   ],
    },
    // contact: {
    //   type: Number,
    //   required: [true, "Contact is required"],
    //   minLenght: [10, "Contact must be at least 10 characters long"],
    //   maxLength: [10, "Contact must be at most 10 characters long"],
    // },
    // city: {
    //   type: String,
    //   required: [true, "City is required"],
    //   minLenght: [3, "City must be at least 3 characters long"],
    // },
    // gender: {
    //   type: String,
    //   enum: ["Male", "male", "Female", "female", "Others", "others"],
    // },
    password: {
      type: String,
      select: false, // to hide password from response
      required: [true, "Password is required"],
      minLenght: [5, "Password must be at least 5 characters long"],
    },
    avatar: {
      type: String,
    },
    resmue: {
      education: [],
      jobs: [],
      internships: [],
      responsibilities: [],
      courses: [],
      projects: [],
      skills: [],
      accomplishments: [],
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

studentSchema.methods.isPassportCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

studentSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );
};

export default mongoose.model("Student", studentSchema);
