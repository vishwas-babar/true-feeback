"use client"
import React, { } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { signinSchema } from '@/schemas/signinSchema'
import { z } from 'zod'
import { signIn } from '@/auth'
import { handleSubmitSigninForm } from '@/actions/action'



const Signin = () => {



    return (
        <form className='' onSubmit={() => { }}>
            <Card className='w-80 backdrop-blur-lg bg-slate-800/50 border-slate-700 text-white shadow-[0px_0px_1px_0px_#f7fafc]'>
                <CardHeader className='bg-transparent'>
                    <CardTitle className="text-white">
                        Login
                    </CardTitle>

                    <CardDescription className="text-slate-300">
                        Enter your Email and Password
                    </CardDescription>
                </CardHeader>

                <CardContent className='flex bg-transparent flex-col gap-3'>
                    <div>
                        <Label htmlFor='email' className="text-white">
                            Email
                            <Input type='email' name='email' id='email' placeholder='Enter email' className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" />
                        </Label>
                    </div>

                    <div>
                        <Label htmlFor='password' className="text-white">
                            Password
                            <Input type='password' name='password' id='password' placeholder='Enter password' className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400" />
                        </Label>
                    </div>
                </CardContent>

                <CardFooter className='flex pb-3 bg-transparent flex-col gap-[2px] items-start'>
                    <Button variant={'default'} className='w-full bg-slate-800 hover:bg-slate-900 text-white font-medium' type='submit'>
                        Login
                    </Button>

                    <span className='text-sm text-slate-300'>
                        {" don't have an account,"} {" "}
                        <Link className='underline text-blue-400 hover:text-blue-300' href={'/sign-up'}>Sign up</Link>
                    </span>
                </CardFooter>
            </Card>
        </form>
    )

    // const form = useForm<z.infer<typeof signinSchema>>({
    //     resolver: zodResolver(signinSchema),
    //     defaultValues: {
    //         email: "",
    //         password: ""
    //     }
    // })

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    // async function submitForm(e: any) {
    //     e.preventDefault()

    //     const validation = signinSchema.safeParse({ email, password })

    //     if (!validation.success) {
    //         console.log(validation.error)
    //     }

    //     console.log(validation.data)

    //     try {
    //         const status = await signIn('credentials', {
    //             redirect: false,
    //             email: email,
    //             password: password
    //         })
    //     } catch (error) {
    //         console.log('failed to signin', error)
    //     }
    //   }


    // return (
    //     <form onSubmit={submitForm} className='flex flex-col'>
    //         <Input value={email} placeholder='email' onChange={e => setEmail(e.target.value)} />
    //         <Input value={password} placeholder='password' onChange={e => setPassword(e.target.value)} />

    //         <Button type='submit' />
    //     </form>
    // )
}

export default Signin