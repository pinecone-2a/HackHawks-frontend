'use client';
import { useEffect, useState } from "react";
import { LuCoffee } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function OnlineNavigation() {
  const [profileData, setProfileData] = useState<any>([]);
  const router = useRouter(); 

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/dashboard`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
      }
    };
    
    fetchProfileData();
  }, []);

  const logOut = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("userId");
      router.push("/account/signin");
    } catch (error) {
    }
  };
  return (
    <div className="bg-slate-100 w-full shadow-md">
      <div className="h-[56px] bg-white pt-2 shadow-lg">
        <div className="h-[40px] flex justify-between items-center px-10">
          <div className="flex items-center space-x-2">
            <LuCoffee size={24} className="text-[#4CAF50]" />
            <Link href="/dashboard" className="font-bold text-base text-black hover:text-[#4CAF50]">
              Buy Me Coffee
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={profileData[0]?.avatarImage || "https://res.cloudinary.com/dku0azubr/image/upload/v1739560375/dinoWeb_riv4zt.jpg"
} />
              <AvatarFallback>{profileData[0]?.avatarImage || "U"}</AvatarFallback>
            </Avatar>

            <p className="font-medium text-sm text-black">
              {profileData[0]?.name || "User"}
            </p>

            <Select onValueChange={(value) => value === "logout" && logOut()}>
              <SelectTrigger className="w-[120px] border-none outline-none">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logout">Logout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
