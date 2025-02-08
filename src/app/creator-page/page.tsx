
import { Button } from "@/components/ui/button"
import { CreatorPage } from "./CreatorPage"
// import { QrCode } from "lucide-react"
import { DonationComplete } from "./DonationComplete"
import { QrCode } from "./QrCode"
import { CreatorPage2 } from "./CreatorPage2"

export default function Home() {
    return (
        <div>
            {/* <CreatorPage2/> */}
            <DonationComplete/>
            {/* <QrCode/> */}
            

        </div>
    )
}