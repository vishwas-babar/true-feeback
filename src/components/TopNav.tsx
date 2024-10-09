'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'
import axios from 'axios'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { userAuthState, currentUser } from '@/state/state'


export default function TopNav() {

    const userFromServer = useRecoilValueLoadable(currentUser)
    const { data: session, status } = useSession()


    useEffect(() => {
        console.log("userfromserver: ", userFromServer)
        // setUserAuth(prev => prev + 10)
    }, [ userFromServer])


    // useEffect(() => {


    //     if (status === 'authenticated') {

    //         setUserAuth({
    //             ...userAuth,
    //             user: {
    //                 ...userAuth.user,
    //                 username: session.user.name || "",
    //                 email: session.user.email || "",
    //                 isVerified: true,
    //                 isAcceptingMessage: true,
    //                 id: session.user.id || ""
    //             }
    //         })
    //     }
    // }, [])

    // useEffect(() => {
    //     console.log("userFromServer: ", userFromServer)
    // }, [userFromServer])


    return (
        <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
            <div className="w-full dark:whie max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-14 items-center">
                    <Link className="flex items-center" href="#">
                        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                            True Feedback
                        </h2>
                    </Link>
                    <nav className="hidden md:flex gap-4">
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            Welcome vishwas_babar9
                        </h3>
                    </nav>

                    {
                        status === 'authenticated' ? (
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
                            <div className="flex items-center gap-4">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => signIn()}
                                >
                                    Sign in
                                </Button>
                                <Button size="sm">Sign up</Button>
                            </div>
                        )
                    }

                    <button onClick={() => {
                        axios.post('/api/messages/create-one')
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch(err => {
                                console.log(err)
                            })

                    }}>
                        click me
                    </button>
                    {/* <div className="flex items-center gap-4">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => signIn()}
                        >
                            Sign in
                        </Button>
                        <Button size="sm">Sign up</Button>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

