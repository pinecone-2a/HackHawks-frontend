'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { send } from "process"
import { useState } from "react"


 
interface DialogDemoProps {
  specialMessage: string;
  socialURL: string;
  id:string,
  donationAmount: string;
 
}

export function DialogDemo({ specialMessage, socialURL, donationAmount, id }: DialogDemoProps) {
  const [open, setOpen] = useState(false);

  const sendData = async()=>{
    const send = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation/create-donation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specialMessage, socialURL, donationAmount,id }),
      credentials: "include",
    });
  }
 
  console.log(specialMessage,socialURL,id)

  const onSupport = () => {
    setOpen(true);
    sendData();
    setTimeout(() => { setOpen(false) },3000)
  }
  
  
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button disabled={donationAmount === "" || specialMessage === "" || socialURL === ""} onClick={onSupport} className="w-[580px] h-[40px] mt-[32px] bg-black text-white hover:bg-[#343434]" variant="outline">Support</Button>
      </DialogTrigger>
      <DialogContent className=" bg-white rounded-xl shadow-2xl pt-[150px] flex-col  border-2 flex justify-center ">
        <DialogHeader className="flex justify-center items-center">
          <div className="mt-[30px]">
          <DialogTitle >
          <div className="font-semibold text-3xl flex justify-center">Scan QR code</div>


          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-center pt-[10px]">Scan the QR code to complete your donation</div>
          </DialogDescription>
          </div>

          
        </DialogHeader>
        <DialogFooter className="flex justify-center">
        <div className="w-[240px] h-[240px] flex justify-center mt-[40px]  mb-[40px] ">
            <img src="/Qr-Code.png" alt="" />
          </div>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}