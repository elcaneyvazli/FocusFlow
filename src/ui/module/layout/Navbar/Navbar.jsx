import React from "react";
import dynamic from "next/dynamic";
import { Bell, EllipsisVertical } from "lucide-react";
const LogoContainer = dynamic(() => import("./LogoContainer"), {
  loading: () => (
    <div className="w-[40px] h-[40px] animate-pulse rounded-md bg-gray-300 dark:bg-gray-700 border border-border"></div>
  ),
});
const NavMenu = dynamic(() => import("./NavMenu"), {
  loading: () => (
    <div className="w-full flex items-center justify-center animate-pulse">
      <div className="flex flex-row items-center justify-between lg:justify-center gap-8 rounded-none lg:rounded-full w-full lg:w-fit px-16 py-16 lg:p-4 relative lg:bg-transparent bg-elevation">
        <div className="w-[120px] h-[30px] bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="w-[120px] h-[30px] bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="w-[120px] h-[30px] bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="w-[120px] h-[30px] bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="w-[120px] h-[30px] bg-gray-300 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  ),
});
const Button = dynamic(() => import("../../blocks/Button/Button"), {
  loading: () => (
    <div className="w-[36px] h-[36px] flex items-center justify-center animate-pulse rounded-md bg-gray-300 dark:bg-gray-700 border border-border"></div>
  ),
});
const DarkModeButton = dynamic(
  () => import("../../blocks/Button/DarkModeButton"),
  {
    loading: () => (
      <div className="w-[36px] h-[36px] flex items-center justify-center animate-pulse rounded-md bg-gray-300 dark:bg-gray-700 border border-border"></div>
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
    <div className="min-h-[64px] h-[64px] max-h-[64px] flex flex-row justify-between items-center px-16">
      <div className="flex flex-row items-center gap-8">
        <LogoContainer />
        <div className="hidden lg:flex">
          <NavMenu />
        </div>
      </div>
      <div className="flex flex-row items-center gap-8">
        <Button
          type={"icon-solid"}
          icon={<Bell className="text-text" strokeWidth={2} size={18} />}
        />
        <DarkModeButton type={"icon-solid"} />
        <UserBadge />
      </div>
    </div>
  );
}
