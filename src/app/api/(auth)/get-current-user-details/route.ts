import { auth } from "@/auth";
import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {

    try {
        const currentUser = await auth()

        console.log("this is current user: ", currentUser)
        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: "you need to login first",
                user: null
            }, { status: 401 })
        }

        const userInDb = await prisma.user.findFirst({
            where: {
                id: currentUser.user.id
            },
            select: {
                username: true,
                email: true,
                id: true,
                isVerified: true,
                isAcceptingMessage: true,
            }
        })

        if (!userInDb) {
            req.cookies.delete('authjs.session-token')

            return NextResponse.json({
                success: false,
                message: "current user does not exist in database",
                user: null
            }, { status: 401 })
        }

        return NextResponse.json({
            success: true,
            message: "user found",
            user: userInDb
        }, { status: 200 })

    } catch (error) {
        console.log('error while getting current user details')
        return NextResponse.json({
            success: false,
            message: "error while getting the current logged in user details",
            user: null
        }, { status: 500 })
    }

    return NextResponse.json({
        success: false,
        message: "",
        user: null
    })
}