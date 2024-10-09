import { auth } from "@/auth";
import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {

    try {
        const currentUser = await auth()

        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: "you are no logged in, signin first"
            })
        }

        const userinDb = await prisma.user.findFirst({
            where: {
                id: currentUser.user.id
            },
            select: {
                id: true,
                email: true,
                isAcceptingMessage: true
            }
        })

        if (!userinDb) {
            // clear the user cookies of auth maybe user is already deleted, you should do this work in middleware
            return NextResponse.json({
                success: false,
                message: "current user not found in db"
            })
        }


        // toggle the accepting messages
        const updatedUser = await prisma.user.update({
            where: {
                id: userinDb.id
            },
            data: {
                isAcceptingMessage: !userinDb.isAcceptingMessage,
            },
            select: {
                id: true,
                username: true,
                email: true,
                isAcceptingMessage: true
            }
        })

        if (!updatedUser) {
            return NextResponse.json({
                success: false,
                message: "failed to toggle the accepting message"
            })
        }

        return NextResponse.json({
            success: true,
            message: updatedUser.isAcceptingMessage ? "now user accepting feeback" : "now user does not accepting a feedback",
            isAcceptingMessage: updatedUser.isAcceptingMessage
        })

        

    } catch (error) {

    }


    return NextResponse.json({
        success: true,
        message: ""
    })
}