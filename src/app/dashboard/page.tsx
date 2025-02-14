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
const transactions = [
  {
    name: "Cutiez",
    link: "buymeacoffee.com/kissyface",
    amount: 2,
    time: "10 mins ago",
  },
  {
    name: "Guest",
    link: "instagram.com/welesley",
    amount: 1,
    time: "5 hours ago",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down.",
  },
  {
    name: "John Doe",
    link: "buymeacoffee.com/bdsadas",
    amount: 10,
    time: "10 hours ago",
    message: "Thank you for being so awesome everyday!",
  },
  {
    name: "Radicals",
    link: "buymeacoffee.com/gkfgrew",
    amount: 2,
    time: "1 day ago",
  },
  {
    name: "Guest",
    link: "facebook.com/penelopeb",
    amount: 5,
    time: "2 days ago",
  },
  {
    name: "Guest",
    link: "instagram.com/welesley",
    amount: 10,
    time: "1 week ago",
    message:
      "I really really like what you do and it inspires me everyday to create more. I hope that one day I can meet you in person to tell you how much I appreciate you.",
  },
  {
    name: "Fan1",
    link: "buymeacoffee.com/supporterone",
    amount: 10,
    time: "1 week ago",
    message:
      "Thank you for being so awesome everyday! You always manage to brighten up my day when I'm feeling down. Although $1 isn't that much money it's all I can contribute at the moment. When I become successful I will be sure to buy you more gifts and donations. Thank you again.",
  },
  {
    name: "Guest",
    link: "instagram.com/welesley",
    amount: 1,
    time: "10 hours ago",
  },
];
export default function EarningsDashboard() {
  return (
    <div className="h-screen">
      <div className="w-4/5 ">
        <Card className="p-8 shadow-lg">
          <CardContent>
            <div className="flex justify-between items-center pt-[24px]">
              <div className="flex items-center gap-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`/Profile.png`} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">Jake</h2>
                  <p className="text-lg text-gray-500">buymeacoffee.com/</p>
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
                  <DropdownMenuItem>Last 60 days</DropdownMenuItem>
                  <DropdownMenuItem>Last 90 days</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-4xl font-extrabold mt-4">$420</p>
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
              {transactions && (
                <div>
                  {transactions.map((donation, index) => (
                    <div
                      key={donation.amount + Math.random()}
                      className="flex pt-[24px] justify-between items-start px-[24px] pb-4 last:border-none"
                    >
                      <div>
                        <Link href={`/${donation.link}`}>
                          <h1 className="text-lg font-semibold">
                            {donation.name}
                          </h1>
                        </Link>
                        <p className="text-md text-gray-500">{donation.link}</p>

                        <p className="text-md mt-2">{donation.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-semibold">
                          + ${donation.amount}
                        </p>
                        <p className="text-sm text-gray-500">{donation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* <div>
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
        </div> */}
    </div>
  );
}
