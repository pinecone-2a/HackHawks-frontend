'use client';
import EditCover from "./_components/EditCover";
import FrameEditPage from "./_components/FrameEditPage";

export default function ViewPage() {
  return (
    <div>
     <EditCover isOpen={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      <FrameEditPage isOpen={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
    </div>
  )
}
 

  