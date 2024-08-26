import React from 'react'
import { Button } from './ui/button'

const UserDashboard = () => {
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
            <div className='mt-8'>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultValue="" className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Accept Message: off
                    </span>
                </label>
            </div>

            <div className='w-[40rem] mx-auto h-80 border mt-0 p-4 rounded-md shadow-gray-900 shadow-xl '>
                
            </div>
        </div>
    )
}

export default UserDashboard