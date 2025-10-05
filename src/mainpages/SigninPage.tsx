import ReacthookformSignin from '@/components/ReacthookformSignin'
import Signin from '@/components/Signin'
import React from 'react'

const SigninPage = () => {
  return (
    <div className='w-full bg-slate-900 h-screen flex items-center justify-center'>
      {/* <Signin /> */}
      <ReacthookformSignin />
    </div>
  )
}

export default SigninPage