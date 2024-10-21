'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { handleSubmitSignupForm } from '@/actions/action';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Form, useForm } from 'react-hook-form';
import { string } from 'zod';
import { useToast } from '@/hooks/use-toast';
import Overlay from './Overlay';
import OtpVerification from './OtpVerification';
import CheckBox from './CheckBox';
import Tickmark from './Tickmark';
import Spinner from './Spinner';
import axios from 'axios';

interface errorType {
    success: boolean,
    message: string,
    errors: {
        username: string | undefined;
        email: string | undefined;
        password: string | undefined;
    },
    user: {
        email: string
    }
}

const Signup = () => {

    const [state, formAction] = useFormState<errorType>(handleSubmitSignupForm, {
        success: false,
        message: "",
        errors: {
            username: undefined,
            email: undefined,
            password: undefined
        },
        user: {
            email: undefined
        }
    })

    // for the overlay
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isOtpVerificationModelOpen, setIsOtpVerificationModelOpen] = useState(false)

    const { toast } = useToast();

    useEffect(() => {
        if (!state.success) {
            if (state.message) {
                toast({
                    variant: 'destructive',
                    title: "Failed to create user.",
                    description: state.message
                })
            }
        }

        if (state.success) {
            toast({
                title: "User Created.",
                description: state.message
            })

            if (state.user.email) {
                localStorage.setItem('userEmail', state.user.email)
            }

            setIsOverlayOpen(true)
            setIsOtpVerificationModelOpen(true)
        }

        return () => {

        }
    }, [state])

    const [username, setUsername] = useState("")
    const [usernameStatus, setUsernameStatus] = useState({
        isLoading: false,
        isAvailable: false,
    })

    useEffect(() => {

        if (username === "") {
            return
        }

        const id = setTimeout(() => {
            setUsernameStatus(prev => ({
                isAvailable: false,
                isLoading: true
            }))

            axios.post('/api/check-username-uniqueness', {
                username
            })
                .then(res => {
                    if (!res.data) {
                        throw new Error("unable to check username")
                    }

                    setUsernameStatus(prev => ({
                        isAvailable: true,
                        isLoading: false
                    }))
                })
                .catch(err => {
                    console.log("error while checking username", err)
                    setUsernameStatus(prev => ({
                        isAvailable: false,
                        isLoading: false
                    }))
                })

        }, 1000);

        return () => {
            clearTimeout(id)
        }
    }, [username])

    return (
        <>
            <form action={formAction}>
                <Card className='w-80'>

                    <CardHeader>

                        <CardTitle >
                            Sign up
                        </CardTitle>

                        <CardDescription>
                            Create new account
                        </CardDescription>
                    </CardHeader>

                    <CardContent className='flex flex-col gap-2' >

                        <div>
                            <Label htmlFor='username'>
                                Username
                            </Label>

                            <div className='flex relative'>

                                <Input
                                    className='w-full'
                                    value={username}
                                    name='username'
                                    id='username'
                                    placeholder='username'
                                    type='text'
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <Spinner isActive={usernameStatus.isLoading} classname='absolute right-2 top-2 ' />
                                <Tickmark isActive={usernameStatus.isAvailable} classname='absolute -right-8 top-1/2 transform -translate-y-1/2 scale-[0.3]' />
                                {/* <CheckBox isActive={} classname='absolute right-2 top-1/2 transform -translate-y-1/2' /> */}
                            </div>

                            <ErrorField name='username' errorState={state} />
                        </div>


                        <div>
                            <Label htmlFor='email'>
                                email
                            </Label>
                            <Input name='email' id='email' placeholder='email' type='email' />
                            <ErrorField name='email' errorState={state} />
                        </div>

                        <div>
                            <Label htmlFor='password'>
                                password
                            </Label>
                            <Input name='password' id='password' placeholder='password' type='password' />
                            <ErrorField name='password' errorState={state} />
                        </div>
                    </CardContent>

                    <CardFooter className='flex pb-3 flex-col gap-[2px] items-start'>

                        <SubmitBtn label='Sign up' loading="loading..." classname='w-full' />

                        <span className='text-sm'>
                            Already have an account, {" "}
                            <Link className='underline text-blue-900' href={'/sign-in'}>Login</Link>
                        </span>
                    </CardFooter>
                </Card>
            </form>
            <Overlay isActive={isOverlayOpen} />
            <OtpVerification isActive={isOtpVerificationModelOpen} />
        </>
    )
}

const ErrorField = ({ errorState, name, classname = "" }: {
    errorState: errorType,
    name: string,
    classname?: string
}) => {

    return (
        <span className='text-xs text-nowrap text-red-600'  >
            {errorState.errors[name]}
        </span>
    )
}

export const SubmitBtn = ({ label, loading, classname = "" }: {
    label: string,
    loading: React.ReactNode,
    classname: string,
}) => {

    const { pending } = useFormStatus();

    return (
        <Button
            type='submit'
            className={classname}
            variant={'default'}
            disabled={pending}
        >
            {pending ? loading : label}
        </Button>
    )
}

export default Signup;