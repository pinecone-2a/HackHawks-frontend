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
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;

  const refreshToken = request.cookies.get("RefreshToken")?.value;
  const accessToken = request.cookies.get("Authorization")?.value;

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);
  console.log("Is Access Token Expired:", accessToken ? isTokenExpired(accessToken) : "No Access Token");
  console.log("Is Refresh Token Expired:", refreshToken ? isTokenExpired(refreshToken) : "No Refresh Token");

  if (!accessToken || !refreshToken || isTokenExpired(refreshToken)) {
    return NextResponse.redirect(new URL("/account/signin", request.url));
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
      console.log("Response Data from Token Refresh:", data);

      const response = NextResponse.next();

      response.cookies.set("Authorization", data.result.accessToken, {
        sameSite: "none",
        secure: true,
      });

      return response;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      return NextResponse.redirect(new URL("/account/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/view-page", "/settings", "/profile_setup_form_step2"],
};
