"use client";
import React, { useCallback, useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Avvvatars from "avvvatars-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authLogout } from "@/redux/features/AuthSlice/AuthSlice";

export default function UserBadge({ user }) {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu(!menu);

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
  return (
    <motion.button
      className={`flex flex-row md:gap-12 gap-4 items-center cursor-pointer relative z-[70]`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleMenu}
    >
      <div className="h-40 w-40 rounded-full">
        <Avvvatars
          value={user?.username}
          border={false}
          size={40}
          style="character"
        />
      </div>
      <div className="flex-col items-start gap-0 md:flex hidden">
        <p className="text-xs font-medium text-primary dark:text-input-bg">
          {user?.username}
        </p>
        <p className="text-xs font-normal text-light">{user?.email}</p>
      </div>
      <motion.button
        initial={{ rotate: 0 }}
        animate={{ rotate: menu ? 180 : 0 }}
      >
        <ChevronDownIcon className="h-[14px] w-[14px] text-primary dark:text-input-bg" />
      </motion.button>

      {menu && (
        <motion.div
          className="absolute top-[48px] right-0 bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border h-fit min-w-[150px] w-[200px] xl:w-full z-[80] rounded-main shadow-lg flex flex-col gap-0 p-8"
          initial={{ opacity: 0, scale: 0.5, y: 10, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10, rotate: 8.5 }}
        >
          <div
            className="flex items-center justify-start p-8 flex-row gap-8 hover:bg-white hover:dark:bg-primary rounded-main hover:border hover:border-input-border hover:dark:border-dark-input-border"
          >
            <UserCircleIcon className="h-[24px] w-[24px] text-primary dark:text-input-bg" />
            <p className="text-sm font-medium text-primary dark:text-input-bg">
              Profile
            </p>
          </div>
          <div
            className="flex items-center justify-start p-8 flex-row gap-8 hover:bg-white hover:dark:bg-primary rounded-main hover:border hover:border-input-border hover:dark:border-dark-input-border"
            onClick={handleLogout}
          >
            <ArrowLeftStartOnRectangleIcon className="h-[24px] w-[24px] text-primary dark:text-input-bg" />
            <p className="text-sm font-medium text-primary dark:text-input-bg">
              Logout
            </p>
          </div>
        </motion.div>
      )}
    </motion.button>
  );
}
