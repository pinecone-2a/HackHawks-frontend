"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import SignupStep1 from "../_components/step1";
import Link from "next/link";

export default function Signup() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  return (
    <div>
      {step && <div>{Number(step) === 1 && <SignupStep1 />}</div>}
      {!step && <Link href={`/account/signup?step=1`}>Click here</Link>};
    </div>
  );
}
