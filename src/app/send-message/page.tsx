'use client'
import { getCurrentUser } from '@/actions/action'
import SendMessage from '@/components/SendMessage'
import { useParams, useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

const SendMessageComponent = () => {

    const params = useSearchParams()

    const username: string | undefined | null = params?.get('to');



    return (
        <div className='bg-slate-900 h-screen w-full flex items-center justify-center'>
            {username ? <SendMessage sendMessageTo={username} /> : (
                <div className="text-white">
                    <h1>invalid link</h1>
                </div>
            )}
        </div>
    )
}

const Page = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <SendMessageComponent />
            </Suspense>
        </>
    )
}

export default Page