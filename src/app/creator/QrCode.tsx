
import Link from "next/link";
import { BsQrCode } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5"

export function QrCode() {
  return (
    <div className=" flex justify-center items-center mt-[100px]">
            <div className="w-[428px] h-[484px] bg-white rounded-xl shadow-2xl pt-[150px] flex-col  border-2 flex justify-center items-center ">

              <div>

            <Link href="/dashboard">
                  <button className="flex justify-end w-[100%] h-[10%] mb-6 ml-[130px]">
                      <IoCloseOutline className="w-[16px] h-[16px] text-[#09090B]  flex items-end mt-2 mr-2" /></button>
            </Link>
              </div>

      <div className="flex justify-center items-center flex-col mb-[200px]">
      <h2  className=" font-semibold text-3xl mb-[10px]">Scan QR code</h2>
      <p className="">Scan the QR code to complete your donation</p>
        <BsQrCode  className="text-black bg-white p-4  shadow-md w-[245px] h-[245px] mt-[40px]" size={100}/>
      </div>

    </div>

    </div>

  );
}

