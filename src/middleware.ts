import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { auth } from './auth'
// import { getSession } from 'next-auth/react'
import { url } from 'inspector'
import { getToken, GetTokenParams } from 'next-auth/jwt'


async function redirectingMiddleware(request: NextRequest) {

    console.log('this is the top level middleware')

    const url = request.nextUrl

    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET || "",
        salt: process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
    })
    console.log('token : ', token)

    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up')
    )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!token && (
        url.pathname.startsWith('/dashboard')
    )) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}


export async function middleware(request: NextRequest) {

    const middleware1 = await redirectingMiddleware(request)
    if (middleware1) {
        return middleware1
    }


    // const cookies = request.cookies.get('vishwas')
    // console.log('cookies:', cookies)

    // const response = NextResponse.next()

    // response.cookies.set('vishwas', "vishwas asdfkjlk asklkdfjlajsfljaslfjl asflk;")
    // // return NextResponse.redirect(new URL('/', request.url))

    // return response
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