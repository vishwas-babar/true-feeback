import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Link from 'next/link'

const Signin = () => {
    return (
        <form>
            <Card className='w-80'>
                <CardHeader>
                    <CardTitle>
                        Login
                    </CardTitle>

                    <CardDescription>
                        Enter your Email and Password
                    </CardDescription>
                </CardHeader>

                <CardContent className='flex flex-col gap-3'>
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

                <CardFooter className='flex pb-3 flex-col gap-[2px] items-start'>
                    <Button variant={'default'} className='w-full ' type='submit'>
                        Login
                    </Button>

                    <span className='text-sm'>
                        don't have an account, {" "}
                        <Link className='underline text-blue-900' href={'/sign-up'}>Sign up</Link>
                    </span>
                </CardFooter>
            </Card>
        </form>
    )
}

export default Signin