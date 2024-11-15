"use client"
import React, {  } from 'react'
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

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")


    return (
        <form className='' action={handleSubmitSigninForm}>
            <Card className='w-80 dark:bg-color2'>
                <CardHeader className='bg-transparent'>
                    <CardTitle>
                        Login
                    </CardTitle>

                    <CardDescription>
                        Enter your Email and Password
                    </CardDescription>
                </CardHeader>

                <CardContent className='flex bg-transparent flex-col gap-3'>
                    <div>
                        <Label htmlFor='email'>
                            Email
                            <Input type='email' name='email' id='email' placeholder='Enter email' />
                        </Label>
                    </div>

                    <div>
                        <Label htmlFor='password'>
                            Password
                            <Input type='password' name='password' id='password' placeholder='Enter password' />
                        </Label>
                    </div>
                </CardContent>

                <CardFooter className='flex pb-3 bg-transparent flex-col gap-[2px] items-start'>
                    <Button variant={'default'} className='w-full bg-color3 text-white font-medium hover:bg-green-800 ' type='submit'>
                        Login
                    </Button>

                    <span className='text-sm'>
                       {" don't have an account,"} {" "}
                        <Link className='underline text-blue-900' href={'/sign-up'}>Sign up</Link>
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