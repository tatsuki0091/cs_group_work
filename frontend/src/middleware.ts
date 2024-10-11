import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { store } from './store/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { decrement, increment } from '@/store/slices/counterSlice';

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
    // console.log('Current state:', store);
    const currentUrl = req.nextUrl;

    // 例: クエリパラメータ "source" がない場合に追加
    if (!currentUrl.searchParams.has('source')) {
        currentUrl.searchParams.append('source', 'middleware');

        // // ログで確認
        // console.log('更新されたURL:', currentUrl.toString());

        // 新しいURLにリダイレクト
        return NextResponse.redirect(currentUrl);
    }

    return NextResponse.next(); // そのまま処理を続行
    // const authResponse = checkAuth(req);
    // if (authResponse) {
    //     const currentUrl = req.nextUrl;
    //     currentUrl.searchParams.append('isLoggedin', 'true');
    //     return NextResponse.next();
    // } else {
    //     return NextResponse.redirect('/');
    // }
}

export const config = {
    matcher: '/((?!auth/login|auth/create|$).*)/:path*',
};
