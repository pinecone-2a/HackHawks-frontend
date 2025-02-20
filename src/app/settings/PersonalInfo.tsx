"use client";
import { useState, useEffect, ChangeEvent } from "react";

export default function PersonalInfo() {
  const [profileData, setProfileData] = useState({
    name: "",
    about: "",
    socialUrl: "",
    avatarImage: "",
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/dashboard`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setProfileData({
        name: data.name || "",
        about: data.about || "",
        socialUrl: data.socialMediaURL|| "",
        avatarImage: data.avatarImage || "",
      });
      setSelectedImage(data.avatarImage || null);
        console.log(data)
    };
    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    setIsButtonEnabled(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file));
      setIsButtonEnabled(true);
    }
  };

  const handleSubmit = async () => {
    if (imageFile) {
      const imageForm = new FormData();
      imageForm.append("file", imageFile);
      imageForm.append("upload_preset", "food-delivery"); 
  
      const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
        method: "POST",
        body: imageForm,
      });
      
      const uploadData = await uploadResponse.json();
      const imageUrl = uploadData.secure_url;
  
      const updateData = {
        name: profileData.name,
        about: profileData.about,
        socialUrl: profileData.socialUrl,
        avatarImage: imageUrl, 
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/update`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData), 
      });
  
      const result = await response.json();
      console.log("Profile updated ", result);
      setIsButtonEnabled(false);
    }
  };

<<<<<<< HEAD
    // const sendData = async () => {
    //     try {
    //         const send = await fetch(
    //             `${process.env.NEXT_PUBLIC_API_URL}/users/auth/sign-in`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(login),
    //                 credentials: "include",
    //             }
    //         );
    //         const response = await send.json();
    //         setResponse(response);
    //         if (response.data.id) {
    //             localStorage.setItem("userId", response.data.id);
    //         }
    //         if (response.success) {
    //             if (response.profileSetup) {
    //                 router.push(`/dashboard`);
    //             } else {
    //                 router.push(`/profile-setup`);
    //             }
    //         }
    //     } catch (e) {
    //         setResponse({ message: "SERVER_NOT_RESPONDING" });
    //         // setnoreponse(e.message);
    //     }
    // };
=======
  return (
    <div className="w-[650px] min-h-[570px] text-black gap-3 p-6 flex flex-col rounded-lg border border-gray-300">
      <h1 className="font-bold text-lg pb-3">Personal Info</h1>
>>>>>>> main

      <h2 className="text-sm font-semibold">Add Photo</h2>
      <div className="w-[160px] h-[160px] rounded-full bg-gray-700 relative mb-5">
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
        {selectedImage ? (
          <img src={selectedImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
        ) : (
          <div className="w-full h-full rounded-full flex items-center justify-center text-white">
            No Image
          </div>
        )}
      </div>

      <h2 className="text-sm font-semibold">Name</h2>
      <input
        type="text"
        name="name"
        value={profileData.name}
        onChange={handleChange}
        className="rounded-md border border-gray-300 p-2"
        placeholder="Enter your name"
      />

<<<<<<< HEAD
=======
      <h2 className="text-sm font-semibold">About</h2>
      <textarea
        name="about"
        value={profileData.about}
        onChange={handleChange}
        className="rounded-md border border-gray-300 p-2 min-h-[100px]"
        placeholder="Tell something about yourself..."
      />
>>>>>>> main

      <h2 className="text-sm font-semibold">Social Media URL</h2>
      <input
        type="text"
        name="socialUrl"
        value={profileData.socialUrl} 
        onChange={handleChange}
        className="rounded-md border border-gray-300 p-2"
        placeholder="https://your-social-link.com"
      />

      <button
        onClick={handleSubmit}
        disabled={!isButtonEnabled}
        className={`mt-4 p-2 text-white rounded ${
          isButtonEnabled ? "bg-black hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Save Changes
      </button>
    </div>
  );
}
