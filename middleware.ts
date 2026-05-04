import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to protect authenticated routes
 * Redirects unauthenticated users to /login
 */
export function middleware(request: NextRequest) {
 const pathname = request.nextUrl.pathname;

 // Check for session cookie
 const session = request.cookies.get('session');

 console.log(
 `[Middleware] Accessing ${pathname} - Session exists: ${!!session?.value}`
 );

 // If no session exists, redirect to login
 if (!session?.value) {
 console.log(
 `[Middleware] No session found for ${pathname}. Redirecting to /login`
 );
 return NextResponse.redirect(new URL('/login', request.url));
 }

 console.log(`[Middleware] Session valid. Allowing access to ${pathname}`);

 // Allow the request to proceed
 return NextResponse.next();
}

/**
 * Matcher configuration for protected routes
 */
export const config = {
 matcher: [
 '/dashboard',
 '/dashboard/:path*',
 '/projects/:path*',
 ],
};
