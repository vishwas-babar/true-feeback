'use client'
import { ArrowBigRight } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Hero1 = () => {

    const router = useRouter()

    return (
        <div className="flex h-full w-full items-center gap-5 justify-center flex-col">

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center  justify-center w-full h-fit">
                <h1 className="md:text-6xl text-4xl md:-mt-0 -mt-8  text-center w-fit text-wrap font-extrabold">
                    Start Your Self-Discovery
                    <br />
                    Journey
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="md:w-1/2 w-3/4 text-lg text-slate-300">
                <p className="font-light leading-8">
                    Embark on a transformative journey to understand your true self. Discover the path to personal growth and fulfillment.
                    Uncover the layers of your personality and embrace the unique qualities that make you who you are.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-fit"
            >
                <Link href={'/dashboard'}>
                    <Button
                        className="backdrop-blur-lg group gap-2 bg-slate-800 hover:bg-slate-900 mt-10 bg-opacity-55 text-white font-medium rounded-full text-base shadow-[0px_0px_1px_0px_#f7fafc]"
                        
                    >
                        Continue with True Feedback
                        <ArrowBigRight className="group-hover:translate-x-1 group-hover:scale-105 transition-all ease-linear duration-100" />
                    </Button>
                </Link>
            </motion.div>
        </div>
    )
}

export default Hero1