'use client'

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactLoading from "react-loading";

export default function AfterLoginPage() {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/search')
        }, 2000)
    }, [])

    return (
        <div className="flex flex-col justify-center items-center">
            <ReactLoading type="bubbles" color="#192E59" />
            <p className="text-[#192E59] font-semibold">
                Logging in... Please wait...
            </p>
        </div>
    )
}