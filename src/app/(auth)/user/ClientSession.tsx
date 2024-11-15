'use client'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const ClientSession = () => {


    const { update, data, status } = useSession()


    if (status === 'loading') {
        return <div className='w-full mt-60 text-3xl text-white font-semibold flex items-end justify-center'>loading...</div>
        
    }


    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <h1 className='text-3xl font-bold'
            >Client Session</h1>
            <p className='text-lg' >Welcome to the Client Session
            </p>

            <div>
                {data && <p>{JSON.stringify(data)}</p>}
            </div>


        </div>
    )
}

export default ClientSession