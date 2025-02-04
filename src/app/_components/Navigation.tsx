
import { LuCoffee } from "react-icons/lu";

export function Navigation() {
  return (
    <div className="bg-slate-100 w-screen ">
        <div className=" h-[40px] bg-white">
          <div className="h-[40px] flex justify-between ">
            <div className=" w-[151px] h-[24px] font-bold text-base flex justify-between">
              <p className="w-[27px] h-[27px] ml-[10px] mt-[4px]  ">
              <LuCoffee />
              </p>
          <p> Buy Me Coffee</p>
            </div>

            <div className="w-[151px] h-[24px] flex justify-between gap-[15px]">
              <button className="w-[83px] h-[40px] bg-black text-white font-medium text-sm rounded-md">Sign up</button>
              <button className="w-[83px] h-[40px] bg-[#F4F4F5] text-black font-medium text-sm rounded-md">Log in</button>
            </div>
          </div>
        </div>
    </div>
  );
}

