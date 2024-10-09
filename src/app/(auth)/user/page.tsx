// 'use client'

import React, { useEffect } from 'react'
import { auth } from '../../../auth'
import { useSession } from 'next-auth/react'
import ClientSession from './ClientSession'

const page = async () => {

  const session = await auth()

  if (!session) {
    return <div className='w-full mt-60 text-3xl text-white font-semibold flex items-end justify-center'>you are not authenticated</div>
  }

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center'>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold'>User Dashboard</h1>
        <p className='text-lg'>Welcome to the User Dashboard</p>
        <div>
          {session && <p>{JSON.stringify(session)}</p>}
        </div>
      </div>

      <ClientSession />
      {/*  */}

    </div>
  )
}

export default page
