"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { UserInfoForm } from "../../utils/types";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

export default function ProfileSetup1() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [check, setCheck] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [form, setForm] = useState<UserInfoForm>({
    name: "",
    about: "",
    socialMediaURL: "",
    avatarImage: "",
  });
  let errors = {
    name: false,
    about: false,
    socialMediaURL: false,
    avatarImage: false,
  };
  useEffect(() => {
    const step1String = localStorage.getItem("step1");
    const step1 = step1String ? JSON.parse(step1String) : "";
    if (step1) {
      setForm(step1);
    }
    // if()
  }, []);
  const handleForm = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const field = e.target.name;
    setForm((prev) => {
      return { ...prev, [field]: value };
    });
    console.log(form);
  };

  useEffect(() => {
    setLoading(true);
    let interval = setTimeout(() => {
      localStorage.setItem("step1", JSON.stringify(form));
      setLoading(false);
    }, 2000);
    return () => {
      clearTimeout(interval);
    };
  }, [form]);
  const validate = (): boolean => {
    let isValid = true;
    if (!form.name || !/^[a-zA-Z0-9_]{8,}$/.test(form.name)) {
      isValid = false;
    } else {
      errors.name = true;
    }

    if (!form.about) {
      isValid = false;
    } else {
      errors.about = true;
    }

    if (
      !form.socialMediaURL ||
      !/^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+([\/a-zA-Z0-9#?=&_.-]*)?$/.test(
        form.socialMediaURL
      )
    ) {
      isValid = false;
    } else {
      errors.socialMediaURL = true;
    }

    if (!form.avatarImage) {
      isValid = false;
    } else {
      errors.avatarImage = true;
    }
    return isValid;
  };
  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const imageInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qjhhbr3k");
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      setForm((prev) => {
        return {
          ...prev,
          avatarImage: response.secure_url,
        };
      });
      console.log(form);
    }
  };
  useEffect(() => {
    validate();
  }, [form]);
  return (
    <div className="w-[510px] h-[631px] flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Complete your profile page</h1>
        {loading && (
          <div className="flex items-center gap-2">
            Saving...
            <AiOutlineLoading3Quarters className="animate-spin" />
          </div>
        )}
        <button
          onClick={() => {
            setForm({
              name: "",
              about: "",
              socialMediaURL: "",
              avatarImage: "",
            });
          }}
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col w-40 h-48">
        {!form.avatarImage ? (
          <div className="font-semibold">
            <div
              onClick={() => {
                handleInput();
              }}
              className={`border w-40 h-40 rounded-full content-center text-center border-dashed 
            }`}
            >
              Add image
            </div>
            {check && (
              <div className="text-red-500 whitespace-nowrap">
                {!errors.avatarImage && <p>Please upload profile picture!</p>}
              </div>
            )}
          </div>
        ) : (
          <>
            <Image
              src={form.avatarImage}
              onClick={() => {
                handleInput();
              }}
              className={`w-40 h-40 rounded-full content-center text-center`}
              alt="pfp"
              width={160}
              height={160}
            />
          </>
        )}

        <input
          className="hidden"
          onChange={(e) => {
            imageInput(e);
          }}
          type="file"
          ref={inputRef}
        />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col  font-semibold">
          <label htmlFor="">Name</label>
          <Input
            onChange={handleForm}
            name="name"
            defaultValue={form.name}
            placeholder="Enter your name here"
            className={`h-10 `}
          />
          {check && (
            <div className="text-red-500">
              {!errors.name && !validate() && (
                <p>username must be 8+ characters!</p>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col font-semibold">
          <label htmlFor="">About</label>
          <Textarea
            onChange={handleForm}
            name="about"
            defaultValue={form.about}
            className={`border h-[130px] `}
            placeholder="Write about yourself here"
          />
          {check && (
            <div className="text-red-500">
              {!errors.about && <p>Please enter info about yourself!</p>}
            </div>
          )}
        </div>
        <div className="font-semibold">
          <label htmlFor="">Social media URL</label>
          <Input
            className={``}
            onChange={handleForm}
            name="socialMediaURL"
            defaultValue={form.socialMediaURL}
            placeholder="https://"
          />
          {check && (
            <div className="text-red-500">
              {!errors.socialMediaURL && (
                <p>Please enter a valid social link!</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {/* <Link
          onClick={(e) => {
            if (validate() && !loading) {
              setCheck(false);
              console.log("validate", validate());
              console.log("loading", loading);
              console.log("working");
              console.log(errors);
            } else {
              e.preventDefault();
              setCheck(true);
              console.log("validate", validate());
              console.log("loading", loading);
              console.log("pervented");
              console.log(errors);
            }
          }}
          href={`/profile?step=2`}
          className={`w-[236px] ${
            !validate()
              ? `bg-muted cursor-not-allowed`
              : `bg-foreground text-background`
          }`}
        > */}
        <Button
          className={`w-[236px] ${
            !validate()
              ? `bg-muted text-foreground cursor-not-allowed hover:text-background hover:bg-muted-foreground`
              : `bg-foreground text-background`
          }`}
          disabled={!validate() || loading}
          onClick={(e) => {
            if (validate() && !loading) {
              setCheck(false);
              router.push(`/profile?step=2`);
              console.log("validate", validate());
              console.log("loading", loading);
              console.log("working");
              console.log(errors);
            } else {
              e.preventDefault();
              setCheck(true);
              console.log("validate", validate());
              console.log("loading", loading);
              console.log("pervented");
              console.log(errors);
            }
          }}
        >
          Continue
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
}
