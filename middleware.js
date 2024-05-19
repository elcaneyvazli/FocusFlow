import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token'); 

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Middleware-in tətbiq ediləcəyi marşrutları göstərir
};
