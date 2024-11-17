'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MessageCard from './MessageCard'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
interface Message {
    id: string,
    content: string,
    createdAt: Date,
    receiverId: string,
}

interface CurrentMessageState extends Omit<Message, 'createdAt'> {
    createdAt: string
}

const UserMessages = () => {

    const [messages, setMessages] = useState<Message[]>()
    const [isMessageReadModalOpen, setIsMessageReadModalOpen] = useState(true)
    const [currentMessage, setCurrentMessage] = useState<CurrentMessageState>({
        id: "",
        content: "",
        createdAt: "",
        receiverId: ""
    })

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

        const milliseconds = now.getTime() - givenDate.getTime();
        const seconds = Math.floor(milliseconds / 1000);
        if (seconds < 60) return `${seconds} seconds ago`;

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;

        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;

        const days = Math.floor(hours / 24);
        if (days < 7) return `${days} days ago`;

        const weeks = Math.floor(days / 7);
        if (weeks < 4) return `${weeks} weeks ago`;

        const months = Math.floor(days / 30);
        if (months < 12) return `${months} months ago`;

        const years = Math.floor(days / 365);
        return `${years} years ago`;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                messages.map(message => (

                    <MessageCard
                        key={message.id}
                        message={message.content}
                        time={getConvertedDate(message.createdAt)}
                        onclick={() => {
                            setIsMessageReadModalOpen(true)
                            setCurrentMessage({
                                ...message,
                                createdAt: getConvertedDate(message.createdAt)
                            })
                        }}
                    />
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


            <ReadMessageModal content={currentMessage.content} createdAt={currentMessage.createdAt} isOpen={isMessageReadModalOpen} setIsMessageReadModalOpen={setIsMessageReadModalOpen} />
        </div>
    )
}

const ReadMessageModal = ({ content = "", createdAt = "", isOpen = true, setIsMessageReadModalOpen }: {
    content: string,
    createdAt: string,
    isOpen: boolean,
    setIsMessageReadModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    return (
        <AnimatePresence>
            {isOpen && <motion.div
                onClick={() => setIsMessageReadModalOpen(false)}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed top-0 left-0 w-full h-full  bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white relative dark:bg-color1 overflow-y-auto w-96 h-96 rounded-lg flex flex-col gap-4 p-4 shadow-[0px_0px_1px_0px_#f7fafc]">
                    <h1 className="text-xl font-semibold">Message</h1>
                    <p className="text-slate-300 text-base font-normal">{content}</p>
                    <p className="text-gray-500 absolute text-sm right-4 bottom-3">{createdAt}</p>

                        
                    <div className='absolute top-2 right-2 p-1 rounded-full flex itemce justify-center border hover:scale-105 transition-all ease-linear cursor-pointer'>
                    <X className=' size-5 ' />
                    </div>
                </motion.div>
            </motion.div>}

        </AnimatePresence>
    )
}

export default UserMessages