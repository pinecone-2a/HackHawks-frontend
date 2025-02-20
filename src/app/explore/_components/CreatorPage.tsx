'use client';

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

    fetchProfileData();
    fetchDonationData();
  }, [id]);

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString());
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="relative px-4 sm:px-8 md:px-16">
      <img src="/CreatorPageBackground.png" alt="" className="w-full h-[319px] object-cover" />

      <div className="flex flex-col sm:flex-row gap-8 justify-center w-full absolute top-[40%] left-1/2 transform -translate-x-1/2">
        <div className="w-full sm:w-[632px] h-full flex flex-col justify-between mb-6 sm:mb-0">
          <div className="rounded-lg border w-full bg-white p-5 mb-6">
            <div className="gap-3 flex items-center">
              <img src="/Profile.png" alt="avatar" className="w-[40px] h-[40px] rounded-full" />
              <p className="text-[20px] font-semibold">{profileData?.name}</p>
            </div>
            <div className="border-b w-full h-[10%]"></div>

            <p className="text-[16px] font-semibold mt-8">About {profileData?.name}</p>
            <p className="text-[14px] mt-3 h-[80px] overflow-hidden text-ellipsis">{profileData?.about}</p>
          </div>

          <div className="rounded-lg border w-full h-[116px] bg-white p-5 mt-6">
            <p className="text-[16px] font-semibold ">Social media URL</p>
            <p className="text-[14px] mt-5">https://buymeacoffee.com/{profileData?.name}</p>
          </div>

          <div className="rounded-lg border w-full bg-white p-5 mt-6 overflow-y-auto max-h-[346px]">
            <p className="text-[16px] font-semibold mb-5">Recent supporters</p>
            {donationData?.map((donation: any) => (
              <div key={`creator-${donation?.id}`} className="flex mt-[15px]">
                {/* <img src="/Profile.png" alt="" className="w-[40px] h-[40px]" /> */}
                <div className="w-[40px] h-[40px]">{profileData?.image}

                </div>
                <div className="flex flex-col pl-[12px]">
                  <div className="flex gap-[4px]">
                    <p className="font-bold text-sm">{donation?.donor.profile.name}</p>
                    <p className="text-[14px]"> bought ${donation?.amount} coffee</p>
                  </div>
                  <p className="text-[14px]">{donation?.specialMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-[650px] bg-white p-6 rounded-lg">
          <div className="gap-3 w-full">
            <p className="text-[24px] font-semibold mb-[24px]">Buy {profileData?.name} a Coffee</p>

            <div className="mb-4">
              <h3 className="text-sm font-medium">Select amount:</h3>
              <div className="flex gap-2 mt-2 flex-wrap justify-around ">
                {[1, 2, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`px-4 py-2 border rounded-lg ${
                      donationAmount === amount.toString() ? "bg-gray-300" : "hover:bg-gray-100"
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
                  className="w-full h-[40px] rounded-md pl-[12px]"
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
          </div>
        </div>
      </div>
    </div>
  );
}
