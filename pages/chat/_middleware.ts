import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  const { access, userInfo } = req.cookies;
  const res = NextResponse.next();

  try {
    const { userId, name } = jwt.decode(access) as JwtPayload;

    if (!userInfo) {
      res.cookie("uid", userId, { maxAge: 60 * 60 * 24 * 30 });
      res.cookie("uname", name, { maxAge: 60 * 60 * 24 * 30 });
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export default middleware;
