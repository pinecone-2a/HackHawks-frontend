"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
type form = {
  username: string;
  password: string;
};
export default function App() {
  return (
    <div>
      <div className="text-background flex justify-between">
        <Dialog>
          <DialogTrigger className="bg-foreground text-background p-1 px-2 rounded-md text-xs">
            <div>Change Password</div>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Change your password</DialogTitle>
            <div className="flex justify-center">
              <div className="flex flex-col w-2/3 gap-3">
                <div>
                  <label htmlFor="password">Enter new passsword</label>
                  <Input type="password" />
                </div>
                <div>
                  <label htmlFor="2password">Confirm new passsword</label>
                  <Input type="2password" />
                </div>
                <Button className="text-background">Save changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button className="text-xs">Dashboard</Button>
      </div>
    </div>
  );
}
