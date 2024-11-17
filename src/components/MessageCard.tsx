import React from 'react'
import { CardSpotlight } from './ui/card-spotlight'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Mail, MessageCircle } from 'lucide-react'

const MessageCard = ({ message, time, classname, onclick }: {
    message: string,
    time: string,
    classname?: string,
    onclick?: () => void
}) => {
    return (
        <CardSpotlight onClick={onclick} className={`w-full hover:cursor-pointer flex flex-col pr-0 gap-2 pt-7 pl-5 h-24  ${classname}`}>
            <div className='flex justify-start gap-4 items-center'>
                <Mail />
                {message}
            </div>
            <div className='w-full flex justify-end pr-2'>
                <span className=' dark:text-gray-600 text-sm '>
                    {time}
                </span>
            </div>
        </CardSpotlight>
    )
}

export default MessageCard