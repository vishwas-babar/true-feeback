'use client'
import React, { useEffect, useState } from 'react'
import MessageCard from '../MessageCard'; 
import { motion } from 'framer-motion';


const demoMessages: {
    message: string,
    time: string,
}[] = [
        { message: "Great job on the presentation! Your points were clear and well-articulated.", time: "10 days ago" },
        { message: "Your attention to detail is impressive. Keep up the good work!", time: "4 hours ago" },
        { message: "I appreciate your positive attitude and willingness to help others.", time: "30 minutes ago" },
        { message: "Your creativity in problem-solving is a valuable asset to the team.", time: "1 day ago" },
        { message: "Excellent work on the project! Your dedication and hard work paid off.", time: "2 days ago" },
        { message: "Your communication skills have improved significantly. Keep it up!", time: "3 hours ago" },
        { message: "Thank you for your proactive approach in addressing issues. It makes a big difference.", time: "5 days ago" },
        { message: "Your ability to stay calm under pressure is admirable. Well done!", time: "1 hour ago" },
        { message: "Great teamwork! Your collaboration with others is highly appreciated.", time: "6 hours ago" },
        { message: "Your enthusiasm and passion for your work are contagious. Keep inspiring us!", time: "10 minutes ago" },
    ];
const MessageSlider = () => {

    const [current, setCurrent] = useState(Math.floor(demoMessages.length / 2));

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrent(prev => {
                if (prev === demoMessages.length - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, 3000);

        return () => {

        }
    }, [])

    const handleNext = () => {
        if (current === demoMessages.length - 1) {
            setCurrent(0)
        } else {
            setCurrent(current + 1)
        }
    }

    const centerElementClass = " z-20 opacity-1 scale-1"
    const leftElementClass = "absolute opacity-60 scale-90 -translate-y-20 -translate-x-96"
    const rightElementClass = "absolute opacity-60 scale-90 translate-y-20 translate-x-96"
    const defaultElementClass = "absolute scale-75 opacity-0  "


    const getTheClassName = (index: number) => {
        if (index === current) {
            return centerElementClass
        }
        else if (index === current - 1 || index === current + 1) {
            return index === current - 1 ? leftElementClass : rightElementClass
        }
        return defaultElementClass
    }

    return (
        <div className={`relative flex justify-center items-center overflow-x-hidden w-full h-fit`}>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}

                className='h-80  relative flex items-center justify-center gap-10 w-80rem'>

                {demoMessages.map((message, index) => {

                    return <MessageCard key={index} classname={`transition-all duration-500 ease-in-out w-96 h-32 shadow-2xl shadow-blue-500/20 border    ${getTheClassName(index)} `} message={message.message} time={message.time} />
            })}

                {/* <MessageCard classname={` transition-all ease-linear duration-200 w-96 transform leftElement ${left}`} message='this is the one' time='10 hours ago' />
                <MessageCard classname={` transition-all ease-linear duration-200 w-96 transform middleElement ${middle}`} message='this is the middle middleElement' time='10 hours ago' />
                <MessageCard classname={` transition-all ease-linear duration-200 w-96 transform rightElement ${right}`} message='this is the two' time='10 hours ago' />
                <MessageCard classname={` transition-all ease-linear duration-200 w-96 transform ${defaultClass} absolute  -translate-y-20`} message='this is the default' time='10 hours ago' /> */}
            </motion.div>

        </div>
    )
}

export default MessageSlider