'use client'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Label } from './ui/label'
import { messageSchema } from '@/schemas/messageSchema'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Send, SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SendMessage = ({ sendMessageTo }: { sendMessageTo: string }) => {

    const [username, setUsername] = useState(sendMessageTo)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const [message, setMessage] = useState("")
    const { toast } = useToast()
    const router = useRouter()

    async function submitSendMessageForm(e: any) {
        e.preventDefault();

        setIsSubmiting(true);
        const validation = messageSchema.safeParse({ content: message })

        if (!validation.success) {
            console.log(validation.error)
            toast({
                title: "Invalid message",
                description: validation.error.format().content?._errors[0],
                variant: 'destructive'
            })
            return setIsSubmiting(false);
        }

        try {
            const res = await axios.post('/api/messages/create-one', {
                toUsername: username,
                content: message
            })

            if (!res.data.success) {
                toast({
                    title: res.data.message || "An error occured",
                    variant: 'destructive'
                })
                return setIsSubmiting(false)
            }

            toast({
                title: "Message sent successfully"
            })
        } catch (error: any) {
            console.log('error in sending message to user', error)

            if (error.response.status === 401) {
                toast({
                    title: "You need to login first",
                    variant: 'destructive'
                })
                router.push('/sign-in')
            } else if (error.response.status === 400) {
                toast({
                    title: "Invalid message",
                    description: error.response.data.message,
                    variant: 'destructive'
                })
            } else if (error.response.status === 404) {
                toast({
                    title: "User not found",
                    description: error.response.data.message,
                    variant: 'destructive'
                })
            } else if (error.response.status === 406) {
                toast({
                    title: "user not accepting feeback",
                    description: error.response.data.message,
                })
            } else {
                toast({
                    title: "An error occured",
                    description: error.response.data.message,
                    variant: 'destructive'
                })
            }
        }

        return setIsSubmiting(false)
    }

    return (
        <form onSubmit={submitSendMessageForm}>

            <Card className='w-96 dark:bg-color2'>

                <CardHeader>
                    <h2 className='text-xl flex gap-2 justify-center items-center text-center font-medium'>
                        Send message
                        <Send className='size-5' />
                    </h2>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col w-full gap-3">

                        <div>

                            <Label htmlFor='username'>
                                Username:
                            </Label>
                            <Input name='username' id='username' type='text'
                                className='dark:bg-color1'
                                value={username}
                                disabled
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </div>
                        <Textarea
                            className='dark:bg-color1'
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='type your message...'
                        />

                    </div>
                </CardContent>

                <CardFooter className='flex justify-end'>
                    <Button disabled={isSubmiting} type='submit' className=' bg-color3 flex items-center justify-center gap-2 hover:bg-color4 text-white'>
                        {isSubmiting ? (
                            <>
                                <Loader2 className='size-4 animate-spin' /> {'Sending...'}
                            </>
                        ) : (
                            <>
                                Send <SendHorizonal className='size-4' />
                            </>
                        )}

                    </Button>
                </CardFooter>
            </Card>

        </form>
    )
}

export default SendMessage