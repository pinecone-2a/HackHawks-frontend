"use client"
import { LuCoffee } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import { useRouter } from "next/navigation";

export function OnlineNavigation() {
  const router = useRouter(); 

  const logOut = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      localStorage.removeItem("userId");
  
      router.push("/account/signin");
    } catch (error) {
      console.log("Logout failed", error);
    }
  }

  return (
    <div className="bg-slate-100 w-screen">
      <div className="h-[56px] bg-white pt-2">
        <div className="h-[40px] flex justify-between">
          <div className="w-[151px] h-[24px] font-bold text-base flex justify-around text-black mt-2 ml-[80px]">
            <p className="w-[27px] h-[27px] pl-[10px] mt-[4px] rounded-xs">
              <LuCoffee />
            </p>
            <Link href="/dashboard">
              <p> Buy Me Coffee</p>
            </Link>
          </div>

          <div className="w-[168px] h-[40px] flex justify-between mr-[80px]">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium font-sm ml-[8px] pt-2">Username</p>
            <Select onValueChange={(value)=>{
              if (value === "logout") logOut()
            }}>
              <SelectTrigger className="w-[180px] border-none outline-none">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="logout">
                  
                  Logout
                
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
