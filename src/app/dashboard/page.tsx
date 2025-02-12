"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type donation = {
  id: string;
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  createdAt: Date;
  donor: user;
};
type user = {
  id: string;
  email: string;
  password: string;
  username: string;
  profile: profile;
  recievedDonations: donation[];
  sendDonation: donation[];
};
type profile = {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
  userId: string;
};
type data = {
  user: user;
  success?: boolean;
  code?: string;
  earnings: {
    day30earnings: number;
    day60earnings: number;
    day90earnings: number;
  };
  earningsData: {
    day30data: donation[];
    day60data: donation[];
    day90data: donation[];
  };
};

export default function EarningsDashboard() {
  const [user, setUser] = useState<data>();
  const [donations, setDonations] = useState<donation[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testing`, {
        credentials: "include",
      });
      const data = await res.json();
      setUser(data);
      console.log(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (user?.success) {
      setDonations(user.earningsData.day30data);
    }
  }, [user]);
  return (
    <div className="">
      {user?.success ? (
        <div className="w-[1000px] h-screen">
          <Card className="p-8 shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center pt-[24px]">
                <div className="flex items-center gap-6">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.user.profile.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{}</h2>
                    <p className="text-lg text-gray-500">
                      buymeacoffee.com/{user.user.username}
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="bg-black text-white px-8 py-3 text-lg"
                >
                  Share page link
                </Button>
              </div>
              <div className="mt-8 flex justify-start gap-6 items-center">
                <h3 className="text-2xl font-semibold">Earnings</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-lg px-4 py-2"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent defaultValue={`day30`} align="start">
                    <DropdownMenuItem>Last 30 days</DropdownMenuItem>
                    <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                    <DropdownMenuItem>All time</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-4xl font-extrabold mt-4">
                ${user.earnings.day30earnings}
              </p>
            </CardContent>
          </Card>

          <div className="mb-10 mt-10 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-lg px-4 py-2"
                >
                  Amount: $ <ChevronDown className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {[1, 2, 5, 10].map((amt) => (
                  <DropdownMenuItem key={amt}>
                    <Checkbox />${amt}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="overflow-y-auto max-h-[528px] border-[1px] rounded-xl ">
            <Card className="mt-6 p-6 shadow-lg border-none">
              <CardContent className="p-6 space-y-6">
                {donations && (
                  <div>
                    {donations.map((donation, index) => (
                      <div
                        key={donation.donor.id + donation.id}
                        className="flex pt-[24px] justify-between items-start px-[24px] pb-4 last:border-none"
                      >
                        <div>
                          <Link href={`/${donation.donor.id}`}>
                            <h1 className="text-lg font-semibold">
                              {donation.donor.username}
                            </h1>
                          </Link>
                          <p className="text-md text-gray-500">
                            {donation.socialURLOrBuyMeACoffee}
                          </p>

                          <p className="text-md mt-2">
                            {donation.specialMessage}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-semibold">
                            + ${donation.amount}
                          </p>
                          <p className="text-sm text-gray-500">
                            {donation.createdAt.toString()}
                          </p>
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
          {user?.code !== `NO_TOKEN_PROVIDED` ? (
            <div className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2">
              <DotLottieReact
                src="https://lottie.host/86aa9c8c-3696-49d6-b1c3-a44ab37159ef/yi7LeQ1VdX.lottie"
                loop
                autoplay
              />
              Please Wait...
            </div>
          ) : (
            <Link href={`/account/signin`}>Please Login</Link>
          )}
        </div>
      )}
    </div>
  );
}
