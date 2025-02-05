"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
  const [selectedRange, setSelectedRange] = useState("Last 30 days");
  const [selectedAmount, setSelectedAmount] = useState(1);

  return (
    <div className="flex justify-center items-center w-screen">
      <div className="w-[907px]">
        <Card className="p-8 shadow-lg">
          <CardContent>
            <div className="flex justify-between items-center pt-[24px]">
              <div className="flex items-center gap-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">Jake</h2>
                  <p className="text-lg text-gray-500">
                    buymeacoffee.com/baconpancakes1
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
                    {selectedRange} <ChevronDown className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => setSelectedRange("Last 30 days")}
                  >
                    Last 30 days
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedRange("Last 90 days")}
                  >
                    Last 90 days
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedRange("All time")}
                  >
                    All time
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-4xl font-extrabold mt-4">$450</p>
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
                Amount: ${selectedAmount} <ChevronDown className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {[1, 2, 5, 10].map((amt) => (
                <DropdownMenuItem
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                >
                  <Checkbox />${amt}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-y-auto max-h-[528px] border-[1px] rounded-xl ">
          <Card className="mt-6 p-6 shadow-lg border-none">
            <CardContent className="p-6 space-y-6">
              {transactions.map((txn, idx) => (
                <div
                  key={idx}
                  className="flex pt-[24px] justify-between items-start px-[24px] pb-4 last:border-none"
                >
                  <div>
                    <p className="text-lg font-semibold">{txn.name}</p>
                    <p className="text-md text-gray-500">{txn.link}</p>
                    {txn.message && (
                      <p className="text-md mt-2">{txn.message}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">+ ${txn.amount}</p>
                    <p className="text-sm text-gray-500">{txn.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
