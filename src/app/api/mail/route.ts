import VerificationEmailTemplate from "@/components/email formats/VerificationEmailFormat";
import prisma from "@/database/db";
import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {

    const { username, sendEmailTo }: { username: string, sendEmailTo: string } = await req.json()

    try {
        const { data, error } = await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [sendEmailTo],
            subject: "otp for the verification true feedback",
            react: VerificationEmailTemplate({ username: 'vishwas77', verificationCode: '342345' })
        })

        if (error) {
            console.log(error)
            return NextResponse.json({
                msg: "unable to send email",
                error
            }, { status: 500 })
        }

        return NextResponse.json({
            msg: 'email sent'
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            msg: "unable to send email",
            error
        }, { status: 500 })
    }

}