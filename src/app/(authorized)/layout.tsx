import TopNav from '@/components/TopNav'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <TopNav />
            {children}
        </>
    )
}

export default layout