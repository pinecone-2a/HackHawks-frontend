"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import z from "zod";
type response = {
  success?: boolean;
  message?: string;
};
const emailSchema = z.string().email();
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [response, setresponse] = useState<response>();
  const [otp, setOtp] = useState("");
  const [valid, isValid] = useState(false);
  const [userExist, setuserExist] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      isValid(true);
    } else {
      isValid(false);
    }
  }, [email]);
  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/test/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      setresponse(data);
      if (data.success) {
        setuserExist(true);
      }
      console.log(data);
    } catch (e) {
      console.error(e, "aldaa");
    }
  };
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-end p-10">
        <Link href={`/account/signup`}>
          <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
            Sign up
          </Button>
        </Link>
        <Link href={`/account/signin`}>
          <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
            Sign in
          </Button>
        </Link>
      </div>
      <div className="w-[407px] h-[256px] absolute flex flex-col gap-3 justify-evenly top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="">
          <h3 className="font-bold text-2xl">Reset Password</h3>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
            placeholder="Enter email here"
          />
        </div>
        {loading && (
          <div>
            {userExist ? (
              <div>
                <label htmlFor="otp">OTP</label>
                <Input
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP here"
                />
              </div>
            ) : (
              <>
                {!response?.success && "success false"}
                Checking...
                <AiOutlineLoading3Quarters className="animate-spin" />
              </>
            )}
          </div>
        )}

        {userExist ? (
          <Button
            // disabled={!valid}
            // onClick={handleCheck}
            className="w-full text-background">
            Continue
          </Button>
        ) : (
          <Button
            disabled={!valid}
            onClick={handleCheck}
            className="w-full text-background">
            Check
          </Button>
        )}
      </div>
    </div>
  );
}
