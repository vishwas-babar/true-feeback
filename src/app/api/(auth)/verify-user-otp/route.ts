import { signIn } from "@/auth";
import prisma from "@/database/db";
import { signupSchema } from "@/schemas/signupschema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const verifyUserSchema = signupSchema.pick({ email: true })

const extendedUserSchema = verifyUserSchema.extend({
    verifyCode: z.string()
        .max(6, "verify code must be a 6-digit number")
        .min(6, "verify code must be a 6-digit number")
        .regex(/^\d+$/, {
            message: "Only digits are allowed",
        })
})

export const POST = async (req: NextRequest) => {

    try {
        const { email, verifyCode } = await req.json()

        const result = extendedUserSchema.safeParse({
            email,
            verifyCode
        });

        if (!result.success) {
            const userEmailError = result.error.format().email?._errors || []
            const userOtpError = result.error.format().verifyCode?._errors || []

            const allErros = [...userEmailError, ...userOtpError]

            return NextResponse.json({
                success: false,
                message: allErros.length > 0 ? allErros.join(', ') : "please provide proper body"
            }, {
                status: 400
            })
        }

        const userToVerify = await prisma.user.findFirst({
            where: {
                email: result.data.email,
                isVerified: false,
            },
            select: {
                email: true,
                verifyCode: true,
                id: true,
                verifyCodeExpiry: true
            }
        })

        if (!userToVerify) {
            return NextResponse.json({
                success: false,
                message: "account does not exist with following email or its already verified " + result.data.email
            })
        }

        const isDateExpired = new Date(userToVerify?.verifyCodeExpiry) < new Date()

        if (isDateExpired) {
            return NextResponse.json({
                success: false,
                message: "verify code is expired, you can create new account again with same email."
            }, { status: 406 })
        }

        const isVerifyCodeMatch = parseInt(userToVerify.verifyCode) === parseInt(result.data.verifyCode)

        if (!isVerifyCodeMatch) {
            return NextResponse.json({
                success: false,
                message: "verification failed code does not match"
            }, { status: 401 })
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: userToVerify.email
            },
            data: {
                isVerified: true
            }
        })

        if (!updatedUser) {
            return NextResponse.json({
                success: false,
                message: "verification failed, please try after some time"
            }, { status: 500 })
        }

        // return NextResponse.redirect(new URL('/dashboard', req.url))

        return NextResponse.json({
            success: true,
            message: "Your Email is verified now."
        }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "failed to verify user"
        }, { status: 500 })
    }
}