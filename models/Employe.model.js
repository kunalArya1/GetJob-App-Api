import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const EmployeSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [5, "First name must be at least 5 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [5, "Last name must be at least 5 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: [5, "Email must be at least 5 characters long"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    contact: {
      type: Number,
      required: [true, "Contact is required"],
      minlenght: [10, "Contact must be at least 10 characters long"],
      maxlength: [10, "Contact must be at most 10 characters long"],
    },

    gender: {
      type: String,
      enum: ["Male", "male", "Female", "female", "Others", "others"],
    },
    password: {
      type: String,
      // select: false, // to hide password from response
      required: [true, "Password is required"],
      minlength: [5, "Password must be at least 5 characters long"],
    },
    avatar: {
      type: String,
    },
    resetPawwordToken: {
      type: String,
      default: "0",
    },
    organizationname: {
      type: String,
      required: [true, "Organization Name is required"],
      minLength: [4, "Organization Name should be atleast 4 character long"],
    },
    organizationlogo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

EmployeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

EmployeSchema.methods.isPassportCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

EmployeSchema.methods.generateAccessToken = function () {
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

export default mongoose.model("Employe", EmployeSchema);
