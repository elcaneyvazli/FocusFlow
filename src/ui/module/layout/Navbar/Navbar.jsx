import React from "react";
import Logo from "../../blocks/Logo/Logo";
import dynamic from "next/dynamic";
import { EllipsisVertical } from "lucide-react";
const DarkModeButton = dynamic(
  () => import("../../blocks/Button/DarkModeButton"),
  {
    loading: () => (
      <div className="w-[36px] h-[36px] flex items-center justify-center animate-pulse rounded-main bg-background border border-border">
        <EllipsisVertical
          className="text-light animate-pulse"
          strokeWidth={1}
          size={20}
        />
      </div>
    ),
  }
);
const UserBadge = dynamic(() => import("./UserBadge"), {
  loading: () => (
    <div className="flex flex-row md:gap-8 gap-4 items-center animate-pulse">
      <div className="h-[32px] w-[32px] bg-gray-300 dark:bg-gray-700 rounded-full" />
      <div className="flex-col items-start gap-2 md:flex hidden">
        <div className="h-[12px] w-[80px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-[12px] w-[120px] bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="h-[14px] w-[14px] bg-gray-300 dark:bg-gray-700 rounded-sm" />
    </div>
  ),
});

export default function Navbar() {
  return (
    <div className="min-h-[64px] h-[64px] max-h-[64px] flex flex-row justify-between items-center px-24">
      <Logo size={40} textSize={"text-xl"} />
      <div className="flex flex-row items-center gap-8">
        <DarkModeButton type={"icon-solid"} />
        <UserBadge />
      </div>
    </div>
  );
}
