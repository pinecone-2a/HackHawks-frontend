"use client";

import { useEffect, useState } from "react";
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";
import FrameViewDonation from "./_components/FrameViewDonation";
import { useParams } from "next/navigation";

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
export default function ViewPage() {
  const [user, setUser] = useState<user | null>(null);
  const [count, setCount] = useState(false);

  // const params = useParams();
  // const { userId } = params;
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/dashboard`, { method: "GET", credentials: "include" });
      const data = await res.json();
      setUser(data[0]);
      console.log(data);
    };
    fetchData();
  }, [count]);
  return (
    <div className="">
      <div className="relative">
        <EditCover setCount={setCount} count={count} user={user} />
      </div>
      <div className="relative flex justify-center">
        {/* <div className="w-[1280px] flex justify-between pt-[238px]"> */}
        <div className="flex flex-col items-center xl:flex-row gap-20 absolute -top-10">
          <FrameEditPage user={user} />
          <FrameViewDonation />
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
