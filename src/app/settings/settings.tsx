import PersonalInfo from "./PersonalInfo";

export default function Settings() {
    return <div className="w-[650px] bg-red-300 ">
        <div className=" mb-[20px]  text-black font-semibold text-[24px]">My account</div>
        <div className="flex flex-col justify-center items-start">
            <PersonalInfo />
        </div>
    </div>
}