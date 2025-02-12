"use client";
import Image from "next/image";
import { useState } from "react";
import EditProfile from "./_components/EditProfile";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      hi2 hello
      <SideBar />
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-4 py-2 bg-[#F4F4F5] text-[#18181B]  rounded-md"
      >
        Edit Page
      </button>
      <EditProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
