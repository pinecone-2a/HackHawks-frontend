
import { Button } from "@/components/ui/button"
import { CreatorPage } from "../../explore/_components/CreatorPage"
import { CreatorPage2 } from "../../explore/_components/CreatorPage2"
import { QrCode } from "lucide-react"
import { DonationComplete } from "../DonationComplete"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogDemo } from "../QrCodeDialog"


export default function Home() {
    return (
        <div>
          
            <CreatorPage/>
            {/* <DonationComplete/> */}
            {/* <CreatorPage2/> */}
            {/* <DialogDemo specialMessage="test" socialURL="test" id="1" donationAmount="100"/> */}
            

        </div>
    )
}