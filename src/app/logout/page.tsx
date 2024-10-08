"use client"

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function LogoutPage() {
    const router = useRouter()

    useEffect(() => {
        deleteCookie('access_token')
        deleteCookie('refresh_token')
        deleteCookie('user_data')
        router.push('/login')
    }, [])

    return (
        <div className="pl-20">Logging you out, please wait...</div>
    )
}