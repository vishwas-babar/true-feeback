'use client'
import { signinSchema } from '@/schemas/signinSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { handleSubmitSigninForm } from '@/actions/action';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const ReacthookformSignin = () => {

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  async function submitForm(data: any) {

    setIsSubmiting(true)

    console.log("this is the form Data: ", data)
    // e.preventDefault()

    try {
      const res = await handleSubmitSigninForm(data)

      if (!res.success) {
        toast({
          title: res.message || "An error occured",
          variant: 'destructive'
        })
        setIsSubmiting(false)
        return
      }

      toast({
        title: res.message || "User Signed in",
      })

      window.location.href = '/dashboard'
    } catch (error: any) {

      toast({
        title: error.message || "An error occured",
        variant: "destructive"
      })
      setIsSubmiting(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <Card className='w-80 backdrop-blur-lg bg-slate-800/50 border-slate-700 text-white shadow-[0px_0px_1px_0px_#f7fafc]'>
            <CardHeader>
              <CardTitle className="text-white">
                Signin
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter your Email and Password
              </CardDescription>
            </CardHeader>

            <CardContent className='flex flex-col gap-5'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='email'
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        {...field}
                      // onChange={(e: React.FormEvent<HTMLInputElement>) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='password'
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                        {...field}
                      // onChange={(e: React.FormEvent<HTMLInputElement>) => field.onChange(e)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className='flex flex-col items-start'>
              <Button disabled={isSubmiting} variant={'default'} className='w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-medium' type='submit'>
                {isSubmiting ? (
                  <>
                    <Loader2 className='size-4 animate-spin' />
                    Please Wait
                  </>
                ) : ("Sign in")}
              </Button>
              <span className='text-sm text-slate-300'>
                {" don't have an account,"} {" "}
                <Link className='underline text-blue-400 hover:text-blue-300' href={'/sign-up'}>Sign up</Link>
              </span>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  )
}

export default ReacthookformSignin