"use client";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import SignupStep1 from "../_components/step1";
import Link from "next/link";
import SignupStep2 from "../_components/step2";
import { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResetPassword } from "../_components/resetpassword";
import SkeletonOne from "@/app/_components/Skeleton";
export type response = {
  message: string;
  success?: boolean;
  profileSetup?: boolean;
  data?: {
    id: string;
  };
};
export default function Signin() {
  const [responses, setResponse] = useState<{ message: string, success: boolean, profileSetup?: boolean, data?: { id: string } }>({ message: "WAITING", success: false });
  const [isResponded, setIsResponded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async () => {
    setIsLoading(true);
    try {
      const send = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
        credentials: "include",
      });
      const response = await send.json();
      setResponse(response);
      setIsLoading(false);
    } catch (e) {
      console.error("Server error:", e);
      setResponse({ message: "SERVER_NOT_RESPONDING", success: false });
    }
  };

  useEffect(() => {
    if (responses.success) {
      if (responses.profileSetup) {
        router.push(`/dashboard`);
      } else {
        router.push(`/profile-setup`);
      }
    }
  }, [responses, router]);

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
          disabled={isLoading}
          onClick={() => {
            sendData();
            setIsResponded(true);
          }}
          className="w-full text-background"
        >
          {isLoading ? <SkeletonOne /> : <div>Continue</div>}
        </Button>

        <Dialog>
          <DialogTrigger>Forgot Password?</DialogTrigger>
          <DialogContent>
            <DialogTitle>Reset your password</DialogTitle>
            <ResetPassword />
          </DialogContent>
        </Dialog>

        <div>
          {isResponded && (
            <div>
              {responses.success ? (
                <div className="text-green-500">Амжилттай!</div>
              ) : (
                <div className="flex items-center gap-2">
                  {responses?.message ? (
                    <div className="text-red-500">
                      {responses.message === "WRONG_PASSWORD" && "Буруу нууц үг оруулсан байна."}
                      {responses.message === "WRONG_EMAIL" && "Буруу и-мэйл хаяг оруулсан байна."}
                      {responses.message === "NOT_REGISTERED" && "Бүртгэлгүй хэрэглэгч байна."}
                      {responses.message === "SERVER_NOT_RESPONDING" && "Сервер хариу өгсөнгүй."}
                    </div>
                  ) : (
                    <>
                      Checking...
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}