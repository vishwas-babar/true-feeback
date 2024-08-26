import React from 'react'
import { Button } from '@/components/ui/button'
import Link from "next/link"


export default function TopNav() {
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
                    <div className="flex items-center gap-4">
                        <Button size="sm" variant="outline">
                            Sign in
                        </Button>
                        <Button size="sm">Sign up</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

