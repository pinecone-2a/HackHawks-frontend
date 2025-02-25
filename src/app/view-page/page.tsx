"use client";

import { useEffect, useState } from "react";
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";
import FrameViewDonation from "./_components/FrameViewDonation";

type user = {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: null | string;
  successMessage: string;
  userId: string;
  message: string;
};
export default function ViewPage() {
  const [user, setUser] = useState<user | null>(null);
  const [count, setCount] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/dashboard`, { method: "GET", credentials: "include" });
      const data = await res.json();
      setUser(data[0]);
    };
    fetchData();
  }, [count]);

  return (
    <div className="">
      {user ? (
        <div>
          <div className="relative">
            <EditCover setCount={setCount} count={count} user={user} />
          </div>
          <div className="relative flex justify-center">
            <div className="flex flex-col xl:justify-center xl:flex-row gap-5 absolute -top-20">
              <FrameEditPage user={user} />
              <FrameViewDonation />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2  whitespace-nowrap font-extrabold text-2xl">
          Please wait...
          <br />
          <div className="text-[15px] pl-[12px]">(or login first ☺️)</div>
        </div>
      )}
    </div>
  );
}
