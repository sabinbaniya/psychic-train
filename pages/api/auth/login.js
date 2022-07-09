import UserModel from "../../../lib/model/userModel.js";
import clientPromise from "../../../lib/db.js";
import mongoose from "mongoose";

const login = async (req, res) => {
  if (mongoose.connection.readyState !== "connected") {
    clientPromise();
  }

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }

    const doPasswordsMatch = await user.comparePasswords(password);

    if (!doPasswordsMatch) {
      return res.status(401).json({
        msg: "Invalid Credentials in password matching",
      });
    }

    if (!user.isEmailVerified) {
      return res.status(401).json({ msg: "User hasn't verified email." });
    }

    const serializedCookie = await user.generateCookie();

    res.setHeader("Set-Cookie", serializedCookie);
    return res.status(200).json({ msg: "User login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error." });
  }
};

export default login;
