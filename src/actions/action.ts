'use server'
import { signupSchema } from "@/schemas/signupschema"
import axios from "axios"
import { BACKEND_URL } from "../../variables"
import { signinSchema } from "@/schemas/signinSchema"
import { signIn } from "@/auth"
import { redirect, RedirectType } from "next/navigation"
import prisma from "@/database/db"
import { CredentialsSignin } from "next-auth"


export async function handleSubmitSignupForm(previousState: any, formData: FormData) {


    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    const validation = signupSchema.safeParse({
        username,
        email,
        password
    })


    if (!validation.success) {

        return {
            success: false,
            message: "",
            errors: {
                username: validation.error.format().username?._errors[0],
                email: validation.error.format().email?._errors[0],
                password: validation.error.format().password?._errors[0]
            },
            user: {
                email: undefined
            }
        }
    }

    try {
        const res = await axios.post(`${BACKEND_URL}/auth/user/signup`, {
            username,
            email,
            password
        })

        if (!res.data) {
            console.log(res)
        }

        console.log(res.data)

        const signinStatus = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password
        })

        return {
            success: true,
            message: "user created, you need to verify your email!",
            errors: {
                username: "",
                email: "",
                password: ""
            },
            user: {
                email: res.data.createdUser.email as string || ""
            }
        }
    } catch (error: any) {
        console.log("error in creating the user")
        console.log(error.response.data)

        console.log("response in error: ", error.response)
        return {
            success: false,
            message: error.response.data.message,
            errors: {
                username: "",
                email: "",
                password: ""
            },
            user: {
                email: ""
            }
        }
    }

}

export async function handleSubmitSigninForm(formData: { email: string, password: string }) {

    const { email, password } = formData

    const validation = signinSchema.safeParse({ email, password })

    if (!validation.success) {
        console.log(validation.error)
    }

    console.log(validation.data)

    try {
        const signinStatus = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            // redirectTo: '/dashboard'
        })

        console.log('this is is the returned data from signin: ', signinStatus)

        return {
            success: true,
            message: "User loged in."
        }
    } catch (error: any) {
        console.log('failed to signin', error.cause?.err?.message)
        console.log('failed to signin', error.code)

        const errorMessage: string | undefined = error.cause?.err?.message;

        if (error instanceof CredentialsSignin) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        success: false,
                        type: 'error',
                        message: 'Invalid credential!'
                    }
                    break;

                default:
                    return {
                        success: false,
                        type: 'error',
                        message: 'something went wrong!, try again later'
                    }
                    break;
            }
        }
        else if (errorMessage === 'no_account_with_email')
            return {
                success: false,
                type: 'error',
                message: 'there is no account with provided email.'
            }
        else if (errorMessage === 'wrong_password')
            return {
                success: false,
                type: 'error',
                message: 'wrong password'
            }
        else
            return {
                success: false,
                type: 'error',
                message: 'something went wrong! try again later.'
            }


        return {
            success: false,
            message: "something went wrong! try again letter"
        }
    }
}


export async function getCurrentUser(id: string) {
    try {
        const userInDb = await prisma.user.findFirst({
            where: {
                id: id
            },
            select: {
                username: true,
                email: true,
                id: true,
                isAcceptingMessage: true,
                isVerified: true,

            }
        })

        return {
            success: true,
            user: userInDb
        }
    } catch (error) {
        return {
            success: false,
            user: undefined
        }
    }
}