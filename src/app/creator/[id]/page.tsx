
import { Button } from "@/components/ui/button"
import { CreatorPage } from "../../explore/_components/CreatorPage"
import { CreatorPage2 } from "../../explore/_components/CreatorPage2"
import { QrCode } from "lucide-react"
import { DonationComplete } from "../DonationComplete"
import { Dialog } from "@radix-ui/react-dialog"
import { DialogDemo } from "../QrCodeDialog"


// import { QrCodeDialog } from "../QrCodeDialog"


export default function Home() {
    return (
        <div>
          
            <CreatorPage/>
        </div>
    )
}