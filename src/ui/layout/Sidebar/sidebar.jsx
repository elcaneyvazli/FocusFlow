"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/ui/assert/Logowbg.svg";
import {
  ArrowLeftStartOnRectangleIcon,
  ClockIcon,
  DocumentCheckIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { SideBarItem } from "@/library/sidebaritem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import LogoContainer from "@/ui/block/Logo/Logo";

export default function Sidebar() {
  const pathname = usePathname();

  const dispatch = useDispatch();
  const sidebarButtonReducer = useAppSelector(
    (state) => state.sidebarButtonReducer.value.sidebarButton
  );

  return (
    <div className="flex-col h-full justify-between items-start w-[227px] bg-white dark:bg-primary py-16 px-16 border-r border-input-border dark:border-dark-input-border hidden xl:flex ">
      <div className="flex flex-col gap-64 w-full">
        <LogoContainer />
        <div className="flex flex-col gap-24 w-full">
          <div className="w-full bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border px-12 py-12 rounded-main flex flex-row justify-between items-center">
            <div className="w-full flex flex-row gap-8 items-center">
              <ClockIcon className="w-24 h-24 text-primary dark:text-input-bg" />
              <div className="flex flex-col gap-0 items-start">
                <p className="text-light text-xs font-light">Time Tracker</p>
                <p className="text-black dark:text-input-bg text-xs font-medium">
                  00:01:38
                </p>
              </div>
            </div>
            <motion.button className="rounded-full px-4 py-4 border border-success-primary">
              <PauseIcon className="w-16 h-16 font-bold text-success-primary" />
            </motion.button>
          </div>
          <div className="flex flex-col gap-12 w-full">
            {SideBarItem.map((item, index) => {
              return (
                <Link href={item.link} key={index}>
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`border border-input-border dark:border-dark-input-border px-12 py-12 w-full flex flex-row items-center justify-start gap-8 rounded-main ${
                      pathname === item.link
                        ? "bg-primary dark:bg-dark-input-bg text-white hover:opacity-95"
                        : "bg-white dark:bg-primary text-primary dark:text-input-bg border-0 hover:opacity-70"
                    }`}
                  >
                    {item.icon}
                    <h1 className="text-md font-normal">{item.title}</h1>
                  </motion.button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Link href="/login" className="w-full">
        <motion.button
          className="w-full border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg rounded-main flex flex-row items-center gap-4 px-12 py-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftStartOnRectangleIcon className="w-24 h-24 text-primary dark:text-input-bg" />
          <h1 className="text-md font-normal">Log Out</h1>
        </motion.button>
      </Link>
    </div>
  );
}
