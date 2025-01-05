"use client";
import { DM_Sans } from "next/font/google";
import Bg from "@/ui/module/layout/Bg/Bg";
import { useAppSelector } from "@/redux/store";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function AuthClientSideLayout({ children }) {
  const darkMode = useAppSelector((state) => state.darkMode?.darkMode);

  return (
    <html lang="en" className={darkMode ? "dark" : "light"}>
      <body
        className={`${dmSans.className} relative min-h-[100dvh] max-h-[100dvh] h-[100dvh]`}
      >
        {children}
        <Bg />
      </body>
    </html>
  );
} 