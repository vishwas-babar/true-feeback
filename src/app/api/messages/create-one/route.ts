import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import { messageSchema } from "@/schemas/messageSchema";
import { signupSchema } from "@/schemas/signupschema";
import { z } from "zod";
import prisma from "@/database/db";
import { connect } from "http2";

const createMessageSchema = z.object({
    content: messageSchema.shape.content,
    username: signupSchema.shape.username
})

export const POST = async (req: NextRequest) => {

    try {
        const currentUser = await auth()
        console.log("current user: ", currentUser)

        if (!currentUser) {
            return NextResponse.json({
                success: false,
                message: "you need to login first"
            }, { status: 401 })
        }

        const body = await req.json()

        const result = createMessageSchema.safeParse({ content: body.content, username: body.toUsername })

        if (!result.success) {
            const contentError = result.error.format().content?._errors || []
            const usernameError = result.error.format().username?._errors || []

            const allErrors = [...contentError, ...usernameError]

            return NextResponse.json({
                success: false,
                message: allErrors.length > 0 ? allErrors.join(', ') : "validation failed for provided body"
            }, { status: 400 })
        }


        // check the user accepting a feedback or not
        const userToSendFeedback = await prisma.user.findFirst({
            where: {
                username: result.data.username
            }, select: { id: true, isAcceptingMessage: true, username: true }
        })

        if (!userToSendFeedback) {
            return NextResponse.json({
                success: false,
                message: "the user to whom you want send the messages is not exist"
            }, { status: 404 })
        }

        if (!userToSendFeedback?.isAcceptingMessage) {
            return NextResponse.json({
                success: false,
                message: "the user to whom you want send the messages is not ready to accept feedback from anyone"
            }, { status: 406 })
        }

        const createdMessage = await prisma.message.create({
            data: {
                content: result.data.content,
                sender: {
                    connect: { id: currentUser.user.id }
                },
                receiver: {
                    connect: {
                        id: userToSendFeedback.id
                    }
                }

            }
        })

    } catch (error) {
        console.log("error while sending the message", error)

        return NextResponse.json({
            success: false,
            message: "failed to send the message"
        }, { status: 500 })
    }


    return NextResponse.json({
        success: false,
        message: "failed to create the message",
        createdMessageId: 34,
        createdMessageContent: "asdlfkj"
    })
}