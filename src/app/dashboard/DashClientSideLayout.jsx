"use client";
import { DM_Sans } from "next/font/google";
import Navbar from "@/ui/module/layout/Navbar/Navbar";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import dynamic from "next/dynamic";
import Toast from "@/ui/module/blocks/Toast/Toast";
const NavMenu = dynamic(() => import("@/ui/module/layout/Navbar/NavMenu"), {
  loading: () => (
    <div className="w-full flex items-center justify-between animate-pulse">
      <div className="flex flex-row items-center justify-between lg:justify-center gap-8 rounded-none lg:rounded-full w-full lg:w-fit px-16 py-16 lg:p-4 relative lg:bg-transparent bg-elevation">
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="w-[36px] h-[36px] bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  ),
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
export default function DashClientSideLayout({ children }) {
  const mobilescreen = useScreenWidth(1024);
  return (
    <div
      className={`${dmSans.className} relative min-h-[100dvh] max-h-[100dvh] h-[100dvh] flex flex-col gap-0 bg-elevation`}
    >
      {mobilescreen ? (
        <div className="z-[70]">
          <Navbar />
          <div className="fixed bottom-0 left-0 w-full z-[70]">
            <NavMenu />
          </div>
        </div>
      ) : (
        <div className="z-[60]">
          <Navbar />
        </div>
      )}
      <div
        className="px-12 pb-12 w-full"
        style={{
          minHeight: "calc(100dvh - 64px)",
          maxHeight: "calc(100dvh - 64px)",
        }}
      >
        <div className="w-full min-h-full h-full max-h-full bg-background border border-border rounded-md overflow-y-auto">
          {children}
        </div>
      </div>
      <Toast />
    </div>
  );
}
