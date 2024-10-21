import { auth } from "@/auth";
import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {

    try {
        const currentLoggedInUser = await auth();
    
        if (!currentLoggedInUser) {
            req.cookies.delete("authjs.session-token")
    
            return NextResponse.json({
                message: "you need to login first!",
                success: false
            }, { status: 401 })
    
        }
    
        // check current user exist or not in database
        const userInDb = await prisma.user.findFirst({
            where: {
                id: currentLoggedInUser.user.id
            },
            select: {
                username: true,
                email: true,
                receivedMessages: true,
            }
        })
    
        console.log("this is the users messages: ", userInDb?.receivedMessages)
    
    
    } catch (error) {
        return NextResponse.json({
            message: "error in getting user messages",
            success: false,
        }, { status: 500 })
    }
    return NextResponse.json({
        message: "",
        success: true
    })
}