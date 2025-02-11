"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import z from "zod";
type response = {
  success?: boolean;
  message?: string;
  id?: string;
  code?: string;
};
const emailSchema = z.string().email();
const newPasswordSchema = z
  .object({
    firstPass: z.string().min(8),
    secondPass: z.string().min(8),
  })
  .refine((data) => data.firstPass === data.secondPass, {
    message: "Pass taarsangui",
    path: ["secondPass"],
  });
export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpId, setOtpId] = useState<string>("");
  const [response, setresponse] = useState<response>();
  const [otp, setOtp] = useState("");
  const [valid, isValid] = useState(false);
  const [isValidNewPassword, setIsValidNewPassword] = useState(false);
  const [isOtpMatched, setOtpState] = useState(false);
  const [userExist, setuserExist] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let interval = setTimeout(() => {
      if (response?.code === "PASS_CHANGED_SUCCESSFULLY") {
        router.push(`/account/signin`);
      }
    }, 2000);
    return () => {
      clearTimeout(interval);
    };
  }, [response]);
  // new pass
  const [newPassword, setNewPassword] = useState({
    firstPass: "",
    secondPass: "",
  });
  useEffect(() => {
    const result = emailSchema.safeParse(email);
    if (result.success) {
      isValid(true);
    } else {
      isValid(false);
    }
  }, [email]);
  useEffect(() => {
    const result = newPasswordSchema.safeParse(newPassword);
    if (result.success) {
      setIsValidNewPassword(true);
    } else {
      setIsValidNewPassword(false);
    }
  }, [newPassword]);
  const handleCheck = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/password`,
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
      setLoading(false);
      console.log("step 1 data", data);
      if (data.success) {
        setuserExist(true);
        if (data?.id) {
          setOtpId(data?.id);
        }
      }
      console.log(data);
    } catch (e) {
      console.error(e, "aldaa");
    }
  };
  const handleRequest = async () => {
    setLoading(true);
    console.log({ otp, email, otpId });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, email, id: otpId }),
        }
      );
      const data = await res.json();
      setresponse(data);
      setLoading(false);
      if (data.success) {
        setOtpState(true);
      }

      console.log(data);
    } catch (e) {
      console.error(e, "aldaa");
    }
  };

  const changePassword = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/auth/reset/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword.secondPass, email }),
        }
      );
      const data = await res.json();
      setresponse(data);
      console.log(data);
    } catch (e) {
      console.error(e, "aldaa");
    }
  };
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-end p-10 gap-7">
        <Link href={`/account/signup`}>
          <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
            Sign up
          </Button>
        </Link>
        <Link href={`/account/signin`}>
          <Button className="bg-foreground text-background hover:bg-background hover:text-foreground">
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

        {userExist && (
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
            <div
              className={`${
                response?.success ? `text-green-500` : `text-red-500`
              }`}
            >
              {response?.message === "OTP_MATCHED" && "OTP Matched"}
              {response?.message === "OTP_NOT_MATCHED" && "OTP didn't match"}
            </div>
          </div>
        )}

        {isOtpMatched ? (
          <div className="text-background flex justify-end">
            <Dialog>
              <DialogTrigger className="bg-foreground text-background p-1 px-2 rounded-md text-md">
                <div>Change Password</div>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Change your password</DialogTitle>
                <div className="flex justify-center">
                  <div className="flex flex-col w-2/3 gap-3">
                    <div>
                      <label htmlFor="password">Enter new passsword</label>
                      <Input
                        onChange={(e) => {
                          setNewPassword((p) => {
                            return {
                              ...p,
                              firstPass: e.target.value,
                            };
                          });
                        }}
                        type="password"
                      />
                    </div>
                    <div>
                      <label htmlFor="2password">Confirm new passsword</label>
                      <Input
                        id="2password"
                        onChange={(e) => {
                          setNewPassword((p) => {
                            return {
                              ...p,
                              secondPass: e.target.value,
                            };
                          });
                        }}
                        type="password"
                      />
                    </div>
                    <Button
                      onClick={changePassword}
                      disabled={!isValidNewPassword}
                      className="text-background"
                    >
                      Save changes
                    </Button>
                    {response?.code === "PASS_CHANGED_SUCCESSFULLY" && (
                      <div className="text-green-500">
                        Password changed successfully. Redirecting to login
                        page...
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : userExist ? (
          <div>
            <Button
              // disabled={!valid}
              onClick={handleRequest}
              className="w-full text-background"
            >
              Continue
            </Button>
          </div>
        ) : (
          <Button
            disabled={!valid}
            onClick={handleCheck}
            className="w-full text-background"
          >
            Check
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
          </Button>
        )}
      </div>
    </div>
  );
}
