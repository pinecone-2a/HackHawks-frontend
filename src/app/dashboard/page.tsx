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
import { cookies } from "next/headers";

interface UserProfile {
  name: string;
  avatarImage: string;
}

interface Donor {
  id: string;
  profile: UserProfile;
}

interface Donation {
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

interface Data {
  success: boolean;
  code?: string;
  donation: Donation[];
  totalEarnings: TotalEarnings;
}

export default function EarningsDashboard() {
  const [user, setUser] = useState<Data | null>(null);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
        { method: "GET",
          credentials: "include",
         
        }
      );
      const data = await res.json();
      setUser(data);
      
    };
    fetchData();
  }, []);

  console.log(user);
  return (
    <div className="h-screen">
      {user?.success ? (
        <div className="w-4/5 ">
          <Card className="p-8 shadow-lg">
            <CardContent>
              <div className="flex justify-between items-center pt-[24px]">
                <div className="flex items-center gap-6">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user.donation[0].donor.profile.avatarImage} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {user.donation[0].donor.profile.name}
                    </h2>
                    <p className="text-lg text-gray-500">
                      buymeacoffee.com/{user.donation[0].donor.profile.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  className="bg-black text-white px-8 py-3 text-lg">
                  Share page link
                </Button>
              </div>
              <div className="mt-8 flex justify-start gap-6 items-center">
                <h3 className="text-2xl font-semibold">Earnings</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-lg px-4 py-2">
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent defaultValue={`day30`} align="start">
                    <DropdownMenuItem onClick={() => setFilter("day30data")}>
                      Last 30 days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("day60data")}>
                      Last 60 days
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter("day90data")}>
                      Last 90 days
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className="text-4xl font-extrabold mt-4">
                ${user.totalEarnings._sum.amount}
              </p>
            </CardContent>
          </Card>

          <div className="mb-10 mt-10 flex justify-between items-center">
            <h3 className="text-2xl font-semibold">Recent transactions</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 text-lg px-4 py-2">
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
                {user && (
                  <div>
                    {user?.donation.map((donation, index) => (
                      <div
                        key={user.donation + donation.id}
                        className="flex pt-[24px] justify-between items-start px-[24px] pb-4 last:border-none">
                        <div>
                          <Link href={`/${donation.donor.id}`}>
                            <h1 className="text-lg font-semibold">
                              {donation.donor.profile.name}
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
          {user?.code !== `JWT_EXPIRED` ? (
            <div className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2  whitespace-nowrap font-extrabold text-2xl">
              Please Wait...
            </div>
          ) : (
            <Link
              className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-extrabold text-2xl"
              href={`/account/signin`}>
              Please Login 💩
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
