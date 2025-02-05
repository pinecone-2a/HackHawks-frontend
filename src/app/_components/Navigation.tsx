'use client';
import { LuCoffee } from "react-icons/lu";
import { useState } from "react";

export function Navigation() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUpClick = () => setShowSignUp(true);
  const handleLoginClick = () => setShowLogin(true);

  return (
    <div className="bg-slate-100 w-screen ">
        <div className=" h-[56px] bg-white pt-2">
          <div className="h-[40px] flex justify-between ">
            <div className=" w-[151px] h-[24px] font-bold text-base flex justify-around text-black mt-2 ml-[80px]">
              <p className="w-[27px] h-[27px] ml-[10px] mt-[4px] rounded-xs">
              <LuCoffee />
              </p>
          <p > Buy Me Coffee</p>
            </div>

            <div className="w-[151px] h-[24px] flex justify-between gap-[15px] mr-[80px]">
              <button onClick={handleSignUpClick}  className="w-[83px] h-[40px] text-black font-medium text-sm rounded-md bg-[#F4F4F5] hover:bg-black hover:text-white">Sign up</button>
              <button onClick={handleLoginClick} className="w-[83px] h-[40px] text-black font-medium text-sm rounded-md bg-[#F4F4F5] hover:bg-black hover:text-white ">Log in</button>
            </div>
          </div>
        </div>
    </div>
  );
}


