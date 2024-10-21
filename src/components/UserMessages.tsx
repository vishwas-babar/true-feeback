'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UserMessages = () => {

    useEffect(() => {

        axios.get('/api/messages/get-users-messages')
            .then(res => {
                console.log('this is res for get users messages: ', res.data)
            })
            .catch(err => {
                console.log('failed to load the users messages...: ', err)
            })

        return () => {

        }
    }, [])



    return (
        <div>UserMessages</div>
    )
}

export default UserMessages