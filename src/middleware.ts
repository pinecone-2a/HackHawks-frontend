import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  let refreshToken = request.cookies.get("refreshToken")?.value;
  let accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken || !refreshToken || isTokenExpired(refreshToken)) return NextResponse.redirect(new URL("/account/signin", request.url));

  if (isTokenExpired(accessToken)) {
    const res = await axios.post(BASE_URL + "/auth/sign-in", {
      refreshToken,
    });

    const response = NextResponse.next();
    console.log(res.data.result.accessToken);
    response.cookies.set("accessToken", res.data.result.accessToken);
    return response;
  }
}
export const config = {
  matcher: "/settings",
};
