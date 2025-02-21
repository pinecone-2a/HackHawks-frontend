import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

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

  let refreshToken = request.cookies.get("RefreshToken")?.value;
  let accessToken = request.cookies.get("Authorization")?.value;

  if (!accessToken || !refreshToken || isTokenExpired(refreshToken)) {
    return NextResponse.redirect(new URL("account/signin", request.url));
  }


  if (isTokenExpired(accessToken)) {
    try {
      const res = await fetch(`${BASE_URL}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        throw new Error("Failed to refresh access token");
      }

      const data = await res.json();

      const response = NextResponse.next();
      response.cookies.set("accessToken", data.result.accessToken);

      return response;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return NextResponse.redirect(new URL("account/signin", request.url));
    }
  }
}

export const config = {
  matcher: [ "/view-page", "/settings", "/profile_setup_form_step2"]
};
