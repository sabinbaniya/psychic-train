import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

const middleware = (req: NextRequest) => {
  const { access, userInfo } = req.cookies;
  const res = NextResponse.next();

  const { userId } = jwt.decode(access) as JwtPayload;

  if (!userInfo) {
    res.cookie("user-id", userId);
  }

  return res;
};

export default middleware;
