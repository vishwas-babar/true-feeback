
'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'
import { useRecoilValue } from 'recoil'
import { currentUser } from '@/state/state'

const FeedbackUrl = ({ username }: { username: string }) => {

    const [userFeedbackUrl, setUserFeedbackUrl] = useState("")
    const { data: session, status } = useSession()
    const { toast } = useToast()

    const user = useRecoilValue(currentUser)

    useEffect(() => {

        console.log(window.location.origin)

        const encodedUrl = encodeURIComponent(user?.username || "")

        const url = window.location.origin + '/send-message?to=' + encodedUrl;

        console.log(url)

        if (status == 'authenticated') {
            setUserFeedbackUrl(url)
        }

    }, [status])


    return (
        <div className='mt-6 bg-slate-800/50 backdrop-blur-lg border border-slate-700 overflow-hidden rounded-md shadow-[0px_0px_1px_0px_#f7fafc]' >
            <div className='flex w-full px-4 py-4 rounded-md justify-between items-center'>
                <p className="text-white">
                    {userFeedbackUrl}
                </p>

                <Button
                    className='bg-slate-800 hover:bg-slate-900 text-white transition-all ease-in-out active:scale-100 duration-100 hover:scale-105'
                    variant={'default'}
                    onClick={() => {

                        navigator.clipboard.writeText(userFeedbackUrl)
                            .then(() => {
                                console.log('text copied successfully!')

                                toast({
                                    title: "Copied"
                                })

                            }, (err) => {
                                console.log('failed to copy the text: ', err)
                                toast({
                                    title: "Failed to copy Url"
                                })
                            })
                    }}
                >Copy</Button>
            </div>


        </div>
    )
}

export default FeedbackUrl