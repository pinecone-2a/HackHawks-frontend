"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { form } from "./step1";
import ResponseType from "../signin/page";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ResponseType = {
  success: boolean;
  [key: string]: any;
};

export default function SignupStep2() {
  const [response, setResponse] = useState<ResponseType>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState<form>({
    username: "",
    password: "",
    email: "",
  });
  useEffect(() => {
    const formString = localStorage.getItem("signup-info");
    const formL = formString ? JSON.parse(formString) : {};
    setForm(formL);
    if (!formL.username) {
      router.replace(`/account/signup?step=1`);
    }
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const sendForm = async () => {
    setLoading(true);
    try {
      const send = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include"
      });
      const response = await send.json();
      setResponse(response);
      
      if (response.success) {
        localStorage.removeItem("step1")
        localStorage.removeItem("step2")
        setTimeout(() => {
          router.push(`/account/signin`);
          setLoading(false);
        }, 2000);
      }
    } catch (e) {
      console.error(e, "sendForm ajilsangui!");
    }
  };
  const isValid = () => {
    let isValid = true;
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      isValid = false;
    }
    if (form.password.length < 7) {
      isValid = false;
    }
    return isValid;
  };
  useEffect(() => {
    let timeout = setTimeout(() => {
      localStorage.setItem("signup-info", JSON.stringify(form));
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [form]);
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

  return (
    form.username && (
      <div className="relative min-h-screen w-full">
        <div className="flex justify-end p-10">
          <Link href={`/account/signin`}>
            <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">Log in</Button>
          </Link>
        </div>
        <div className="w-[407px] h-[256px] absolute flex flex-col gap-3 justify-evenly top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="">
            <h3 className="font-bold text-2xl">Welcome, {form.username}</h3>
            <p className="text-muted-foreground text-sm">Connect email and set a password</p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input defaultValue={form.email} onChange={handleChange} name="email" id="email" placeholder="Enter email here" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input defaultValue={form.password} onChange={handleChange} name="password" type="password" id="password" placeholder="Enter password here" />
          </div>

          <Button
            disabled={!isValid()}
            onClick={(e) => {
              if (!isValid()) {
                e.preventDefault();
              } else {
                setLoading(true);
                sendForm();
              }
            }}
            className="w-full text-background">
            Continue
          </Button>

          <div>
            {loading && (
              <div>
                {response && (
                  <div className="text-green-500">{response.success ? "Амжилттай бүртгэгдлээ" : <div className=" text-red-500">Таны бүртгэл аль хэдийн үүссэн байна.</div> }</div>
                ) }
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
