
import { LuCoffee } from "react-icons/lu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


export function NavigationProfile() {
  return (
    <div className="bg-slate-100 w-screen ">
        <div className=" h-[56px] bg-white pt-2 mb-[44px]">
          <div className="h-[40px] flex justify-between ">
            <div className=" w-[151px] h-[24px] font-bold text-base flex justify-around text-black mt-2 ml-[80px]">
              <p className="w-[27px] h-[27px] pl-[10px] mt-[4px] rounded-xs">
              <LuCoffee />
              </p>
          <p> Buy Me Coffee</p>
            </div>

            <div className="w-[168px] h-[40px] flex justify-betweens mr-[80px]">
            <Avatar>
               <AvatarImage  src="https://github.com/shadcn.png" />
                 <AvatarFallback>CN</AvatarFallback>
            </Avatar> 
            <p className="font-medium font-sm ml-[8px] pt-2">Username</p>
            <Select>
               <SelectTrigger  className="w-[180px] border-none outline-none">
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