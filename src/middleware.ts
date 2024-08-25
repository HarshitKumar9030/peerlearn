export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith("/chat")) {
//     const token = request.cookies.get("sb-access-token")?.value;
//     if (!token) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }
//   return NextResponse.next();
// }

export const config = { matcher: ["/accounts/:path*", "/create","/chat/:path*"] };
