'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated' && session) {
            console.log('User is authenticated, redirecting to dashboard')
            router.push('/dashboard')
        }
    }, [session, status, router])

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                </div>
            </div>
        )
    }

    if (status === 'authenticated') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Redirecting...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}

export default AuthLayout
