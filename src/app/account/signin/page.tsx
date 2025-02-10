"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import SignupStep1 from "../_components/step1";
import Link from "next/link";
import SignupStep2 from "../_components/step2";
import { ChangeEvent, useEffect, useState } from "react";
import { Skeleton } from "@/app/_components/Skeleton";
export type response = {
  message: string;
  id: string;
  hasProfile?: boolean;
};
export default function Signin() {
  const [responses, setResponse] = useState<response>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLogin((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };
  const sendData = async () => {
    const send = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth/sign-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      }
    );
    const response = await send.json();
    setResponse(response);
    localStorage.setItem("userId", response.id);
  };

  console.log(responses);
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-end p-10">
        <Link href={`/account/signup`}>
          <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
            Sign up
          </Button>
        </Link>
      </div>
      <div className="w-[407px] h-[256px] absolute flex flex-col gap-3 justify-evenly top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="">
          <h3 className="font-bold text-2xl">Welcome back</h3>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            onChange={handleChange}
            name="email"
            id="email"
            placeholder="Enter email here"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            onChange={handleChange}
            name="password"
            type="password"
            id="password"
            placeholder="Enter password here"
          />
        </div>

        <Button
          onClick={() => {
            sendData();
            setLoading(true);
          }}
          className="w-full text-background"
        >
          Continue
        </Button>
        <div>
          {loading && (
            <div>
              {responses ? (
                <div className="text-red-500">{responses.message}</div>
              ) : (
                <Skeleton />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
