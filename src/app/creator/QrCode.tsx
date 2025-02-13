
// import Link from "next/link";
// import { BsQrCode } from "react-icons/bs";
// import { IoCloseOutline } from "react-icons/io5"



import { Copy } from "lucide-react"

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

 
export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[580px] h-[40px] mt-[32px] bg-black text-white" variant="outline">Support</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username"  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
         
          
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


