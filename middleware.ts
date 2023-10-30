import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const requestHeaders = new Headers(req.headers)

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session && path === "/login") {
    return NextResponse.redirect(new URL(`/`, req.url));
  }
  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  requestHeaders.set('x-pathname', req.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};