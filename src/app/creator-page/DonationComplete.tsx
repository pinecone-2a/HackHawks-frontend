
import { Navigation } from "../_components/Navigation"
import { FaRegCircleCheck } from "react-icons/fa6";

export function DonationComplete () {
    return (
        <div className="">
           <Navigation/>
           <div className="flex justify-center  items-center mt-[133px]">

            <div className="w-[696px] h-[311px] bg-blue-300 p-[24px]">
                <div className="w-[648px] h-[108px] bg-blue-500 p-[24px]">
                    <div className="w-[64px] h-[64px] rounded-full bg-[#18BA51] ml-[292px] mr-[292px]">
                        <div className="w-[29px] h-[29px] text-white p-[22px]">
                        <FaRegCircleCheck /> 
                        <p className=" w-[448px] h-[24px font-semibold text-base text-black">Donation Complete !</p>

                        </div>
                    </div>
                </div>
                    <div className="border-[#E4E4E7] border rounded-md h-[131px] mt-[8px] w-[510px]">
                        <p className="font-normal text-sm pl-[12px] pt-[8px]">Thank you for being so awesome everyday!</p>
                    </div>
                </div>




            </div>

           </div>

    )
}