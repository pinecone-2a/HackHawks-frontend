"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FrameViewDonation() {
  const params = useParams();
  const {userId} = params
  const [form, setForm] = useState({
    amount: 0,
    specialMessage: "",
    socialUrl: "https://buymeacoffee.com/",
    donorId:"",
    recipentId: userId,

  })

 
    return (
      <div className="max-w-lg bg-white border border-gray-300 rounded-lg p-6 z-3">
        <h2 className="text-xl font-semibold mb-4">Buy Jake a Coffee</h2>
        <div className="mb-4">
          <h3 className="text-sm font-medium">Select amount:</h3>
          <div className="flex gap-2 mt-2">
            {[1, 2, 5, 10].map((amount) => (
              <button
                key={amount}
                className="px-4 py-2 flex items-center gap-2 border rounded-lg hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
              >
                ☕ ${amount}
              </button>
            ))}
          </div>
        </div>
  
        
        <div className="mb-4">
          <label className="text-sm font-medium">Enter BuyMeCoffee or social account URL:</label>
          <input
            type="text"
            placeholder="buymeacoffee.com/"
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
          />
        </div>
  
        
        <div className="mb-4">
          <label className="text-sm font-medium">Special message:</label>
          {/* onChange={} */}
          <textarea
            placeholder="Please write your message here"
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-gray-200 outline-none"
            rows={3}
          />
        </div>
  
        {/* onClick={asdf} */}
        <button

          className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed"
          disabled
        >
          Support
        </button>
      </div>
    );
  }
  