"use client";
import { useEffect, useState } from "react";
import PaymentDetails from "./PaymentDetails";
import PersonalInfo from "./PersonalInfo";
import SetSNewPassword from "./SetANewPassword";
import SuccessPage from "./SuccessPage";
import { useRouter } from "next/navigation";
import SkeletonOne from "../_components/Skeleton";
type response = {
    success?: boolean;
    message?: string;
    id?: string;
    code?: string;
};
export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState();
    const [response, setresponse] = useState<response>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
                credentials: "include",
            });
            const data = await res.json();
            setUser(data);
            setresponse(data);
            console.log(data);
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (response?.code === "JWT_EXPIRED") {
            alert("session expired, login again!");
            router.push("/account/signin");
        }
    }, [response]);
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
            method: "GET",
            credentials: "include", // Important for cookies
        })
            .then((res) => res.json())
            .then((data) => setIsLoggedIn(data.loggedIn))
            .catch(() => setIsLoggedIn(false));
    }, []);
    if (isLoggedIn === null) return <SkeletonOne />
    return (
        <div className="w-[650px] ">
            <div className=" mb-[20px]  text-black font-semibold text-[24px]">My account</div>
            <div className="flex flex-col justify-center items-start gap-8">
                <PersonalInfo />
                <SetSNewPassword />
                <PaymentDetails />
                <SuccessPage user={user} />
            </div>
        </div>
        // ) :

        //     (
        //   <div>
        //     {user?.code !== `JWT_EXPIRED` ? (
        //       <div className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2  whitespace-nowrap font-extrabold text-2xl">
        //         Please Login...
        //       </div>
        //     ) : (
        //       <Link
        //         className="fixed transform top-1/2 left-1/2 bottom-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-extrabold text-2xl"
        //         href={`/account/signin`}
        //       >
        //         Please Login 💩
        //       </Link>
        //     )}
        //   </div>
    );
}
