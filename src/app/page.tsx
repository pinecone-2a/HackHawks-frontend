'use client';
import Image from 'next/image';
import { useState } from "react";
import EditProfile from './_components/EditProfile';
import { CreatorPage } from './creator-page/CreatorPage';
import { CreatorPage2 } from './creator-page/CreatorPage2';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
        <CreatorPage/>
    </div>
    
  )
}
