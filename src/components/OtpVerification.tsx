'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp'
import { Button } from './ui/button'
import { verifySchema } from '@/schemas/verifycodeschema'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { SubmitBtn } from './Signup'
import { useRouter } from 'next/navigation'

const OtpVerification = ({ isActive }: {
    isActive: boolean,
}) => {

    const { toast } = useToast()

    const router = useRouter()

    const [value, setValue] = useState("")


    async function verifyOTP() {
        // do the validation
        const validate = verifySchema.safeParse({
            code: parseInt(value)
        })

        if (!validate.success) {
            console.log(validate.error)
        }

        try {
            const res = await axios.post(`/api/verify-user-otp`, {
                email: localStorage.getItem('userEmail'),
                verifyCode: value
            })

            if (!res.data) {
                throw new Error("failed to verify code")
            }

            toast({
                title: "Email Verified",
                description: res.data.message
            })
            window.location.href = '/dashboard'
        } catch (error) {
            console.log("error: ", error)
            toast({
                title: "failed to verify the otp.",
                description: "Try again letter"
            })
        }
    }


    return (
        <>
            <Card className={`absolute backdrop-blur-lg bg-slate-800/50 border-slate-700 text-white shadow-[0px_0px_1px_0px_#f7fafc] ${isActive ? "" : "hidden"}`}>
                <form action={verifyOTP}>

                    <CardHeader>
                        <CardTitle className="text-white">
                            OTP Verification
                        </CardTitle>

                        <CardDescription className="text-slate-300">
                            Enter your verification code, sent on your Email.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className='flex w-full justify-center'>

                        <InputOTP
                            maxLength={6}
                            value={value}
                            onChange={(value) => setValue(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>

                    <CardFooter className='w-full flex justify-end'>

                        <SubmitBtn label='Verify' loading="verifying..." classname="bg-slate-800 hover:bg-slate-900 text-white" />
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}

export default OtpVerification