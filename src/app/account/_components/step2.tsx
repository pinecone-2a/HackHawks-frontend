"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { form } from "./step1";
import { Skeleton } from "@/app/_components/Skeleton";
import { response } from "../signin/page";

export default function SignupStep2() {
  const [response, setResponse] = useState<response>();
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<form>({
    username: "",
    password: "",
    email: "",
  });
  useEffect(() => {
    const formString = localStorage.getItem("signup-info");
    const formL = formString ? JSON.parse(formString) : {};
    setForm(formL);
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

  // useEffect(() => {
  //   if (response) {
  //     setLoading(false);
  //   }
  // }, []);
  const sendForm = async () => {
    const send = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/addnew`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    const response = await send.json();
    setResponse(response);
    localStorage.setItem("userId", response.id);
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

  return (
    form.username && (
      <div className="relative min-h-screen w-full">
        <div className="flex justify-end p-10">
          <Link href={`/account/signin`}>
            <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
              Log in
            </Button>
          </Link>
        </div>
        <div className="w-[407px] h-[256px] absolute flex flex-col gap-3 justify-evenly top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="">
            <h3 className="font-bold text-2xl">Welcome, {form.username}</h3>
            <p className="text-muted-foreground text-sm">
              Connect email and set a password
            </p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Input
              defaultValue={form.email}
              onChange={handleChange}
              name="email"
              id="email"
              placeholder="Enter email here"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input
              defaultValue={form.password}
              onChange={handleChange}
              name="password"
              type="password"
              id="password"
              placeholder="Enter password here"
            />
          </div>
          <Link
            onClick={(e) => {
              if (!isValid()) {
                e.preventDefault();
              } else {
                setLoading(true);
              }
            }}
            href={`/account/signup?step=2`}
          >
            <Button
              disabled={!isValid()}
              onClick={sendForm}
              className="w-full text-background"
            >
              Continue
            </Button>
          </Link>
          <div>
            {loading && (
              <div>
                {response ? (
                  <div className="text-red-500">{response.message}</div>
                ) : (
                  <Skeleton />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
