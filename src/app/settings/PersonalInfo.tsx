"use client"
import { useState, useEffect } from "react";

export default function PersonalInfo() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [setingName, setSetingsName] = useState<string>();

    const onChangeOne = () => {
        fetch("http://localhost:4000/", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ categoryName: setingName }),
        });
        setSetingsName("");
        // window.location.reload();
    };

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage);
            }
        };
    }, [selectedImage]);

    return (
        <div>
            <div className="w-[650px] min-h-[570px] text-black gap-1 p-[24px] flex flex-col rounded-[9px] border-[#E4E4E7] border-[1px]">
                <h1 className="font-bold text-[16px] pb-5">Personal Info</h1>
                <h2 className="text-[14px] font-semibold">Add Photo</h2>
                <div className=" w-[160px] h-[160px] rounded-full bg-slate-700 relative mb-5">
                    <input
                        type="file"
                        accept="image/*"
                        className="opacity-0 w-[160px] h-[160px] rounded-full bg-slate-700 relative  p-2"
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

                    )}</div>
                <h2 className="text-[14px] font-semibold">Name</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2" placeholder="Name" />
                <h2 className="text-[14px] font-semibold">About</h2>
                <textarea className="overflow rounded-[6px] border-[#E4E4E7] border-[1px] min-h-[100px] w-[600px] p-2 leading-6" placeholder={"I’m a typical person who enjoys exploring different things. I also make music art as a hobby. Follow me along."} />
                <h2 className="text-[14px] font-semibold">Social Media URL</h2>
                <input type="text" className="rounded-[6px] border-[#E4E4E7] border-[1px] p-2" placeholder="https://buymeacoffee.com/baconpancakes1" />
                <button className="mt-4 p-2 bg-black text-white rounded">Save Changes</button>
            </div>
        </div>
    );
}