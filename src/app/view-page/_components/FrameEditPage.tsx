"use client";

import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CldImage } from 'next-cloudinary';
import EditProfile from "@/app/_components/EditProfile";

export default function FrameEditPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [about, setAbout] = useState(
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
  );
  const [socialUrl, setSocialUrl] = useState(
    "https://buymeacoffee.com/baconpancakes1"
  );

  return (
    <div className="max-w-[632px] left-[450px] absolute z-2">
      
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              {image ? (
                <CldImage width="64" height="64" src={image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img src="Profile.png" className="w-full h-full object-cover" alt="Profile" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
                <label className="cursor-pointer">
                  <CameraIcon className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>
            </div>
            <h1 className="text-xl font-semibold">Jake</h1>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="mt-4 px-4 py-2 bg-[#F4F4F5] text-[#18181B] rounded-md"
          >
            Edit Page
          </button>
        </div>
        <div className="border-t border-[#E4E4E7] my-4"></div>
        <div>
          <h2 className="text-lg font-semibold">About Jake</h2>
          <p className="text-gray-500">{about}</p>
        </div>
      </div>

      
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6">
        <h2 className="text-lg font-semibold">Social media URL</h2>
        <a href={socialUrl} target="_blank" className="text-blue-500">{socialUrl}</a>
      </div>

      {/* Supporters Section */}
      <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold">Recent Supporters</h3>
        <p className="text-gray-500">Be the first one to support Jake ❤️</p>
      </div>

      
      <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}


 