import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink } from "lucide-react";

export const ExploreContainer = () => {
  return (
    <div>
      <div className="text-[#18181B] text-[1.3rem] font-[600]">Explore creators</div>
      <div>
        <Input className="w-[243px] h-[36px]" placeholder="Search name" />
      </div>
      <div className="border-solid border-[#E4E4E7] border-[1px] ">
        <div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 pb-[12px]">
              <img className="size-[40px] rounded-full border-solid border-[1px]" src="profile.jpg" alt="" />
              <div className="text-[#18181B] text-[1.3rem] font-[600]">Space ranger</div>

              {/* <div className="pl-[px]">
              <Button />
            </div> */}
            </div>
            <div className="text-end">
              <Button className="bg-[#F4F4F5] w-[136px] h-[40px] text-[#18181B] hover:text-white">
                View profile
                <ExternalLink />
              </Button>
            </div>
          </div>

          <div className="">
            <div>
              <div className="text-[#18181B] text-[1rem] font-[600] pb-[12px]">About Spacer ranger</div>
              <div className="text-[14px] text-[#09090B] ">
                All day, every day, we're watching, listening to, reading and <br />
                absorbing politics. It's exhausting. We then report on what <br />
                we've seen in a way that's as chill as possible. None of the <br />
                sensationalism and division you'll find elsewhere. It's about clarity, <br />
                focus, approachability, and having a little wry smile almost all the time.
              </div>
              <div>
                <div className="pb-[20px] text-[#18181B] text-[1rem] font-[600]  ">Social media URL</div>
                <div className="text-[14px] text-[#09090B]">https://buymeacoffee.com/baconpancakes1</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
