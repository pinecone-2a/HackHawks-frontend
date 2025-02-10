"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
type form = {
  username: string;
  password: string;
};
export default function App() {
  const [form, setForm] = useState<form>({
    username: "",
    password: "",
  });
  useEffect(() => {
    const sendD = async () => {
      const res = await fetch(`http://localhost:4000/users/auth/test/login`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    };
    sendD();
  }, []);
  useEffect(() => {}, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const sendData = async () => {
    const res = await fetch(`http://localhost:4000/users/auth/test/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <Input onChange={handleChange} type="name" name="username" />
      <Input onChange={handleChange} type="password" name="password" />
      <Button onClick={sendData} className=" text-background">
        Click
      </Button>
    </div>
  );
}
