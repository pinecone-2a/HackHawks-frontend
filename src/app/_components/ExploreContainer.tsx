"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

export const ExploreContainer = () => {
  const [ExploreData, setExploreData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/profile/explore");
      const data = await response.json();
      setExploreData(data);
    };
    fetchData();
  }, []);
  console.log(ExploreData);
  return (
    <div className="w-[1000px]">
      <div className="text-[#18181B] text-[1.3rem] font-[600] pb-[24px]">Explore creators</div>
      <div className="pb-[24px]">
        <Input className="w-[243px] h-[36px]" placeholder="Search name" />
      </div>
      <div className="border-solid border-[#E4E4E7] border-[1px] rounded-lg ">
        <div className="p-[24px]">
          <div className="flex justify-between">
            <div className="flex items-center gap-3 pb-[12px]">
              <img className="size-[40px] rounded-full border-solid border-[1px]" src="ExploreUserLogo.png" alt="" />
              <div className="text-[#18181B] text-[1.3rem] font-[600]">Space ranger</div>
            </div>
            <div className="text-end ">
              <Button className="bg-gray-100 w-[136px] h-[40px]  hover:text-white hover:bg-black">
                View profile
                <ExternalLink />
              </Button>
            </div>
          </div>

          <div className="flex ">
            <div>
              <div className="text-[#18181B] text-[1rem] font-[600] pb-[12px]">About Spacer ranger</div>
              <div className="text-[14px] text-[#09090B] ">
                All day, every day, we're watching, listening to, reading and <br />
                absorbing politics. It's exhausting. We then report on what <br />
                we've seen in a way that's as chill as possible. None of the <br />
                sensationalism and division you'll find elsewhere. It's about clarity, <br />
                focus, approachability, and having a little wry smile almost all the time.
              </div>
            </div>
            <div>
              <div className="pb-[9px] text-[#18181B] text-[1rem] font-[600]  ">Social media URL</div>
              <div className="text-[14px] pr-[150px] text-[#09090B]">https://buymeacoffee.com/baconpancakes1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
