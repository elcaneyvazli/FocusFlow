"use client";
import Breadcrumb from "../../block/breadcrumb/breadcrumb";
import {
  BellIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import profile from "@/ui/assert/profile.jpg";
import SidebarToggleButton from "@/ui/block/button/SidebarToggleButton/SidebarToggleButton";
import { motion } from "framer-motion";
import DarkModeButton from "@/ui/block/button/DarkModeButton/DarkModeButton";

export default function navbar() {
  return (
    <div className="px-16 py-12 flex flex-row justify-between items-center bg-white dark:bg-primary border-b border-input-border dark:border-dark-input-border">
      <div className="flex flex-row gap-16 items-center">
        <SidebarToggleButton />
        <Breadcrumb />
      </div>
      <div className="flex flex-row gap-16 items-center">
        <DarkModeButton />
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 bg-input-bg border border-input-border rounded-main h-40"
        >
          <BellIcon className="h-24 w-24 text-primary" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 bg-input-bg border border-input-border rounded-main h-40"
        >
          <Cog8ToothIcon className="h-24 w-24 text-primary" />
        </motion.button> */}
        <motion.div
          className="flex flex-row md:gap-12 gap-4 items-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="h-40 w-40 rounded-full">
            <Image
              src={profile}
              alt="avatar"
              width={0}
              height={0}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="flex-col gap-0 md:flex hidden">
            <p className="text-xs font-medium text-primary dark:text-input-bg">John Doe</p>
            <p className="text-xs font-normal text-light">johndoe@gmail.com</p>
          </div>
          <ChevronDownIcon className="h-[14px] w-[14px] text-primary dark:text-input-bg" />
        </motion.div>
      </div>
    </div>
  );
}
