"use client"
import { useState, useEffect } from "react";

export default function PersonalInfo() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);


    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);

    return (
        <div>
            <div className="w-[650px] min-h-[671px] text-black gap-6 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px]">
                <h1 className="font-bold text-[16px]">Personal Info</h1>
                <h2 className="text-[14px] font-semibold">Add Photo</h2>
                <button className=" w-[160px] h-[160px] rounded-full bg-slate-700 relative">
                    <input
                        type="file"
                        accept="image/*"
                        className="opacity-0 w-[160px] h-[160px] rounded-full bg-slate-700 relative"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setSelectedImage(file ? URL.createObjectURL(file) : undefined);
                        }}
                    />
                    {selectedImage && (
                        <div className="absolute left-0 top-0">
                            <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-[160px] h-[160px] rounded-full bg-slate-700 object-cover border "
                            />
                        </div>

                    )}</button>
                <h2 className="text-[14px] font-semibold">Name</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px]" />
                <h2 className="text-[14px] font-semibold">About</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px]" />
                <h2 className="text-[14px] font-semibold">Social Media URL</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px]" />
                <button className="mt-4 p-2 bg-blue-500 text-white rounded">Save Changes</button>
            </div>                                           </div>
    );
}