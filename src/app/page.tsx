"use client";
import Image from "next/image";
import { useState } from "react";
import EditProfile from "./_components/EditProfile";
import SideBar from "./_components/SideBar";
import { HomeHero } from "./_components/HomeHero";
import { HomeFeature } from "./_components/HomeFeature";
import { HomeNavbar } from "./_components/HomeNavbar";
import { HomeFooter } from "./_components/HomeFooter";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <HomeNavbar />
      <HomeHero />
      <HomeFeature />
      <HomeFooter />
    </div>
  );
}
