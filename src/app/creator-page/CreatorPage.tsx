
// import { Button } from "@/components/ui/button"
import { Navigation } from "../Navigation"

export function CreatorPage () {
    return (
        <div>
            <Navigation/>
                <img className="w-full h-[319px]" src="CreatorPageBackground.png" alt="" />
                <div className="p-[24px] h-[273px]">
                <div className="flex items-center gap-3 ml-[80px bg-white ">
                  <img className="size-[48px] rounded-full border-solid border-[1px]" src="ExploreUserLogo.png" alt="" />
                  <div className="text-[#09090B] text-xl font-bold">Space ranger</div>
                </div>
                </div>
                <div className=" w-[584px] h-[33px] pt-[-80px]">
                    <div className="w-[584px] h-[1px] border-border border-[#E4E4E7] pb-[16px] pt-[16px]">
                        
                    </div>

                </div>
        </div>
    )
}