import UserDataResponseType from '@/networks/response-type/UserDataResponseType'
import { NextResponse, NextRequest } from 'next/server'

// const PATHS_REQUIRE_AUTH : string[] = [
//   "/answer",
//   "/law-details",
//   "/profile",
// ]

export async function middleware(request: NextRequest) {
  const getAccessToken = request.cookies.get('access_token') 
  
  if (request.cookies.get('user_data') && getAccessToken) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVICE_BASE_URL}/api/v1/user/me`, 
      {
        method: "GET",
        headers: {
          'Authorization': getAccessToken.value
        },
      }
    )
    
    if (response.ok) {
      const userData = await response.json() as UserDataResponseType
      request.cookies.set('user_data', JSON.stringify(userData))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
}
