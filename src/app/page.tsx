"use client";
import { useState } from "react";
import { HomeHero } from "./_components/HomeHero";
import { HomeFeature } from "./_components/HomeFeature";
import { HomeNavbar } from "./_components/HomeNavbar";
import { HomeFooter } from "./_components/HomeFooter";
import { HomeTeam } from "./explore/_components/TeamMembers";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <HomeNavbar/>
      <HomeHero/>
      <HomeFeature/>
      <HomeTeam/>
      <HomeFooter/>
    </div>
  );
}
