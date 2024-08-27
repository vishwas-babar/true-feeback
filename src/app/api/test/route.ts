
import prisma from "@/database/db";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {

    const { email, username, password } = await req.json();


    if (!email ||  !username || !password) {
        return NextResponse.json({
            status: 400,
            msg: "provide the required fields email, password and username!"
        })
    }

    try {

        
        const createdUser = await prisma.user.create({
            data: {
                email,
                password,
                verifyCodeExpiry: (new Date(Date.now() + (60 * 60 * 1000 ))), 
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
