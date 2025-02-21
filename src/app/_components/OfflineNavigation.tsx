'use client';
import { LuCoffee } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";

export function OfflineNavigation() {

  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUpClick = () => setShowSignUp(true);
  const handleLoginClick = () => setShowLogin(true);

  return (
    <div className="bg-gray-100 w-full">
        <div className="h-[56px] bg-white pt-2 shadow-md">
          <div className="h-[40px] flex justify-between items-center px-4 sm:px-8 lg:px-16">
            
            <div className="flex items-center gap-2 text-black">
              <LuCoffee className="text-2xl text-[#4CAF50]" />
              <Link href="/dashboard">
                <p className="font-bold text-lg text-black hover:text-[#4CAF50]">Buy Me Coffee</p>
              </Link>
            </div>

            <div className="flex gap-4">
              <Link href="/account/signup">
                <button 
                  onClick={handleSignUpClick} 
                  className="w-[90px] h-[40px] text-black font-medium text-sm rounded-md bg-[#F4F4F5] hover:bg-black hover:text-white  transition duration-300"
                >
                  Sign Up
                </button>
              </Link>
              <Link href="/account/signin">
                <button 
                  onClick={handleLoginClick} 
                  className="w-[90px] h-[40px] text-black font-medium text-sm rounded-md bg-[#F4F4F5] hover:bg-black hover:text-white  transition duration-300"
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
}
