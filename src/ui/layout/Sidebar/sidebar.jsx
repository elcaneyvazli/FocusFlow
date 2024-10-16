"use client";
import React, { useCallback } from "react";
import {
  ArrowLeftOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { SideBarItem } from "@/library/sidebaritem";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import LogoContainer from "@/ui/block/Logo/Logo";
import { toggleSidebar } from "@/redux/features/SidebarButtonSlice/SidebarButtonSlice";
import Cookies from "js-cookie";
import { authLogout } from "@/redux/features/AuthSlice/AuthSlice";

export default function Sidebar() {
  const sidebarButtonReducer = useAppSelector(
    (state) => state.sidebarButtonReducer.value.sidebarButton
  );
  const pathname = usePathname();
  const router = useRouter();

  const dispatch = useDispatch();

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(authLogout());
      router.push("/login");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [dispatch, router]);

  const toggleSidebarButton = () => {
    dispatch(toggleSidebar());
  };

  return (
    <>
      <div
        className={`flex-col h-full justify-between items-start w-[227px] bg-white dark:bg-primary py-16 px-16 border-x border-input-border dark:border-dark-input-border xl:flex z-50
        ${
          sidebarButtonReducer
            ? "flex fixed top-0 left-0 z-50 h-screen bg-primary w-[250px]"
            : "hidden"
        }
      `}
      >
        <div className="flex flex-col gap-96 w-full">
          <div className="flex flex-row justify-between items-center">
            <LogoContainer />
            <motion.button
              className="border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg  p-8 rounded-main xl:hidden flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebarButton}
            >
              <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
            </motion.button>
          </div>
          <div className="flex flex-col gap-24 w-full">
            {/* <PomodoroButton /> */}
            <div className="flex flex-col gap-12 w-full">
              {SideBarItem.map((item, index) => (
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
                    <h1
                      className={`text-md font-normal ${
                        pathname === item.link
                          ? "text-white dark:text-input-bg hover:opacity-95"
                          : "text-primary dark:text-input-bg hover:opacity-70"
                      }`}
                    >
                      {item.title}
                    </h1>
                  </motion.button>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <motion.button
          className="w-full border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg rounded-main flex flex-row items-center gap-4 px-12 py-12"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          <ArrowLeftOnRectangleIcon className="w-24 h-24 text-primary dark:text-input-bg" />
          <h1 className="text-md font-normal">Log Out</h1>
        </motion.button>
      </div>

      {sidebarButtonReducer && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebarButton}
        ></div>
      )}
    </>
  );
}
