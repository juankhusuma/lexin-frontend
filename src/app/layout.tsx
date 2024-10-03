"use client"

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LexinThemeProvider from "./utils/theme";
import { Suspense, useEffect } from "react";
import Loading from "@/components/layout/Loading";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import UserDataResponseType from "@/networks/response-type/UserDataResponseType";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function handleVerifyToken() {
      const getAccessToken = getCookie('access_token') 
    
      if (!getCookie('user_data') && getAccessToken) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL}/api/v1/user/me`, 
          {
            method: "GET",
            headers: {
              'Authorization': getAccessToken
            },
          }
        )
        
        if (response.ok) {
          const userData = await response.json() as UserDataResponseType
          setCookie('user_data', JSON.stringify(userData))
        }
      }
    }

    handleVerifyToken()

  }, [pathname])

  return (
    <html lang="en">
        <body>
          <LexinThemeProvider>
            <Suspense fallback={<Loading />}>
              <Navbar />
              <main className="bg-offwhite min-h-[calc(100vh-64px)] pt-24">
                {children}
              </main>
            </Suspense>
          </LexinThemeProvider>
        </body>
    </html>
  );
}