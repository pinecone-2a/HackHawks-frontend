import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar from "../_components/SideBar";
import Navigation from "../_components/NavigationProfile";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navigation />
      <div className="flex">
        <SideBar />
        <main className="flex-1 min-w-0 p-4">{children}</main>
      </div>
    </div>
  );
}
