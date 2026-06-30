import { NextRequest, NextResponse } from "next/server";

const AUTH_USER = process.env.OPS_AUTH_USER || "santos";
const AUTH_PASS = process.env.OPS_AUTH_PASS || "He@lInd!a2026";

function isPublicPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/health") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const i = decoded.indexOf(":");
      const user = decoded.slice(0, i);
      const pass = decoded.slice(i + 1);
      if (user === AUTH_USER && pass === AUTH_PASS) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="SantoCare Ops", charset="UTF-8"',
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
