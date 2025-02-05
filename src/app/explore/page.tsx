import { Divide } from "lucide-react";
import { ExploreContainer } from "../_components/ExploreContainer";
import { Input } from "@/components/ui/input";


export default function ExploreHome() {
  return (
    <>
     <ExploreContainer/>
    </>
  );
}

export const EmptyCreators = () =>{
  return(
    <div className="">
    <div className="text-[#18181B] text-[1.3rem] font-[600] pb-[24px]">Explore creators</div>
    <div className="pb-[24px]">
      <Input className="w-[243px] h-[36px]" placeholder="Search name" />
    </div>
    <div className="pl-[500px] "><img src="ExploreUserLogo.png" alt="" /></div>
    <div className="text-[#18181B] font-600 text-[1rem] pt-[15px] pl-[425px]">No creators have signed up yet</div>
  </div>
  )
}