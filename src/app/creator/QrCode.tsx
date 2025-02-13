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
import { useState } from "react"

 
export function DialogDemo() {

  const [open, setOpen] = useState(false);
  const onSupport = () => {
    setOpen(true)
    setTimeout(() => { setOpen(false) },3000)
  }
  
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={onSupport} className="w-[580px] h-[40px] mt-[32px] bg-black text-white" variant="outline">Support</Button>
      </DialogTrigger>
      <DialogContent className="w-[428px] h-[484px] bg-white rounded-xl shadow-2xl pt-[150px] flex-col  border-2 flex justify-center ">
        <DialogHeader className="flex justify-center items-center">
          <div className="mt-[30px]">
          <DialogTitle >
          <div className="font-semibold text-3xl flex justify-center">Scan QR code</div>


          </DialogTitle>
          <DialogDescription>
            <div className="flex justify-center ">Scan the QR code to complete your donation</div>
          </DialogDescription>
          </div>

          
        </DialogHeader>
        <DialogFooter className="flex justify-center">
        <div className="w-[240px] h-[240px] flex justify-center ">
            <img src="/img/Qr-Code.png" alt="" />
          </div>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


