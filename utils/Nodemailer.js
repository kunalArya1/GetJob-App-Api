import nodemailer from "nodemailer";
import catchAsyncError from "./catchAsyncError.js";
import { ApiError } from "./ApiError.js";
import { ApiResponse } from "./ApiResponse.js";

const sendMail = catchAsyncError(async (url, req, res, next) => {
  console.log(url);
  const transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    service: "gmail",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = {
    from: '"Kunal Private Limited 👻" < kunalkrraj@gmail.com >',
    to: req.body.email,
    subject: "Password Reset Link..",
    //   text: "Hello world?", // plain text body
    html: `<h1>Click Bellow to Change you Password</h1>
  <a href=${url} target=_blank>Reset Password</a>`,
  };

  transporter.sendMail(info, (err, data) => {
    if (err) return next(new ApiError(err.message, 500));
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Email Sent SuccessFully!"));
  });
});

export { sendMail };
