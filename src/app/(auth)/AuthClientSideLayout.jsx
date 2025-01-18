"use client";
import Bg from "@/ui/module/layout/Bg/Bg";
import Toast from "@/ui/module/blocks/Toast/Toast";
import localFont from "next/font/local";

const satoshi = localFont({
  src: [
    {
      path: "../../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function AuthClientSideLayout({ children }) {
  return (
    <div
      className={`${satoshi.className} min-h-[100dvh] max-h-[100dvh] h-[100dvh] relative`}
    >
      {children}
      <Bg />
      <Toast />
    </div>
  );
}
