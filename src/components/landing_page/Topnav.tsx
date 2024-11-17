'use client'
import React from 'react'
import TruefeebackLogo from './TruefeebackLogo'
import { Button } from '../ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'


const Topnav = () => {

    const router = useRouter()
    const { data: session, status } = useSession()

    return (
        <div className="w-full shadow- shadow-[0px_0px_1px_0px_#f7fafc] flex justify-center">
            <nav className="flex justify-between md:w-2/3 w-full md:px-0 px-3  h-16 items-center  ">


                <Link href="/">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TruefeebackLogo />
                    </motion.div>
                </Link>

                <div className="hidden md:flex gap-4">
                    {
                        status === 'authenticated' && (
                            <h3 className="scroll-m-20 text-lg font-normal tracking-tight">
                                🎉 Welcome {session?.user.username} 🎉
                            </h3>
                        )
                    }

                </div>

                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}

                    className="">

                    {status === 'loading' ? (
                        <div className="flex items-center gap-4">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled
                            >
                                Loading...
                            </Button>
                        </div>
                   ) : ((status === 'authenticated') ? (
                        <div className="flex items-center gap-4">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => signOut()}
                            >
                                Sign out
                            </Button>
                        </div>
                    ) : (
                        <Button
                            onClick={() => router.push('/sign-in')}
                            className="rounded-full font-medium">
                            Sign in
                        </Button>
                    ))}
                </motion.div>
            </nav>
        </div>
    )
}

export default Topnav