'use server'
import { signupSchema } from "@/schemas/signupschema"
import axios from "axios"
import { BACKEND_URL } from "../../variables"


type FormState = {
    success: boolean,
    message?: string,
    errorType: 'emailAlreadyExist' | 'usernameTaken' | 'shortPassword' | 'validationError'
}

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

        return {
            success: true,
            message: "user created, you need to verify your email!",
            errors: {
                username: "",
                email: "",
                password: ""
            },
            user: {
                email: res.data.createdUser.email
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
            }
        }
    }

}