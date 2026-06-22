import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/login", "/signup","/dashboard-user", "/dashboard-admin", "/signup"],
};

export default async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname.startsWith("/login") || url.pathname.startsWith("/signup"))
  ) {
    if (token.role === "User") {
      return NextResponse.redirect(new URL("/dashboard-user", request.url));
    } else if (token.role === "Admin") {
      return NextResponse.redirect(new URL("/dashboard-admin", request.url));
    }
  }
}
