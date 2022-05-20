import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.access;

  const res = NextResponse.next();

  if (
    !req.cookies.uname ||
    !req.cookies.uid ||
    req.cookies.uname === "null" ||
    req.cookies.uid === "null"
  ) {
    if (token) {
      try {
        const { userId, name } = jwt.decode(token) as JwtPayload;

        res.cookie("uid", userId, { maxAge: 60 * 60 * 24 * 30 });
        res.cookie("uname", name, { maxAge: 60 * 60 * 24 * 30 });
      } catch (error) {
        console.log(error);
      }
    }
  }

  const url = req.nextUrl.clone();

  if (!token) {
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/login", url));
    }

    if (url.pathname.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/login", url));
    }

    if (url.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", url));
    }

    if (url.pathname.startsWith("/search")) {
      return NextResponse.redirect(new URL("/login", url));
    }

    return res;
  } else {
    try {
      const isValid = jwt.verify(token, process.env.JWT_SECRET as Secret);
      if (
        url.pathname === "/login" ||
        url.pathname === "/signup" ||
        url.pathname === "/verify" ||
        url.pathname.startsWith("/verify-email/")
      ) {
        if (isValid) {
          return NextResponse.redirect(new URL("/", url));
        }
      }
      return res;
    } catch (error) {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/login", url));
      }

      if (url.pathname.startsWith("/chat")) {
        return NextResponse.redirect(new URL("/login", url));
      }

      if (url.pathname.startsWith("/profile")) {
        return NextResponse.redirect(new URL("/login", url));
      }

      if (url.pathname.startsWith("/search")) {
        return NextResponse.redirect(new URL("/login", url));
      }

      return res;
    }
  }
};

export default middleware;
