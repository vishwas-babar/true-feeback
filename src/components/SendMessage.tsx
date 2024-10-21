'use client'
import axios from 'axios'
import React, { useState } from 'react'

const SendMessage = () => {

    const [username, setUsername] = useState("")
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

            <input type="text" onChange={(e) => {
                setUsername(e.target.value)
            }} placeholder='send to' />

            <input type="text"
                onChange={(e) => setMessage(e.target.value)}
                placeholder='message' />

            <button type="submit">send message</button>

        </form>
    )
}

export default SendMessage