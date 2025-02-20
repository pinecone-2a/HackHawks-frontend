"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

interface donationsProfile {
  name: string;
  avatarImage: string;
}

interface Donor {
  id: string;
  name: donationsProfile;
  profile: donationsProfile;
}
interface Recipent {
  id: string;
  name: donationsProfile;
}

interface Donation {
  recipent: any;
  id: string;
  amount: number;
  createdAt: string;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donor: Donor;
}

interface TotalEarnings {
  _sum: {
    amount: number;
  };
}

export interface Data {
  success: boolean;
  code?: string;
  donation: Donation[];
  totalEarnings: TotalEarnings;
}

interface ProfileData {
  name: string;
  avatarImage: string;
}
export default function EarningsDashboard() {
  const [donations, setDonations] = useState<Data | null>(null);
  const [days, setDays] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [profileData, setProfileData] = useState<ProfileData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/?amount=${amount}&days=${days}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      setDonations(data);
    };
    fetchData();
  }, [days, amount]);

  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/dashboard`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      setProfileData(data);
    };

    fetchProfileData();
  }, []);

  return (
    <div className="h-screen">
      {donations?.success ? (
        <div className="w-4/5 ">
          <Card className="p-8 shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center pt-[24px]">
                <div className="flex items-center gap-6">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={profileData[0]?.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{profileData[0]?.name}</h2>
                    <p className="text-lg text-gray-500">buymeacoffee.com/{profileData[0]?.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-start gap-6 items-center">
                <h3 className="text-2xl font-semibold">Earnings</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 text-lg px-4 py-2">
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent defaultValue={`day30`} align="start">
                    <DropdownMenuItem onClick={() => setDays("30")}>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDays("60")}>Last 60 days</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setDays("90")}>Last 90 days</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-4xl font-extrabold mt-4">${donations.totalEarnings._sum.amount}</p>
            </CardContent>
          </Card>

          <div className="mb-10 mt-10 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 text-lg px-4 py-2">
                  Amount: $ <ChevronDown className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setAmount("1")}>
                  <Checkbox /> $1
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAmount("2")}>
                  <Checkbox />
                  $2
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAmount("5")}>
                  <Checkbox />
                  $5
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAmount("10")}>
                  <Checkbox />
                  $10
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-y-auto max-h-[528px] border-[1px] rounded-xl ">
            <Card className="mt-6 p-6 shadow-lg border-none">
              <CardContent className="p-6 space-y-6">
                {donations && (
                  <div>
                    {donations?.donation.map((donation, index) => (
                      <div key={donations.donation + donation.id} className="flex pt-[24px] justify-between items-start px-[24px] pb-4 last:border-none">
                        <div>
                          <Link href={`/${donation.donor.id}`}>
                            <h1 className="text-lg font-semibold">{donation.donor.profile.name}</h1>
                          </Link>
                          <p className="text-md text-gray-500">{donation.socialURLOrBuyMeACoffee}</p>

                          <p className="text-md mt-2">{donation.specialMessage}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold">+ ${donation.amount}</p>
                          <p className="text-sm text-gray-500">{donation.createdAt.toString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          {donations?.code !== `JWT_EXPIRED` ? (
            <div className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2  whitespace-nowrap font-extrabold text-2xl">Please wait...</div>
          ) : (
            <Link className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-extrabold text-2xl" href={`/account/signin`}>
              Please Login 💩
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
