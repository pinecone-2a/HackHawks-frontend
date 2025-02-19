"use client"
import { useState, useEffect } from "react";
import { OnlineNavigation } from "./OnlineNavigation";
import { OfflineNavigation } from "./OfflineNavigation";
import { useRouter } from "next/navigation";
import SkeletonOne from "./Skeleton";



export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter(); // Move useRouter inside the functional component

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
      method: "GET",
      credentials: "include", // Important for cookies
    })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data.loggedIn))
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (isLoggedIn === null) return <SkeletonOne />

  return isLoggedIn ? <OnlineNavigation /> : <OfflineNavigation />


}
