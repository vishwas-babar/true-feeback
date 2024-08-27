import prisma from "@/database/db";
import { signupSchema } from "@/schemas/signupschema";
import { generateSixDigitOtp, sendVerificationEmail } from "@/utils/sendVerificaitonEmail";
import { NextResponse } from "next/server";



export const POST = async (req: NextResponse) => {

    try {
        const { username, email, password } = await req.json();

        const validation = signupSchema.safeParse({ username, email, password })

        if (!validation.success && validation.error) {
            return NextResponse.json({ msg: "signup inputs are invalid", error: validation.error.message })
        }

        const userExistWithUsername = await prisma.user.findFirst({
            where: {
                username
            },
            select: { id: true, username: true, email: true }
        })

        if (userExistWithUsername) {
            return NextResponse.json({ msg: "username is already taken" }, { status: 409 })
        }

        const userExistWithEmail = await prisma.user.findFirst({
            where: { email },
            select: { id: true, email: true }
        })

        if (userExistWithEmail) {
            return NextResponse.json({ msg: "account already exist with that email" }, { status: 409 })
        }

        const otp = generateSixDigitOtp()


        const expiryDateForOtp = new Date(Date.now() + (60 * 10 * 1000))
        // create the user in db
        const createdUser = await prisma.user.create({
            data: {
                email,
                username,
                password,
                verifyCode: otp,
                verifyCodeExpiry: expiryDateForOtp
            },
            select: {
                email: true,
                username: true,
                id: true
            }
        })

        const { success, error } = await sendVerificationEmail(email, createdUser.username, otp)

        if (!success) {
            console.log("failed to send the email...", error)
            return NextResponse.json({ msg: "failed to send the verification email with resend" }, { status: 404 })
        }

        if (!createdUser) {
            return NextResponse.json({ msg: 'unable to create the user' })
        }

        return NextResponse.json({ msg: 'created the user successfully, now verify it', createdUser }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ msg: "unable to create user!" }, { status: 500 })
    }

}