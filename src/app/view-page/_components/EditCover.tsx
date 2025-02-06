"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { CameraIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { CldImage } from 'next-cloudinary';

type EditCoverProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EditCover({ isOpen, onClose }: EditCoverProps) {
  const [name, setName] = useState("Jake");
  const [about, setAbout] = useState(
    "I'm a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."
  );
  const [socialUrl, setSocialUrl] = useState(
    "https://buymeacoffee.com/baconpancakes1"
  );
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [tempCoverImage, setTempCoverImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleCoverUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setTempCoverImage(reader.result as string);
      setEditing(true);
    };
  };

  const handleSaveCover = async () => {
    if (!tempCoverImage) return;
    setUploading(true);
    setTimeout(() => {
      setCoverImage(tempCoverImage);
      setTempCoverImage(null);
      setEditing(false);
      setUploading(false);
    }, 1000);
  };

  const handleCancelCover = () => {
    setTempCoverImage(null);
    setEditing(false);
  };

  return (
    <div className="w-screen bg-[#F4F4F5] h-[319px] flex items-center justify-center relative">
      {coverImage || tempCoverImage ? (
        <img
          src={tempCoverImage || coverImage!}
          alt="Cover"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[#F4F4F5]"></div>
      )}
      {editing ? (
        <div className="absolute top-4 right-4 flex gap-2">
          <Button onClick={handleSaveCover} className="bg-black text-white">Save changes</Button>
          <Button onClick={handleCancelCover} variant="outline">Cancel</Button>
        </div>
      ) : (
        <label className="cursor-pointer absolute top-4 right-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70">
          <CameraIcon className="w-5 h-5 inline-block mr-2" /> {coverImage ? "Change cover" : "Add a cover image"}
          <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
        </label>
      )}
      {uploading && <p className="absolute bottom-4 text-white text-sm">Uploading...</p>}
    </div>
  );
}