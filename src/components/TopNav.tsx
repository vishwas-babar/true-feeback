'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRecoilValueLoadable } from 'recoil'
import {  currentUser } from '@/state/state'
import TruefeebackLogo from './landing_page/TruefeebackLogo'
import Topnav from './landing_page/Topnav'


export default function TopNav() {

    const userFromServer = useRecoilValueLoadable(currentUser)
    const { data: session, status } = useSession()


    useEffect(() => {
        console.log("userfromserver: ", userFromServer)
        // setUserAuth(prev => prev + 10)
    }, [userFromServer])

    return (

        <Topnav />

        // <nav className="fixed inset-x-0 flex items-center top-0 z-50 bg-white shadow-sm h-20 dark:bg-color1 border-b">
        //     <div className="w-full dark:whie max-w-7xl mx-auto px-4">
        //         <div className="flex justify-between h-14 items-center">
        //             <Link className="flex items-center" href="#">
        //                 <TruefeebackLogo />
        //             </Link>
        //             <div className="hidden md:flex gap-4">
        //                 {
        //                     status === 'authenticated' && (
        //                         <h3 className="scroll-m-20 text-lg font-normal tracking-tight">
        //                            🎉 Welcome {session?.user.username} 🎉
        //                         </h3>
        //                     )
        //                 }
                        
        //             </div>

        //             {
        //                 status === 'authenticated' && (
        //                     <div className="flex items-center gap-4">
        //                         <Button
        //                             size="sm"
        //                             variant="outline"
        //                             onClick={() => signOut()}
        //                         >
        //                             Sign out
        //                         </Button>
        //                     </div>
        //                 )
        //             }
        //         </div>
        //     </div>
        // </nav>
    )
}

