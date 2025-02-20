"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DialogDemo } from "@/app/creator/QrCodeDialog";

export function CreatorPage() {
  const [donationData, setDonationData] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>([]);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [socialURL, setSocialURL] = useState<string>("");
  const [specialMessage, setSpecialMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

<<<<<<< HEAD
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/explore/${id}`);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError("Failed to load profile data");
      }
    };

    const fetchDonationData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation/creator/${id}`);
        if (!response.ok) throw new Error("Failed to fetch donation data");
        const data = await response.json();
        setDonationData(data);
      } catch (err) {
        setError("Failed to load donation data");
      } finally {
        setLoading(false);
      }
    };

=======
export function CreatorPage() {
  const [donationData, setDonationData] = useState<any>([]);
  const [profileData, setProfileData] = useState<any>([]);
  const [donationAmout, setDonationAmout] = useState<string>("");
  const [socialURL, setSocialURL] = useState<string>("");
  const [specialMessage, setSpecialMessage] = useState<string>("");

  const { id } = useParams<any>();

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/explore/${id}`);
      const data = await response.json();
      setProfileData(data);
    };

    const fetchDonationData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donation/creator/${id}`);
      const data = await response.json();
      setDonationData(data);
    };

    fetchDonationData();
>>>>>>> main
    fetchProfileData();
    fetchDonationData();
  }, [id]);

<<<<<<< HEAD
  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString());
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  return (
    <div className="relative px-4 sm:px-8 md:px-16">
      <img src={profileData?.backgroundImage} alt="" className="w-full h-[319px] object-cover" />

      <div className="flex flex-col sm:flex-row gap-8 justify-center w-full absolute top-[40%] left-1/2 transform -translate-x-1/2">
        <div className="w-full sm:w-[632px] h-full flex flex-col justify-between mb-6 sm:mb-0">
          <div className="rounded-lg border w-full bg-white p-5 mb-6">
            <div className="gap-3 flex items-center">
              <img src={profileData?.avatarImage} alt="avatar" className="w-[40px] h-[40px] rounded-full" />
              <p className="text-[20px] font-semibold">{profileData?.name}</p>
            </div>
            <div className="border-b w-full h-[10%] pt-3"></div>

            <p className="text-[16px] font-semibold mt-8">About {profileData?.name}</p>
            <p className="text-[14px] mt-3 h-[80px] overflow-hidden text-ellipsis">{profileData?.about}</p>
          </div>

          <div className="rounded-lg border w-full h-[116px] bg-white p-5 mt-6">
=======
  const onSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialURL(e.target.value);
  };
  const onSpecialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecialMessage(e.target.value);
  };

  console.log(socialURL);
  console.log(specialMessage);
  return (
    <div className="">
      <img src="/img/background.png" alt="" className="w-full h-[319px]" />

      <div className="flex gap-8 justify-center w-screen h-full absolute mt-[-86px]">
        <div className="w-[632px] h-[775px] flex flex-col justify-between">
          <div className="rounded-lg border w-[100%] h-[273px] bg-white p-5">
            <div className="gap-3 flex items-center">
              <img src="/img/space.png" alt="avatar" className="w-[40px] h-[40px] rounded-full flex" />
              <p className="text-[20px] font-semibold">{profileData?.name}</p>
            </div>
            <div className="border-b w-[100%] h-[10%]"></div>

            <p className="text-[16px] font-semibold mt-8">About Space {profileData?.name}</p>
            <p className="text-[14px] mt-3 h-[80px]">{profileData?.about}</p>
          </div>

          <div className="rounded-lg border w-[100%] h-[116px] bg-white p-5 mt-[20px]">
>>>>>>> main
            <p className="text-[16px] font-semibold ">Social media URL</p>
            <p className="text-[14px] mt-5">https://buymeacoffee.com/{profileData?.name}</p>
          </div>

<<<<<<< HEAD
          <div className="rounded-lg border w-full bg-white p-5 mt-6 overflow-y-auto max-h-[346px]">
            <p className="text-[16px] font-semibold mb-5">Recent supporters</p>
            {donationData?.map((donation: any) => (
              <div key={`creator-${donation?.id}`} className="flex mt-[15px]">
                {/* <img src="/Profile.png" alt="" className="w-[40px] h-[40px]" /> */}
                <img src={donation?.donor.profile.avatarImage} className="size-[35px] rounded-full"/>

                
                <div className="flex flex-col pl-[12px]">
                  <div className="flex gap-[4px]">
                    <p className="font-[600] text-sm">{donation?.donor.profile.name}</p>
                    <p className="text-[14px] font-[500] flex gap-1"> bought <div className="text-green-600 dark:text-sky-400">${donation?.amount}</div> coffee</p>
                  </div>
                  <p className="text-[13px] text-gray-600 pt-2">{donation?.specialMessage}</p>
=======
          <div className="rounded-lg border w-[100%] h-[380px] bg-white p-5 snap-y mt-[30px] max-h-[346px]">
            <p className="text-[16px] font-semibold mb-5">Recent supporters</p>
            {donationData?.map((donation: any) => (
              <div key={`creator-${donation?.id}`} className="flex ">
                <img src="/img/cn.png" alt="" className="w-[40px] h-[40px] flex " />
                <div className="flex flex-col  pl-[12px]">
                  <div className="flex gap-[4px] ">
                    <p className="font-bold text-sm ">{donation?.donor.profile.name}</p>
                    <p className="text-[14px]"> bought ${donation?.amount} coffee</p>
                  </div>

                  <p className="text-[14px]">{donation?.specialMessage}</p>
>>>>>>> main
                </div>
              </div>
            ))}
          </div>
        </div>

<<<<<<< HEAD
        <div className="w-full sm:w-[650px] bg-white p-6 rounded-lg">
          <div className="gap-3 w-full">
            <p className="text-[24px] font-semibold mb-[24px]">Buy {profileData?.name} a Coffee</p>

            <div className="mb-4">
              <h3 className="text-sm font-bold">Select amount:</h3>
              <div className="flex gap-2 mt-2 flex-wrap justify-around ">
                {[1, 2, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`px-4 py-2 border rounded-lg ${
                      donationAmount === amount.toString() ? "bg-gray-100" : "hover:bg-gray-100 ring-1 focus:ring-black"
                    }`}
                  >
                    ☕ ${amount}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 w-full">
              <p className="text-sm font-medium">Enter BuyMeCoffee or social account URL:</p>
              <div className="border-[#E4E4E7] border rounded-md h-[41px] mt-[8px] hover:border-black">
                <input
                  onChange={(e) => setSocialURL(e.target.value)}
                  type="text"
                  placeholder="buymeacoffee.com/baconpancakes1"
                  className="w-full h-[45px] rounded-md pl-[12px]"
                />
              </div>
            </div>

            <div className="h-[153px] w-full mt-4">
              <p className="text-sm font-medium mt-[20px]">Special message:</p>
              <input
                onChange={(e) => setSpecialMessage(e.target.value)}
                className="border-[#E4E4E7] border rounded-md h-[131px] w-full mt-[9px] hover:border-black pb-[90px] pl-[10px]"
                type="text"
                placeholder="Thank you for being so awesome everyday!"
              />
            </div>

            <DialogDemo
              specialMessage={specialMessage}
              socialURL={socialURL}
              donationAmount={donationAmount}
              id={id}

            />
=======
        <div className="rounded-lg border w-[650px] h-[509px] bg-white p-6">
          <div className="gap-3 ml-[10px] w-[580px] ">
            <p className="text-[24px] font-semibold mb-[24px]">Buy Space ranger a Coffee</p>

            <div>
              <p className="font-medium text-sm">Select amount:</p>

              <div className="w-[337px] flex justify-between mt-[8px] ">
                <button onClick={() => setDonationAmout("1")} className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black">
                  {" "}
                  $1
                </button>
                <button onClick={() => setDonationAmout("3")} className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black">
                  {" "}
                  $3
                </button>
                <button onClick={() => setDonationAmout("5")} className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black">
                  {" "}
                  $5
                </button>
                <button onClick={() => setDonationAmout("10")} className="w-[72px] h-[40px] bg-[#F4F4F7] rounded-md border hover:border-black">
                  {" "}
                  $10
                </button>
              </div>
            </div>

            <div className="mt-[32px] w-[580px] h-[62px]">
              <p className="text-sm font-medium">Enter BuyMeCoffee or social acount URL:</p>

              <div className="border-[#E4E4E7] border rounded-md h-[45px] mt-[8px] hover:border-black">
                <input onChange={onSocialChange} type="text" placeholder="buymeacoffee.com/baconpancakes1" className="w-[570px] h-[40px] rounded-md pl-[12px]" />
              </div>
            </div>

            <div className=" h-[153px] w-[580px]">
              <p className="text-sm font-medium mt-[20px]">Special message:</p>
              <input onChange={onSpecialChange} className="border-[#E4E4E7] border rounded-md h-[131px] w-[580px] mt-[8px] hover:border-black" type="" placeholder="" />
              {/* <div className="border-[#E4E4E7] border rounded-md h-[131px] mt-[8px] hover:border-black"> */}
              {/* <p className="font-normal text-sm pl-[12px] pt-[8px] ">Thank you for being so awesome everyday!</p> */}
              {/* </div> */}
            </div>
            <DialogDemo specialMessage={specialMessage} socialURL={socialURL} donationAmout={donationAmout} id={id} />
>>>>>>> main
          </div>
        </div>
      </div>
    </div>
  );
}
