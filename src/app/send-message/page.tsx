'use client'
import { getCurrentUser } from '@/actions/action'
import SendMessage from '@/components/SendMessage'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {

    const params = useSearchParams()

    const username: string | undefined | null = params?.get('to');

   

    return (
        <div className='bg-color1  h-screen w-full flex items-center justify-center'>
            {username ? <SendMessage sendMessageTo={username} /> : (
                <>
                    <h1>invaid link</h1>
                </>
            )}
        </div>
    )
}

export default page