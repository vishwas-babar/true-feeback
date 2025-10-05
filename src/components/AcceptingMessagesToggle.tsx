'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { useRecoilValueLoadable } from 'recoil'
import { currentUser } from '@/state/state'

const AcceptingMessagesToggle = ({ isAcceptingMessageProp }: { isAcceptingMessageProp: boolean }) => {

    const loadable = useRecoilValueLoadable(currentUser)
    // const currentUserInfo = getValue()


    const [isAcceptingMessage, setIsAcceptingMessage] = useState<boolean>(isAcceptingMessageProp || false)

    useEffect(() => {
        if (loadable.state === 'hasValue') {
            setIsAcceptingMessage(loadable.contents?.isAcceptingMessage || false)
        }
    }, [])

    async function toggleAcceptingMessages() {
        console.log('sending request to toggle the btn...')
        setIsAcceptingMessage(prev => !prev)
        try {
            const res = await axios.post('/api/messages/toggle-accepting-messages')
            console.log(res.data)
        } catch (error) {
            console.log(error)
            setIsAcceptingMessage(prev => !prev)
        }
    }

    return (
        <div className="flex items-center mt-2 space-x-2">
            <Switch
                id="Acceptingmessage"
                checked={isAcceptingMessage}
                onClick={toggleAcceptingMessages}
            />
            <Label htmlFor="Acceptingmessage" className="text-white">Accept Message: {isAcceptingMessage ? 'on' : 'off'}</Label>
        </div>
    )
}

export default AcceptingMessagesToggle