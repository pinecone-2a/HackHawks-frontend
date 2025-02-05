import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupStep1() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="flex justify-end p-10">
        <Button className="bg-secondary text-foreground hover:bg-foreground hover:text-background">
          Log in
        </Button>
      </div>
      <div className="w-[407px] h-[256px] absolute flex flex-col justify-evenly top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="">
          <h3 className="font-bold text-2xl">Create you account</h3>
          <p className="text-muted-foreground text-sm">
            choose an username for you page
          </p>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <Input
            name="username"
            id="username"
            placeholder="Enter username here"
          />
        </div>
        <Link href={`/account/signup?step=2`}>
          <Button className="w-full">Continue</Button>
        </Link>
      </div>
    </div>
  );
}
