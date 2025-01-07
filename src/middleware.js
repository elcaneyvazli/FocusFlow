import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const AUTH_PAGES = ["/login", "/register"];

const isAuthPage = (url) => AUTH_PAGES.some((page) => url.startsWith(page));

export default function middleware(request) {
  const { nextUrl, url } = request;
  const cookieStore = cookies();
  const token = cookieStore.get("acc");
  const hasVerifiedToken = token !== undefined;
  const isAuthPageRequested = isAuthPage(nextUrl.pathname);
  if (!hasVerifiedToken && !isAuthPageRequested) {
    return NextResponse.redirect(new URL("/login", url));
  }
  if (hasVerifiedToken && isAuthPageRequested) {
    return NextResponse.redirect(new URL("/dashboard", url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/dashboard", "/login", "/register"],
};
