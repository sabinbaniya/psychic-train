import UserModel from "../../../model/userModel.js";

const verifyEmail = async (req, res) => {
  const verificationCode = req.body.verificationCode;

  try {
    const user = await UserModel.findOne({
      emailVerificationToken: verificationCode,
      isEmailVerified: false,
    });

    if (!user) {
      return res.status(400).json({ msg: "Bad Request" });
    }

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { isEmailVerified: true }
    );

    const serializedCookie = await user.generateCookie();
    res.setHeader("Set-Cookie", serializedCookie);
    return res.status(200).json({ msg: "User email verified successfully" });
  } catch (error) {
    console.log(error);
  }
};

export default verifyEmail;
