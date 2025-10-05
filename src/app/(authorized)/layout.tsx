'use client'
import TopNav from '@/components/TopNav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            console.log('User is not authenticated, redirecting to signin')
            router.push('/sign-in')
        }
    }, [status, router])

    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        )
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Redirecting...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <TopNav />
            {children}
        </>
    )
}

export default ProtectedLayout