'use client';
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";
import FrameViewDonation from "./_components/FrameViewDonation";

export default function ViewPage() {
  return (
    <div className="">
      <div className="relative">
     <EditCover isOpen={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      </div>
      <div className="relative flex justify-center">
        {/* <div className="w-[1280px] flex justify-between pt-[238px]"> */}
        <div className="flex flex-col items-center xl:flex-row gap-20 absolute -top-10">

      <FrameEditPage/>
      <FrameViewDonation/>
        </div>
      {/* </div> */}
      </div>
    </div>
  )
}
 

  