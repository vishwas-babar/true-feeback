'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MessageCard from './MessageCard'

interface Message {
    id: string,
    content: string,
    createdAt: Date,
    receiverId: string,
}

const UserMessages = () => {

    const [messages, setMessages] = useState<Message[]>()

    useEffect(() => {


        axios.get('/api/messages/get-users-messages')
            .then(res => {
                console.log('this is res for get users messages: ', res.data)
                setMessages(res.data.messages)
            })
            .catch(err => {
                console.log('failed to load the users messages...: ', err)
            })

        return () => {

        }
    }, [])

    if (!messages) {
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-2xl text-gray-500">Loading...</h1>
            </div>
        )
    }

    if (messages && messages.length === 0) {
        return (
            <div className="flex justify-center items-center h-96">
                <h1 className="text-2xl text-gray-500">You have no messages yet! 🫡</h1>
            </div>
        )
    }

    function getConvertedDate(date: Date) {
        const givenDate = new Date(date);
        const now = new Date();

        const minutes = Math.floor(now.getMinutes() - givenDate.getMinutes());
        if (minutes < 60)
            return `${minutes} minutes ago`

        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours} hours ago`

        const days = Math.floor(hours / 24);
        if (days < 30)
            return `${days} days ago`

        const weeks = Math.floor(days / 7);
        if (weeks < 4)
            return `${weeks} weeks ago`

        const months = Math.floor(weeks / 4);
        if (months < 48)
            return `${months} months ago`

        const years = Math.floor(months / 12);
        return `${years} years ago`
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                messages.map(message => (
                    <MessageCard key={message.id} message={message.content} time={getConvertedDate(message.createdAt)} />
                ))
            }

            {/* <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' />
            <MessageCard message="you have new message" time='10 days ago' /> */}
        </div>
    )
}

export default UserMessages