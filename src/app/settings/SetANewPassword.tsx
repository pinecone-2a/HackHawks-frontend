"use client";

import { useState, useEffect } from "react";

export default function SetNewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(newPassword.length >= 5 && newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    if (field === "new") setNewPassword(value);
    else setConfirmPassword(value);
  };

  const handleSubmit = async () => {
    if (!isButtonEnabled) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/update-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
      credentials: "include",
    });

    const data = await response.json();
  };

  return (
    <div className="w-[650px] min-h-[250px] text-black gap-3 p-6 flex flex-col rounded-lg border border-gray-300">
      <h1 className="font-bold text-lg pb-3">Set a New Password</h1>

      <label className="text-sm font-semibold">New Password</label>
      <input type="password" value={newPassword} onChange={(e) => handleChange(e, "new")} className="rounded-md border border-gray-300 p-2" placeholder="Enter new password" />

      <label className="text-sm font-semibold">Confirm Password</label>
      <input type="password" value={confirmPassword} onChange={(e) => handleChange(e, "confirm")} className="rounded-md border border-gray-300 p-2" placeholder="Confirm password" />

      <button onClick={handleSubmit} disabled={!isButtonEnabled} className={`mt-4 p-2 text-white rounded ${isButtonEnabled ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"}`}>
        Save Changes
      </button>
    </div>
  );
}
