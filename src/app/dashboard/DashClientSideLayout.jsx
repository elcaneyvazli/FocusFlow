"use client";
import { DM_Sans } from "next/font/google";
import { useAppSelector } from "@/redux/store";
import Navbar from "@/ui/module/layout/Navbar/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function DashClientSideLayout({ children }) {
  return (
    <div
      className={`${dmSans.className} relative min-h-[100dvh] max-h-[100dvh] h-[100dvh] flex flex-col gap-0 bg-elevation`}
    >
      <Navbar />
      <div className="w-full h-full px-12 pb-12">
        <div className="w-full h-full bg-background border border-border rounded-md shadow-lg">
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
}
