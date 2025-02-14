'use client';
import { QrCode } from "lucide-react";
import { Navigation } from "../../_components/Navigation"
import Link from "next/link";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { DialogDemo } from "@/app/creator/QrCode";
import { set } from "zod";


export function CreatorPage () {

  const [profileData, setProfileData] = useState<any[]>([]); 


  const {id} =useParams();   

  console.log("profileData", profileData)   
  console.log("id", id)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/profile/explore/${id}`);
      const data = await response.json();
     setProfileData(data)
    };
    fetchData();
  }, []);

    return (
        <div className="">
    
           <img src="/img/background.png" alt="" className="w-full h-[319px]" />

           <div className="flex gap-8 justify-center w-screen h-full absolute mt-[-86px]">
           <div className="w-[632px] h-[775px] flex flex-col justify-between">
            <div className="rounded-lg border w-[100%] h-[273px] bg-white p-5">
                <div className="gap-3 flex items-center">
                <img src="/img/space.png" alt="avatar" className="w-[40px] h-[40px] rounded-full flex" />
                  {/* <p className="text-[20px] font-semibold">{profileData?.name}</p> */}
                </div>
                <div className="border-b w-[100%] h-[10%]"></div>

                <p className="text-[16px] font-semibold mt-8">About Space ranger</p>
                <p className="text-[14px] mt-3 h-[80px]">All day, every day, we're watching, listening to, reading and absorbing politics. It's exhausting. We then report on what we've seen in a way that's as chill as possible. None of the sensationalism and division you'll find elsewhere. It's about clarity, focus, approachability, and having a little wry smile almost all the time.</p>

            </div>

            <div className="rounded-lg border w-[100%] h-[116px] bg-white p-5 mt-[20px]">
                <p className="text-[16px] font-semibold ">Social media URL</p>
                <p className="text-[14px] mt-5">https://buymeacoffee.com/spacerulz44</p>
            </div>

            <div className="rounded-lg border w-[100%] h-[380px] bg-white p-5 snap-y mt-[30px] max-h-[346px]">
                <p className="text-[16px] font-semibold mb-5">Recent supporters</p>

                <div className="flex ">
                    <img src="/img/cn.png" alt="" className="w-[40px] h-[40px] flex "/>

                    <div className="flex flex-col  pl-[12px]">
                        <div className="flex gap-[4px] ">
                        <p className="font-bold text-sm "> Guest </p>
                        <p className="text-[14px]"> bought $1 coffee</p>
                        </div>

                     <p className="text-[14px]">Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn’t that much money it’s all I can <br /> contribute at the moment. </p>
                    </div>
                </div>

                <div className="flex mt-[16px]">
                <img src="/img/grinch.png" alt="avatar" className="w-[40px] h-[40px] rounded-full flex" />
                
                <div className="flex flex-col gap-3 pl-[12px] ">
                        <div className="flex gap-[4px] ">
                        <p className="font-bold text-sm "> John Doe </p>
                        <p className="text-[14px]"> bought $5 coffee</p>
                        </div>

                     <p className="text-[14px]">Thank you for being so awesome everyday!  </p>
                 </div>
                </div>

                <div className="flex mt-[16px]">
                <img src="/img/jake.png" alt="avatar" className="w-[40px] h-[40px] rounded-full flex" />

                 

                 <div className="flex flex-col gap-3 pl-[12px] ">
                        <div className="flex gap-[4px] pt-[10px] ">
                          <p className="font-bold text-sm "> Jake </p>
                          <p className="text-[14px]"> bought $10 coffee</p>
                        </div>
                 </div>
                </div>

                <div className="flex mt-[16px] ">
                <img src="/img/space.png" alt="" className="w-[40px] h-[40px] rounded-full flex " />


                    <div className="flex flex-col  pl-[12px]">
                        <div className="flex gap-[4px] ">
                        <p className="font-bold text-sm "> Guest </p>
                        <p className="text-[14px]"> bought $2 coffee</p>
                        </div>

                     <p className="text-[14px]">Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn’t that much money it’s all I can <br /> contribute at the moment. </p>
                    </div>
                </div>


            </div>
           </div>

           <div className="rounded-lg border w-[650px] h-[509px] bg-white p-6">
           <div className="gap-3 ml-[10px] w-[580px] ">
                  <p className="text-[24px] font-semibold mb-[24px]">Buy Space ranger a Coffee</p>

                  <div>
                    <p className="font-medium text-sm">Select amount:</p>

                    <div className="w-[337px] flex justify-between mt-[8px] ">
                    <button className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black"> $1</button>
                    <button className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black"> $3</button>
                    <button className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black"> $5</button>
                    <button className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black"> $10</button>
                    </div>
                  </div>

                  <div className="mt-[32px] w-[580px] h-[62px]">
                    <p className="text-sm font-medium">Enter BuyMeCoffee or social acount URL:</p>

                    <div className="border-[#E4E4E7] border rounded-md h-[45px] mt-[8px] hover:border-black">
                        <input type="text" placeholder="buymeacoffee.com/baconpancakes1" className="w-[570px] h-[40px] rounded-md pl-[12px]"/>
                    </div>
                  </div>

                  <div className=" h-[153px]">
                     <p className="text-sm font-medium mt-[20px]">Special message:</p>

                     <div className="border-[#E4E4E7] border rounded-md h-[131px] mt-[8px] hover:border-black">
                        <p className="font-normal text-sm pl-[12px] pt-[8px] ">Thank you for being so awesome everyday!</p>
                    </div>
                  </div>
               <DialogDemo></DialogDemo>
           </div>
            </div>
           </div>
           </div>
    )
}