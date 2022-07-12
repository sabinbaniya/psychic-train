import { v4 } from "uuid";
import sendMail from "./helpers/sendMail";
import clientPromise from "../../../lib/db";
import mongoose from "mongoose";
import UserModel from "../../../lib/model/userModel";

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (mongoose.connection.readyState !== "connected") {
      clientPromise();
    }

    let alreadyExists = await UserModel.findOne({ email });

    const userId = v4();
    const emailVerificationToken = v4();

    if (alreadyExists) {
      return res.status(400).json({ msg: "User registeration failed" });
    }

    const user = await UserModel.create({
      userId,
      name,
      email,
      password,
      emailVerificationToken,
    });

    const mailSent = await sendMail(email, emailVerificationToken);

    if (mailSent) {
      return res.status(201).json({ msg: "User registration successful" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error, please try again later" });
  }
};

export default signup;
