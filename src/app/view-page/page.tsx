'use client';
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";
import FrameViewDonation from "./_components/FrameViewDonation";

export default function ViewPage() {
  return (
    <div className="relative">
      <div className="">
     <EditCover isOpen={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      </div>
      <div className=" ">
        <div className="w-[1280px] flex justify-between pt-[238px]">
      <FrameEditPage/>
      <FrameViewDonation/>
      </div>
      </div>
    </div>
  )
}
 

  