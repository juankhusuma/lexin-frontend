"use client"
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import LexinLogo from "./LexinLogo";

export default function Navbar() {
    // Hooks
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    // Page Conditions
    const inSearchPage = pathname === '/search'
    const searchQueryExists = (searchParams.get('q') !== null)
    const inSearchResultPage = inSearchPage && searchQueryExists
    const showLexinLogo = inSearchResultPage || pathname.startsWith('/law-details') 

    // States
    const [isLoggedIn, _setIsLoggedIn] = useState<boolean>(false)
    const [loggedInAs, _setLoggedInAs] = useState<string>("")
    const [search, setSearch] = useState<string>(searchParams.get('q') as string)

    
    function onSubmitSearchForm() {
      router.push(`/search?q=${encodeURIComponent(search)}`)
    }

    return (
      <nav className="w-screen bg-dark-navy-blue h-16 fixed z-50">
        <div className={`flex flex-row justify-between items-center h-full px-16`}>
          {showLexinLogo 
          ?
          <Link href="/search">
            <LexinLogo /> 
          </Link>

          : <div />
          }
          {inSearchResultPage && 
            <form onSubmit={onSubmitSearchForm}>
              <input 
                className="w-[600px] p-2 rounded-xl -translate-x-36" 
                value={search} 
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
            </form>
          }
          <Link href="/login" className="flex flex-row items-center"> 
            <Icon icon="mdi:account-circle" style={{fontSize: '40px', color: 'white'}} />
            <div className="text-white font-semibold ml-2">
              {isLoggedIn ? `Logged in as "${loggedInAs}"` : "Login"}
            </div>
          </Link>
        </div>
      </nav>
    )
}