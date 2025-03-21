"use client"

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ReactLoading from "react-loading";


export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        deleteCookie('access_token')
        deleteCookie('refresh_token')
        deleteCookie('user_data')
        setTimeout(() => {
            router.push('/login')
        }, 2000)
    }, [])

    return (
        <div className="flex flex-col items-center">
            <ReactLoading type="bubbles" color="#192E59" />
            <p className="text-[#192E59] font-semibold">
                Logging you out... Please wait...
            </p>
        </div>
    )
}