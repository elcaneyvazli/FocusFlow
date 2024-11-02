"use client";
import DarkModeButton from "@/ui/block/button/DarkModeButton/DarkModeButton";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { getUser } from "@/redux/features/UserSlice/UserSlice";
import LogoContainer from "@/ui/block/Logo/Logo";
import NavMenu from "./NavMenu";
import useScreenWidth from "@/utils/useScreenWidth";

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
  const dispatch = useDispatch();
  const { user, status, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);


  return (
    <div className="bg-white dark:bg-primary container border-b border-input-border dark:border-dark-input-border z-[70] min-w-full">
      <div className="min-h-80 h-80 max-h-80 flex flex-row justify-between items-center z-50 relative">
        <div className="flex flex-row gap-16 items-center">
          <LogoContainer />
        </div>
        <div className="w-full hidden lg:flex justify-center items-center">
          <NavMenu />
        </div>
        <div className="flex flex-row gap-16 items-center">
          <DarkModeButton />
          <UserBadge user={user} />
        </div>
      </div>
    </div>
  );
}
