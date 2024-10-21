import prisma from "@/database/db";
import { signupSchema } from "@/schemas/signupschema";
import { NextRequest, NextResponse } from "next/server";

const usernameSchema = signupSchema.pick({ username: true })

export const POST = async (req: NextRequest) => {

    try {
        // const { searchParams } = new URL(req.url)
        // const queryParams = {
        //     username: searchParams.get('username')
        // }

        const { username } = await req.json();

        const result = usernameSchema.safeParse({ username})

        console.log('result: ', result)

        if (!result.success) {

            const usernameErrors = result.error.format().username?._errors || []

            return NextResponse.json({
                success: false,
                message: usernameErrors.length > 0 ? usernameErrors.join(', ') : "invalid username provided in queryparamter"
            }, { status: 400 })
        }

        // check if username is unique or not in db
        const foundUser = await prisma.user.findFirst({
            where: {
                username: result.data.username
            },
            select: {
                username: true,
                isVerified: true
            }
        }) 

        // user found that means user is already exist with that username
        if (foundUser ) {
            return NextResponse.json({
                success: false,
                message: "user exist with provied username"
            }, { status: 409 })
        }


        return NextResponse.json({
            success: true,
            message: "this username is available"
        }, { status: 202 })

    } catch (error) {
        console.log('error while checking the username')

        return NextResponse.json({
            success: false,
            message: "error checking username"
        }, { status: 500 })
    }
}