import { NextRequest, NextResponse } from "next/server";
import jwt, { Secret } from "jsonwebtoken";

const middleware = async (req: NextRequest) => {
  const token = req.cookies.access;

  const url = req.nextUrl.clone();

  if (!token) {
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/login", url));
    }

    if (url.pathname.startsWith("/chat")) {
      return NextResponse.redirect(new URL("/login", url));
    }

    return NextResponse.next();
  } else {
    try {
      const isValid = jwt.verify(token, process.env.JWT_SECRET as Secret);
      if (url.pathname === "/login" || url.pathname === "/signup") {
        if (isValid) {
          return NextResponse.redirect(new URL("/", url));
        }
      }
      return NextResponse.next();
    } catch (error) {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/login", url));
      }

      if (url.pathname.startsWith("/chat")) {
        return NextResponse.redirect(new URL("/login", url));
      }

      return NextResponse.next();
    }
  }
};

export default middleware;
