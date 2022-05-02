import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const { access, userInfo } = req.cookies;
  const res = NextResponse.next();

  try {
    const { userId, name } = jwt.decode(access) as JwtPayload;

    if (!userInfo) {
      res.cookie("uid", userId);
      res.cookie("uname", name);
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default middleware;
