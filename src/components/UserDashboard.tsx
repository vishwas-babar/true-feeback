import React from 'react'
import { Button } from './ui/button'
import AcceptingMessagesToggle from './AcceptingMessagesToggle'
import { auth } from '@/auth'
import MessageCard from './MessageCard'
import { ScrollArea } from './ui/scroll-area'
import axios from 'axios'
import { BACKEND_URL } from '../../variables'
import UserMessages from './UserMessages'
import { getCurrentUser } from '@/actions/action'
import FeedbackUrl from './FeedbackUrl'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'

const UserDashboard = async ({ req }: { req: NextRequest }) => {

    const session = await auth();

    if (!session) {
        return (
            <div>
                <h1>you are no logged in</h1>
            </div>
        )
    }

    const user = await getCurrentUser(session.user.id || "")
    console.log('user: ', user)

    return (
        <div className='flex flex-col mx-auto p-4 w-full sm:w-2/3'>
            <h3 className="scroll-m-20  text-2xl font-semibold tracking-tight">
                User Dashboard
            </h3>

            <FeedbackUrl username={user.user?.username || ""} />

            <AcceptingMessagesToggle isAcceptingMessageProp={user.user?.isAcceptingMessage || false} />

            <ScrollArea className="w-full h-96 border mt-4 p-4 rounded-md shadow-gray-900 shadow-xl">
                <UserMessages />
            </ScrollArea>
        </div>
    )
}

export default UserDashboard