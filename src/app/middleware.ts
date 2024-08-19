import { NextResponse, NextRequest } from 'next/server'

// const PATHS_REQUIRE_AUTH : string[] = [
//   "/answer",
//   "/law-details",
//   "/profile",
// ]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Middleware")
  console.log(`Requested URL: ${request.url}`)
  return NextResponse.next()
}

export const config = {
  // matcher: [
  //   '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  // ],
}
