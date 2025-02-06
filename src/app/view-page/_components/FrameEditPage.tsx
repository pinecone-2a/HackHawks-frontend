"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { CldImage } from 'next-cloudinary';
import EditProfile from "@/app/_components/EditProfile";

type EditProfileProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FrameEditPage({ isOpen, onClose }: EditProfileProps) {
    const [inOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("Jake");
  const [about, setAbout] = useState(
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
  );
  const [socialUrl, setSocialUrl] = useState(
    "https://buymeacoffee.com/baconpancakes1"
  );
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg gap-6">
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
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
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
            <h1 className="text-xl font-semibold">Jake</h1>
          </div>
         <button onClick={() => setIsOpen(true)} className="mt-4 px-4 py-2 bg-[#F4F4F5] text-[#18181B] rounded rounded-md">Edit Page</button>
               <EditProfile isOpen={inOpen} onClose={() => setIsOpen(false)} />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">About Jake</h2>
          <p className="text-gray-500">{about}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Social media URL</h2>
          <a href={socialUrl} target="_blank" className="text-blue-500">{socialUrl}</a>
        </div>
        <div className="mt-6 p-4 bg-gray-100 text-center rounded-lg">
          <h3 className="text-lg font-semibold">Recent Supporters</h3>
          <p className="text-gray-500">Be the first one to support Jake ❤️</p>
        </div>
      </div>
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Buy Jake a Coffee</h2>
        <div className="flex gap-2 mb-4">
          {[1, 2, 5, 10].map((amount) => (
            <Button key={amount} variant="outline">${amount}</Button>
          ))}
        </div>
        <input type="text" placeholder="buymeacoffee.com/" className="w-full p-2 border rounded-lg mb-4" />
        <textarea placeholder="Please write your message here" className="w-full p-2 border rounded-lg mb-4" rows={3}></textarea>
        <Button className="w-full bg-gray-300 text-gray-600">Support</Button>
      </div>
    </div>
  );
}
