import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "./_components/SideBar";
import { Navigation } from "./_components/Navigation";
import { NavigationProfile } from "./_components/NavigationProfile";

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
}>) {
  return (
    <html lang="en">
   <body >
    <NavigationProfile/>
    <Navigation/>

  <main className="flex">
  <SideBar/>
  {children}
  </main>

   </body>
    </html>
  );
}
