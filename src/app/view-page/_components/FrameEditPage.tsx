"use client";

import { useEffect, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CldImage } from "next-cloudinary";
import EditProfile from "@/app/_components/EditProfile";

type user = {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: null | string;
  successMessage: string;
  userId: string;
};

type Props = {
  user: user | null;
};

export default function FrameEditPage({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // 🔹 Нэвтэрсэн хэрэглэгч өөрийн профайл дээр байгаа эсэхийг шалгах
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId && user && storedUserId === user.userId) {
      setIsCurrentUser(true);
    }
  }, [user]);

  if (!user) {
    return <div className="max-w-[632px] bg-white border border-[#E4E4E7] rounded-lg p-6"> Loading...</div>;
  }

  return (
    <div className="min-w-[632px] ">
      
      
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            
           
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              {user.avatarImage ? (
                <CldImage width="64" height="64" src={user.avatarImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img src="/Profile.png" className="w-full h-full object-cover" alt="Profile Placeholder" />
              )}

             
              {isCurrentUser && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                  <CameraIcon className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <h1 className="text-xl font-semibold">{user.name}</h1>
          </div>

          
          
            <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-[#F4F4F5] text-[#18181B] rounded-md">
              Edit Page
            </button>
          
        </div>

        <div className="border-t border-[#E4E4E7] my-4"></div>

       
        <div>
          <h2 className="text-lg font-semibold">About {user.name}</h2>
          <p className="text-gray-500">{user.about}</p>
        </div>
      </div>

     
      {user.socialMediaURL && (
        <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 pt-5 mt-5">
          <h2 className="text-lg font-semibold">Social Media</h2>
          <a href={user.socialMediaURL} target="_blank" className="text-blue-500">
            {user.socialMediaURL}
          </a>
        </div>
      )}

      
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-start mt-5">
        <h3 className="text-lg font-semibold">Recent Supporters</h3>
        <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-center">
        <p className="font-black">🖤</p>
          <p className="text-gray-500">Be the first one to support {user.name} </p>
          

        </div>
      </div>

      
       <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

