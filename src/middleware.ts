import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";

const publicPaths = [
  "/auth/signin*",
  "/auth/signup*",
  "/auth/signout*",
  "/auth/verify*",
  "/auth/forgot-password*",
  "/auth/reset-password*",
  "/api/webhooks/user*",
];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((req: NextRequest) => {
  if (isPublic(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(req);

  if (!userId) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)",
  ],
};
