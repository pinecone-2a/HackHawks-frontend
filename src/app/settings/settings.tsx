import PaymentDetails from "./PaymentDetails";
import PersonalInfo from "./PersonalInfo";
import SetSNewPassword from "./SetANewPassword";
import SuccessPage from "./SuccessPage";

export default function Settings() {
    return <div className="w-[650px] ">
        <div className=" mb-[20px]  text-black font-semibold text-[24px]">My account</div>
        <div className="flex flex-col justify-center items-start gap-8">
            <PersonalInfo />
            <SetSNewPassword />
            <PaymentDetails />
            <SuccessPage />
        </div>
    </div>
}