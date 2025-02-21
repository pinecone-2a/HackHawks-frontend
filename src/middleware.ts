import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
export const isTokenExpired = (token: string) => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
export async function middleware(request: NextRequest) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

  let refreshToken = request.cookies.get("refreshToken")?.value;
  let accessToken = request.cookies.get("RefreshToken")?.value;

  

  if (!accessToken || !refreshToken || isTokenExpired(refreshToken))
    return NextResponse.redirect(new URL("/account/signin", request.url));

  if (isTokenExpired(accessToken)) {
    const res = await fetch(`${BASE_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      
      },
      body: JSON.stringify({ refreshToken }),
    });

    const response = NextResponse.next()
    const resJson = await res.json();
    console.log(resJson.result.accessToken);
    response.cookies.set('accessToken', resJson.result.accessToken);
    return response
  }
}

export const config = {
  matcher: ["/dashboard", "/view-page", "/settings", "/profile_setup_form_step2"]
};
