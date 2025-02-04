"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { ProfileSetupForm } from "../../utils/types";

export default function ProfileSetup1() {
  const [form, setForm] = useState<ProfileSetupForm>({
    name: "",
    about: "",
    social: "",
  });
  const [errors, setErrors] = useState<ProfileSetupForm>({
    name: "",
    about: "",
    social: "",
  });
  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const field = e.target.name;
    setForm({ ...form, [field]: value });
    console.log(form);
  };
  const validate = (): boolean => {
    let isValid = true;
    if (!form.name) {
      setErrors({ ...errors, name: "Please enter name!" });
      isValid = false;
    }
    if (!form.about) {
      setErrors({ ...errors, about: "Please enter info about yourself!" });
      isValid = false;
    }
    if (!form.social) {
      setErrors({ ...errors, social: "Please enter a social link!" });
      isValid = false;
    }
    return isValid;
  };
  return (
    <div className="w-[510px] h-[631px] flex flex-col gap-10">
      <h1 className="text-xl font-bold">Complete your profile page</h1>
      <div className="flex flex-col w-40 h-48">
        <label htmlFor="file">Add image</label>
        <input onChange={handleForm} type="file" />
      </div>
      <div className="flex flex-col gap-10">
        <div className="">
          <label htmlFor="" className="font-semibold">
            Name
          </label>
          <Input
            onChange={handleForm}
            name="name"
            placeholder="Enter your name here"
            className="h-10"
          />
          {!form.name ? errors.name : ""}
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="">About</label>
          <Textarea
            onChange={handleForm}
            name="about"
            className="border h-[130px]"
            placeholder="Write about yourself here"
          />
          {!form.about ? errors.about : ""}
        </div>
        <div className="font-semibold">
          <label htmlFor="">Social media URL</label>
          <Input onChange={handleForm} name="social" placeholder="https://" />
          {!form.social ? errors.social : ""}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            console.log("it works");
          }}
          disabled={!validate}
          className={`w-[236px] ${!validate ? `bg-muted` : ``}`}>
          Continue
        </Button>
      </div>
    </div>
  );
}
