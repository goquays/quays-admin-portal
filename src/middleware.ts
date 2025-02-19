import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { START_QUOTE_SESSION_ID } from "./constants";

export async function middleware(request: NextRequest) {
  const startQuoteOwnerDetailsPaths = ["/start-a-quote/owner-details", "/start-a-quote/owner-details/:path*"];
  const startQuoteSessionId = (await cookies()).get(START_QUOTE_SESSION_ID);

  // Start Quote Owner Details Middleware
  if (startQuoteOwnerDetailsPaths.some((path) => request.nextUrl.pathname.startsWith(path)) && !startQuoteSessionId) {
    return NextResponse.redirect(new URL("/start-a-quote/pet-details", request.url));
  }
}
