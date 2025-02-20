"use client"
import { useState, useEffect } from "react";
import { OnlineNavigation } from "./OnlineNavigation";
import { OfflineNavigation } from "./OfflineNavigation";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch(() => setIsLoggedIn(false));
  }, []);

  if(isLoggedIn === null) return <div>Loading...</div>

  return isLoggedIn? <OnlineNavigation /> : <OfflineNavigation />


}
