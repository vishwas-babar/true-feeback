
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
// import { auth as middleware } from './auth'
// import { getSession } from 'next-auth/react''
import { getToken } from 'next-auth/jwt'
import jwt from 'jsonwebtoken'
import { auth } from './auth'



export async function middleware(request: NextRequest) {

    const middleware1 = await redirectingMiddleware(request)
    if (middleware1) {
        return middleware1
    }

    // const middleware2 = await otpVerificationCheckMiddleware(request)
    // if (middleware2) {
    //     return middleware2
    // }


    // const cookies = request.cookies.get('vishwas')
    // console.log('cookies:', cookies)

    // const response = NextResponse.next()

    // response.cookies.set('vishwas', "vishwas asdfkjlk asklkdfjlajsfljaslfjl asflk;")
    // // return NextResponse.redirect(new URL('/', request.url))

    // return response
}


async function otpVerificationCheckMiddleware(request: NextRequest) {
    // const session = await auth()

    // if (!session?.user) {
    //     return NextResponse.redirect(new URL('/sign-in', request.url))
    // }

    // const isVerified = session.user.isVerified

    // if (isVerified) {
    //     return NextResponse.redirect(new URL('/verify', request.url))
    // } else {
    //     return NextResponse.next()
    // }

}


async function redirectingMiddleware(request: NextRequest) {

    const url = request.nextUrl

    const salt = process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token";
    // @ts-ignore
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET || "",
        secureCookie: process.env.NODE_ENV === 'production' ? true : false, 
        // salt: salt,
    })

    console.log("process.env.NODE_ENV", salt)
    console.log('token : ', token)

    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up')
    )) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (!token && (
        url.pathname.startsWith('/dashboard')
    )) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/sign-in',
        '/sign-up',
        '/dashboard'

        // '/user', 
    ],
}
