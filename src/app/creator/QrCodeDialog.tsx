'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react"; 

interface DialogDemoProps {
  specialMessage: string;
  socialURL: string;
  id: string;
  donationAmout: string;
}

export function DialogDemo({ specialMessage, socialURL, donationAmout, id }: DialogDemoProps) {
  const [open, setOpen] = useState(false);
  const [qrData, setQRData] = useState(""); 

  const sendData = async () => {
    const send = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation/create-donation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ specialMessage, socialURL, donationAmout, id }),
      credentials: "include",
    });
    

    const uniqueTransactionID = `txn-${Date.now()}`; 
    setQRData(uniqueTransactionID);
  };

  const onSupport = () => {
    setOpen(true);
    sendData();

    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  console.log(donationAmout);

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          disabled={donationAmout === "" || specialMessage === "" || socialURL === ""}
          onClick={onSupport}
          className="w-[580px] h-[40px] mt-[32px] bg-black text-white hover:bg-[#343434]"
          variant="outline"
        >
          Support
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-xl shadow-2xl pt-[150px] flex-col border-2 flex justify-center">
        <DialogHeader className="flex justify-center items-center">
          <div className="mt-[30px]">
            <DialogTitle>
              <div className="font-semibold text-3xl flex justify-center">Scan QR code</div>
            </DialogTitle>
            <DialogDescription>
              <div className="flex justify-center pt-[10px]">Scan the QR code to complete your donation</div>
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="flex justify-center">
          <div className="w-[240px] h-[240px] flex justify-center mt-[40px] mb-[40px]">
            {qrData && <QRCodeCanvas value={qrData} size={200} />}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
