import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const POST = async (req: NextRequest) => {

    const { email, username } = await req.json();

    if (!email ||  !username) {
        return NextResponse.json({
            status: 400,
            msg: "provide the required fields email and username both!"
        })
    }

    try {

        const createdUser = await prisma.user.create({
            data: {
                email,
                username,
                verifyCode: "432532" // later send this code to user email and verify the email
            }
        })
        return NextResponse.json({ msg: "created the user", user: createdUser })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "failed to create the user", error })
    }

}
