import { NextResponse, NextRequest } from 'next/server';

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

function avoidStatic(req: NextRequest) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-url', req.url);
    const url = req.nextUrl.clone();
    if (
        url.pathname.startsWith('/_next') === false ||
        url.pathname.startsWith('/images') === false
    ) {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }
}

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    // if (checkAuth(req)) {
    //     return avoidStatic(req);
    // } else {
    //     avoidStatic(req);
    //     url.pathname = '/auth/login';
    //     return NextResponse.redirect(url);
    // }
}

export const config = {
    matcher: '/((?!auth/login|auth/create|$).*)/:path*',
};
