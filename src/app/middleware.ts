import { NextResponse, NextRequest } from 'next/server'

// const PATHS_REQUIRE_AUTH : string[] = [
//   "/answer",
//   "/law-details",
//   "/profile",
// ]

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log(request.url)
  return NextResponse.redirect(new URL('/home', request.url))
}