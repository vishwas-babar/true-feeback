import Signup from '@/components/Signup'
import React from 'react'

// this is the sign up page
const page = () => {
  return ( 
    <div className='h-screen w-full flex items-center justify-center'>

      <div className='flex flex-col items-center justify-center'>
        <Signup />
      </div>


    </div>
  )
}

export default page