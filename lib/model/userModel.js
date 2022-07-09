import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const userSchema = new Schema(
  {
    userId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      required: false,
      default: "/avatar.png",
    },
    friends: {
      type: [
        {
          userId: String,
          name: String,
          email: String,
          avatarUrl: String,
          joinedAt: Date,
          chatRoomId: String,
          messageCollectionId: String,
        },
      ],
    },
    onlineStatus: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.generateCookie = function () {
  const token = jwt.sign(
    { name: this.name, userId: this.userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  const serializedCookie = serialize("access", token, {
    httpOnly: true,
    path: "/",
    // domain: process.env.URL,
    maxAge: 60 * 60 * 24 * 30,
    // sameSite: "strict",
    // secure: true,
  });

  return serializedCookie;
};

userSchema.methods.comparePasswords = async function (password) {
  console.log("hi");
  console.log(password, this.password);
  const doPasswordsMatch = await bcrypt.compare(password, this.password);
  console.log(doPasswordsMatch);
  return doPasswordsMatch;
};

const UserModel = mongoose.models.Users || model("Users", userSchema);

export default UserModel;
