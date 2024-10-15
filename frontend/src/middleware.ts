import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Checking JWT
function checkAuth(req: NextRequest) {
    const accessToken = req.cookies.get('access_token');
    const refreshToken = req.cookies.get('refresh');
    if (accessToken && refreshToken) {
        return true;
    } else {
        return false;
    }
}

export function middleware(req: NextRequest) {
    if (checkAuth(req)) {
        const headers = new Headers(req.headers);
        console.log('----------');
        const url = req.nextUrl.pathname;
        console.log(url);
        headers.set('x-current-path', req.nextUrl.pathname);
        console.log(req.nextUrl.pathname);
        console.log(req.nextUrl);
        return NextResponse.next();
    } else {
        const url = req.nextUrl.clone();
        if (
            url.pathname.startsWith('/_next') ||
            url.pathname.startsWith('/images')
        ) {
            return NextResponse.next();
        }

        url.pathname = '/auth/login';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: '/((?!auth/login|auth/create|$).*)/:path*',
};
