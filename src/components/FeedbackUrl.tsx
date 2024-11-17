
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
        <div className='mt-6 dark:bg-color2 overflow-hidden rounded-md' >
            <div className='flex w-full border px-4 py-4 rounded-md justify-between items-center'>
                <p>
                    {userFeedbackUrl}
                </p>

                <Button
                    className='bg-color3 text-white transition-all ease-in-out active:scale-100 duration-100 hover:bg-color4 hover:scale-105'
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