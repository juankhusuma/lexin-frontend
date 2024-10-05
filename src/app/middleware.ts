import UserDataResponseType from '@/networks/response-type/UserDataResponseType'
import { NextResponse, NextRequest } from 'next/server'

// const PATHS_REQUIRE_AUTH : string[] = [
//   "/answer",
//   "/law-details",
//   "/profile",
// ]

export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}
