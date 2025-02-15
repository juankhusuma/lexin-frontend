import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import LexinLogo from "./LexinLogo";
import { getCookie } from "cookies-next";
import UserDataResponseType from "@/networks/response-type/UserDataResponseType";
import { Search } from "lucide-react";

export default function Component() {

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Page Conditions
  const inSearchPage = pathname === '/search'
  const searchQueryExists = (searchParams.get('q') !== null)
  const inSearchResultPage = inSearchPage && searchQueryExists
  const showLexinLogo = inSearchResultPage || pathname.startsWith('/legal-doc')

  // States
  const [loggedInAs, setLoggedInAs] = useState<UserDataResponseType | null>(null)
  const [search, setSearch] = useState<string>(searchParams.get('q') as string)

  // User Data
  useEffect(() => {
    const fromCookie = getCookie('user_data')
    const userData = fromCookie ? JSON.parse(fromCookie) as UserDataResponseType : null
    setLoggedInAs(userData)
  }, [pathname, searchParams])

  function onSubmit() {
    if (search) {
      const params = new URLSearchParams({ q: search }).toString();
      const url = `/search?${params}`
      router.push(url);
    }
  }

  return (
    <div>
      <div className="flex justify-end px-8 xl:px-32 bg-[#192f59]">
        <p className="bg-[#d61b23] text-white text-lg h-full flex py-3 xl:py-5 px-8 font-bold">Faculty of Computer Science</p>
      </div>
      <header className="flex sticky top-0 w-full shrink-0 items-center md:px-6 text-[#163269]">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center gap-6 py-8">
              <Button variant="outline" size="icon" className="lg:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
              <Link href="/" className="mr-6 lg:hidden w-full flex justify-center items-center flex-1" prefetch={false}>
                <Image src="/logo-lexin.png" alt="lexin" width={300} height={80} />
              </Link>
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-2 py-2">
              <Link href="#" className="text-[#163269] flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Home
              </Link>
              <Link href="#" className="text-[#163269] flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                About
              </Link>
              <Link href="#" className="text-[#163269] flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Services
              </Link>
              <Link href="#" className="text-[#163269] flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="relative flex-1">
          <Link href="/" className="hidden lg:flex xl:ml-32 ml-8" prefetch={false}>
            <Image src="/logo-lexin.png" alt="lexin" width={400} height={113} />
          </Link>
        </div>
        <nav className="ml-auto hidden lg:flex my-16 flex-1 mr-8 xl:mr-32 gap-10">
          <div className="flex-1">
            {inSearchResultPage &&
              <div
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    onSubmit()
                  }
                }}
                className="text-[#192f59]"
              >

                <input
                  className="w-full inline-block p-2 rounded-xl text-[#192f59] border"
                  value={search}
                  onChange={(event) => setSearch(event.currentTarget.value)}
                />
              </div>
            }
          </div>

          <Link href={loggedInAs ? "/logout" : "/login"} className="flex flex-row items-center">
            <Icon icon="mdi:account-circle" style={{ fontSize: '40px', color: '#192f59' }} />
            <div className="text-[#192f59] font-semibold ml-2">
              {
                loggedInAs
                  ?
                  <div className="flex flex-col items-start">
                    <p>
                      {`${loggedInAs.fullname}`}
                    </p>
                    <p className="text-xs">
                      Click here to logout
                    </p>
                  </div>
                  :
                  <p>Login</p>
              }
            </div>
          </Link>
        </nav>
      </header>
    </div>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}