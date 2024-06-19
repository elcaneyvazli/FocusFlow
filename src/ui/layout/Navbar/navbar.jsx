"use client";
import Breadcrumb from "../../block/breadcrumb/breadcrumb";
import SidebarToggleButton from "@/ui/block/button/SidebarToggleButton/SidebarToggleButton";
import DarkModeButton from "@/ui/block/button/DarkModeButton/DarkModeButton";
import { useEffect, useState } from "react";
import { getUser } from "@/services/user/user.services";
import dynamic from "next/dynamic";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const UserBadge = dynamic(() => import("./UserBadge"), {
  loading: () => (
    <div className="flex flex-row gap-8 animate-pulse items-center justify-between w-fit md:min-w-[180px]">
      <div className="h-40 min-w-40 rounded-full bg-input-bg dark:bg-dark-input-bg animate-pulse"></div>
      <div className="flex-col w-full gap-4 justify-between h-full md:flex hidden animate-pulse">
        <div className="h-8 w-full bg-input-bg dark:bg-dark-input-bg"></div>
        <div className="h-8 w-full bg-input-bg dark:bg-dark-input-bg"></div>
      </div>
      <ChevronDownIcon className="h-[14px] w-[14px] text-primary dark:text-input-bg animate-pulse" />
    </div>
  ),
  ssr: false,
});

export default function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUser();
        setUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="px-16 py-12 flex flex-row justify-between items-center bg-white dark:bg-primary border-b border-input-border dark:border-dark-input-border z-40">
      <div className="flex flex-row gap-16 items-center">
        <SidebarToggleButton />
        <Breadcrumb />
      </div>
      <div className="flex flex-row gap-16 items-center">
        <DarkModeButton />
        <UserBadge user={user} />
      </div>
    </div>
  );
}
