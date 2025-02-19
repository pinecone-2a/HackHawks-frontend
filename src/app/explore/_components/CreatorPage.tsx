'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

import { set } from "zod";
import { DialogDemo } from "@/app/creator/QrCodeDialog";


export function CreatorPage () {
  const [donationData, setDonationData] = useState<any>([])
  const [profileData, setProfileData] = useState<any>([]); 
  const [donationAmount, setDonationAmount] = useState<string>("")
  const [socialURL, setSocialURL] = useState<string>("")
  const [specialMessage, setSpecialMessage] = useState<string>("")


  const {id} =useParams<any>();   

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/explore/${id}`);
      const data = await response.json();
      setProfileData(data)
    };

    const fetchDonationData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation/creator/${id}`);
      const data = await response.json();
      setDonationData(data)
    };

    fetchDonationData()
    fetchProfileData();
  }, []);

  const onSocialChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSocialURL(e.target.value)
  }
  const onSpecialChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSpecialMessage(e.target.value)
  }

    console.log(socialURL)
    console.log(specialMessage)
    return (
        <div className="">
    
            <img src="/CreatorPageBackground.png" alt="" className="w-full h-[319px]" />

            <div className="flex gap-8 justify-center w-screen h-full absolute mt-[-86px]">
                <div className="w-[632px] h-[775px] flex flex-col justify-between">
            <div className="rounded-lg border w-[100%] h-[273px] bg-white p-5">
                <div className="gap-3 flex items-center">
                <img src="/Profile.png" alt="avatar" className="w-[40px] h-[40px] rounded-full flex" />
                  <p className="text-[20px] font-semibold">{profileData?.name}</p>
                </div>
                <div className="border-b w-[100%] h-[10%]"></div>

                <p className="text-[16px] font-semibold mt-8">About Space {profileData?.name}</p>
                <p className="text-[14px] mt-3 h-[80px]">{profileData?.about}</p>  

            </div>

            <div className="rounded-lg border w-[100%] h-[116px] bg-white p-5 mt-[20px]">
                <p className="text-[16px] font-semibold ">Social media URL</p>
                <p className="text-[14px] mt-5">https://buymeacoffee.com/{profileData?.name}</p>
            </div>

            <div className="rounded-lg border w-[100%] h-[380px] bg-white p-5 snap-y mt-[30px] max-h-[346px]">
                <p className="text-[16px] font-semibold mb-5">Recent supporters</p>
                {donationData?.map((donation: any)=>(  <div key={`creator-${donation?.id}`} className="flex mt-[15px]">
                    <img src="/Profile.png" alt="" className="w-[40px] h-[40px] flex "/>
                    <div className="flex flex-col  pl-[12px]">
                        <div className="flex gap-[4px] ">
                        <p className="font-bold text-sm ">{donation?.donor.profile.name}</p>
                        <p className="text-[14px]"> bought ${donation?.amount} coffee</p>                          
                        </div>

                      <p className="text-[14px]">{donation?.specialMessage}</p>
                    </div>
                </div>))}
            </div>
            </div>


            <div className="rounded-lg border w-[650px] h-[509px] bg-white p-6">
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
                        <input onChange={onSocialChange} type="text" placeholder="buymeacoffee.com/baconpancakes1" className="w-[570px] h-[40px] rounded-md pl-[12px]"/>
                    </div>
                  </div>

                  <div className=" h-[153px] w-[580px]">
                        <p className="text-sm font-medium mt-[20px]">Special message:</p>
                      <input onChange={onSpecialChange} className="border-[#E4E4E7] border rounded-md h-[131px] w-[580px] mt-[8px] hover:border-black  pb-[90px] pl-[10px]" type="text" placeholder="Thank you for being so awesome everyday!"  />

                  </div>

                <DialogDemo specialMessage={specialMessage } socialURL={socialURL} donationAmount={donationAmount} id={id}/>
                <div className="flex justify-center items-center mt-[20px] bg-black  text-white w-[580px] h-[45px] rounded-md">
                  <Button>Buy me coffee</Button>

                </div>
                
            </div>
            </div>
          </div>
 </div>
    )
}