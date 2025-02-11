'use client';

import { useEffect, useState } from "react";
import EditCover from "../view-page/_components/EditCover";
import FrameEditPage from "../view-page/_components/FrameEditPage";
import FrameViewDonation from "../view-page/_components/FrameViewDonation";
import { useParams } from "next/navigation";

type user = {
profile: {
  id: string,
  name: string,
  about: string,
  avatarImage: string,
  socialMediaURL: string
  backgroundImage: null | string,
  successMessage: string,
  userId: string
}
}
export default function ViewPage() {
  const [user, setUser] = useState<user>()
  const params = useParams()
  const {userId} = params 
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch(`http://localhost:4000/users/auth/${userId}`)
      const data = await res.json()
      setUser(data)
      console.log(data)
    }
    fetchData()
  }, [])
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
{user && <FrameEditPage user={user}/>}
      
      <FrameViewDonation/>
        </div>
      {/* </div> */}
      </div>
    </div>
  )
}
 

  