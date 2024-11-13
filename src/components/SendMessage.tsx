'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Label } from './ui/label'

const SendMessage = ({ sendMessageTo }: { sendMessageTo: string }) => {

    const [username, setUsername] = useState(sendMessageTo)
    const [message, setMessage] = useState("")

    async function submitSendMessageForm(e: any) {
        e.preventDefault();
        try {
            const res = await axios.post('/api/messages/create-one', {
                toUsername: username,
                content: message
            })

            console.log("this is the response from backend: ", res.data)
        } catch (error) {
            console.log('error in sending message to user', error)
        }
    }

    return (
        <form onSubmit={submitSendMessageForm}>

            <Card className='w-96 dark:bg-color2'>

                <CardHeader>
                    <h2 className='text-xl text-center font-medium'>Send message</h2>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col w-full gap-3">

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
                        <Textarea
                            className='dark:bg-color1'
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='type your message...'
                        />

                    </div>
                </CardContent>

                <CardFooter className='flex justify-end'>
                    <Button type='submit' className=' bg-color3 hover:bg-color4 text-white'>Send message</Button>
                </CardFooter>
            </Card>

        </form>
    )
}

export default SendMessage