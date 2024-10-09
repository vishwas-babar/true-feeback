import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import prisma from "@/database/db"
import { signinSchema } from "@/schemas/signinSchema"

class InvalidLoginError extends CredentialsSignin {
    code = "invalid email or password try something else"

    constructor(errorMsg: string) {
        super()
        this.code = errorMsg
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'enter your email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                // check for the email validation
                // check if email exist in db or not and get that user if exist
                // then compare password with bcrypt
                // if pw is correct the check if user is verified or not 
                // if user is not verified then throw error to verify your email first
                // if verified then return the user
                const { email, password } = credentials;
                console.log(credentials)

                try {
                    const validation = signinSchema.safeParse({ email, password })

                    if (!validation.success && validation.error) {
                        // return null
                        throw new CredentialsSignin("invalid email or password")
                        throw new Error('invalid email or password')
                    }

                    const existingUser = await prisma.user.findFirst({
                        where: { email: email || "" },
                        select: {
                            id: true,
                            email: true,
                            password: true,
                            isVerified: true,
                            username: true,
                            isAcceptingMessage: true
                        },
                    })

                    if (!existingUser) {
                        throw new Error("There is no Account with this Email")
                    }

                    const isPasswordMatch = await bcrypt.compare(password as string, existingUser.password)

                    if (!isPasswordMatch) {
                        throw new Error('wrong password!')
                    }

                    if (isPasswordMatch && !existingUser.isVerified) {
                        throw new Error("You not verified your email address first verify it")
                    }

                    return {
                        id: existingUser.id || "",
                        username: existingUser.username,
                        email: existingUser.email,
                        isVerified: existingUser.isVerified,
                        isAcceptingMessages: existingUser.isAcceptingMessage,
                    };

                } catch (error) {
                    console.error(error)
                    throw new Error('unable it check user')
                }
            },

        },
            
        ),
    ],
    callbacks: {
        jwt: ({ token, user }) => {

            if (user) {
                token.id = user.id
                token.email = user.email
                token.username = user.username
                token.isVerified = user.isVerified
                token.isAcceptingMessages = user.isAcceptingMessages
            }

            return token
        }, 
        session: ({ session, token }) => {

            if (token) {
                session.user.email = token.email || ""
                session.user.id = token.id as string || ""
                session.user.isVerified = token.isVerified as boolean
                session.user.isAcceptingMessages = token.isAcceptingMessages as boolean
                session.user.username = token.username as string
            }

            return session;
        }
    },
    // pages: {
    //     signIn: '/signin',
    //     signOut: '/signout'
    // },
    session: {
        strategy: "jwt"
    },
    // secret: process.env.AUTH_SECRET
})


