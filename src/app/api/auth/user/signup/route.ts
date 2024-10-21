import prisma from "@/database/db";
import { signupSchema } from "@/schemas/signupschema";
import { generateSixDigitOtp, sendVerificationEmail } from "@/utils/sendVerificaitonEmail";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { signIn } from "@/auth";
const saltRound = parseInt(process.env.SALT_ROUND || "");

export const POST = async (req: NextResponse) => {

    try {
        const { username, email, password } = await req.json();

        const validation = signupSchema.safeParse({ username, email, password })

        if (!validation.success && validation.error) {
            return NextResponse.json({ msg: "signup inputs are invalid", error: validation.error.message }, { status: 400 })
        }

        const userExistWithUsername = await prisma.user.findFirst({
            where: {
                username,
            },
            select: { id: true, username: true, email: true, isVerified: true }
        })

        if (userExistWithUsername && userExistWithUsername.isVerified) {
            return NextResponse.json({ message: "username is already taken" }, { status: 409 })
        }

        if (userExistWithUsername && !userExistWithUsername?.isVerified) {
            await prisma.user.delete({
                where: {
                    username,
                }
            })
        }

        const userExistWithEmail = await prisma.user.findFirst({
            where: { email },
            select: { id: true, email: true, isVerified: true }
        })

        if (userExistWithEmail?.isVerified) {
            return NextResponse.json({
                message: "account already exist with provided email, so please login"
            }, { status: 409 })
        }

        // if user exist with that email and its not verified then delete first account 
        if (userExistWithEmail && !userExistWithEmail.isVerified) {
            await prisma.user.delete({
                where: { id: userExistWithEmail.id }
            })
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, saltRound)

        const otp = generateSixDigitOtp()

        const expiryDateForOtp = new Date(Date.now() + (60 * 10 * 1000))
        // create the user in db
        const createdUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
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

            // delete the created user
            await prisma.user.delete({
                where: {
                    id: createdUser.id
                }
            })

            return NextResponse.json({ message: "failed to send the verification email" }, { status: 404 })
        }

        if (!createdUser) {
            return NextResponse.json({ message: 'unable to create the user' })
        }

        // await signIn('credentials', {
        //     email: createdUser.email,
        //     password: password
        // })

        return NextResponse.json({ message: 'created the user successfully, now verify it', createdUser }, { status: 201 })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: "unable to create user!" }, { status: 500 })
    }

}