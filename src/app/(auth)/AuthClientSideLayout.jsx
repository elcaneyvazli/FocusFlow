"use client";
import { DM_Sans } from "next/font/google";
import Bg from "@/ui/module/layout/Bg/Bg";
import Toast from "@/ui/module/blocks/Toast/Toast";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function AuthClientSideLayout({ children }) {
  return (
    <div
      className={`${dmSans.className} min-h-[100dvh] max-h-[100dvh] h-[100dvh] relative`}
    >
      {children}
      <Bg />
      <Toast />
    </div>
  );
}
