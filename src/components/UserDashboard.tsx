import React from 'react'
import { Button } from './ui/button'
import AcceptingMessagesToggle from './AcceptingMessagesToggle'
import { auth } from '@/auth'

const UserDashboard = async () => {

    const session = await auth();

    if (!session) {
        return (
            <div>
                <h1>you are no logged in</h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col mx-auto p-4  w-2/3'>
            <h3 className="scroll-m-20  text-2xl font-semibold tracking-tight">
                User Dashboard
            </h3>
            <div className='mt-6' >
                <div className='flex w-full border px-4 py-4 rounded-md justify-between items-center'>
                    <p>
                        link
                    </p>

                    <Button variant={'default'}>Copy</Button>
                </div>


            </div>
            
            <AcceptingMessagesToggle isAcceptingMessageProp={false} />

            <div className='w-[40rem] mx-auto h-80 border mt-0 p-4 rounded-md shadow-gray-900 shadow-xl '>
                
            </div>
        </div>
    )
}

export default UserDashboard