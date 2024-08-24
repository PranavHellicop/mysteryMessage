import { NextResponse } from 'next/server'
import { auth } from './auth';

// This function can be marked `async` if using `await` inside
export default auth((req)=>{
    const isLoggedIn =  !!req.auth
    // console.log(isLoggedIn);
    const url = req.nextUrl
    // console.log(url);
    
    
    if (isLoggedIn && (
        url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up") ||
        url.pathname.startsWith("/verify") 
    )
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (!isLoggedIn && (url.pathname.startsWith("/dashboard"))){
        return NextResponse.redirect(new URL('/sign-in', req.url))
    }

    return NextResponse.next()
})




export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/dashboard/:path*',
        '/verify/:path*'
    ],
}