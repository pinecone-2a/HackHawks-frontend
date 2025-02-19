
import { FaHeart } from "react-icons/fa";
import Link from "next/link";


export function CreatorPage2 () {
    return (
        <div className="">
           <img src="/CreatorPageBackground.png" alt="" className="w-full h-[319px]"/>

           <div className="flex gap-8 justify-center w-screen h-full absolute mt-[-86px]">
           <div className="w-[632px] h-[660px] flex flex-col justify-between">
            <div className="rounded-lg border w-[100%] h-[273px] bg-white p-5">
                <div className="gap-3 flex items-center">
                  <img src="/Profile.png" alt="" className="w-[48px] h-[48px]" />
                  <p className="text-[20px] font-semibold">Space ranger</p>
                </div>
                <div className="border-b w-[100%] h-[10%]"></div>

                <p className="text-[16px] font-semibold mt-8">About Space ranger</p>
                <p className="text-[14px] mt-3 h-[80px]">All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.</p>

            </div>

            <div className="rounded-lg border w-[100%] h-[116px] bg-white p-5 mt-[20px]">
                <p className="text-[16px] font-semibold ">Social media URL</p>
                <p className="text-[14px] mt-5">https://buymeacoffee.com/spacerulz44</p>
            </div>

            <div className="rounded-lg border w-[100%] h-[236px] bg-white p-5 snap-y mt-[30px]">
                <p className="text-[16px] font-semibold mb-5">Recent supporters</p>
                <div className="w-[584px] h-[140px] rounded-lg border bg-white  ">
                    <div className=" mt-[42px] ">
                        <div className="flex items-center justify-center">
                          <FaHeart  className="w-[29px] h-[29px] "/>
                        </div>

                <div className="flex items-center justify-center mt-[20px]">
                  <p className="font-semibold text-base ">Be the first one to support Jake</p>
                </div>
                    </div>
                </div>
            </div>
           </div>

           <div className="rounded-lg border w-[650px] h-[520px] bg-white p-6">
           <div className="gap-3 ml-[10px] w-[580px] ">
                  <p className="text-[24px] font-semibold mb-[24px]">Buy Space ranger a Coffee</p>

                  <div className="mb-4">
                    <h3 className="text-sm font-medium">Select amount:</h3>
                    <div className="flex gap-2 mt-2">
                      {[1, 2, 5, 10].map((amount) => (
                          <button key={amount} className="px-4 py-2 flex items-center gap-2 border rounded-lg hover:bg-gray-100 focus:ring-1 focus:ring-black">
                        ☕ ${amount}
                          </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-[32px] w-[580px] h-[62px]">
                    <p className="text-sm font-medium">Enter BuyMeCoffee or social account URL:</p>

                    <div className="border-[#E4E4E7] border rounded-md h-[45px] mt-[8px] hover:border-black">
                        <input type="text" placeholder="buymeacoffee.com/baconpancakes1" className="w-[570px] h-[40px] rounded-md pl-[12px]"/>
                    </div>
                  </div>

                  <div className=" h-[153px]">
                     <p className="text-sm font-medium mt-[20px]">Special message:</p>
                     <input  className="border-[#E4E4E7] border rounded-md h-[131px] w-[580px] mt-[8px] hover:border-black  pb-[90px] pl-[10px]" type="text" placeholder="Thank you for being so awesome everyday!"  />


                  </div>

                  <div>
                   <Link href="/creator/QrCode">
                     <p className="w-[580px] h-[40px] bg-black rounded-md mt-[32px] text-white hover:bg-[#343434] flex justify-center pt-[8px]">Support</p>
                   </Link>
                  </div>
           </div>
            </div>
         </div>
       </div>
    )
}