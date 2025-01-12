"use client";
import React, { useState, useEffect } from "react";
import { LogOut, ChevronDown, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Avvvatars from "avvvatars-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authLogout, getUser } from "@/redux/features/AuthSlice/AuthSlice";
import { useAppSelector } from "@/redux/store";

export default function UserBadge() {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, status } = useAppSelector((state) => ({
    user: state.auth.user,
    status: state.auth.status,
  }));

  useEffect(() => {
    if (!user) {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  const handleLogout = async () => {
    try {
      await dispatch(authLogout()).unwrap();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (!user || status === "loading") {
    return (
      <div className="flex flex-row md:gap-8 gap-4 items-center animate-pulse">
        <div className="h-[32px] w-[32px] bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="flex-col items-start gap-2 md:flex hidden">
          <div className="h-[12px] w-[80px] bg-gray-300 dark:bg-gray-700 rounded-md" />
          <div className="h-[12px] w-[120px] bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
        <div className="h-[14px] w-[14px] bg-gray-300 dark:bg-gray-700 rounded-sm" />
      </div>
    );
  }

  return (
    <motion.div
      className="relative"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <motion.button
        className="flex flex-row md:gap-8 gap-4 items-center cursor-pointer"
        whileTap={{ scale: 0.95 }}
        onClick={() => setMenu(!menu)}
      >
        <div className="h-[32px] w-[32px] rounded-full">
          <Avvvatars
            value={user?.username || "User"}
            border={false}
            size={32}
            style="character"
            borderSize={2}
            borderColor="#fff"
          />
        </div>
        <div className="flex-col items-start gap-0 md:flex hidden">
          <p className="text-xs font-medium text-text">
            {user?.username || "User"}
          </p>
          <p className="text-xs font-normal text-light">
            {user?.email || "Loading..."}
          </p>
        </div>
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: menu ? 180 : 0 }}
        >
          <ChevronDown className="h-[14px] w-[14px] text-text" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="absolute top-[48px] right-0 bg-elevation border border-border h-fit min-w-[150px] w-[200px] xl:w-full z-[80] rounded-md shadow-lg flex flex-col gap-0 p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex items-center justify-start p-8 flex-row gap-8 hover:bg-background rounded-md hover:border hover:border-border">
              <UserCircle className="h-[24px] w-[24px] text-text" />
              <p className="text-sm font-medium text-text">Profile</p>
            </div>
            <div
              className="flex items-center justify-start p-8 flex-row gap-8 hover:bg-background rounded-md hover:border hover:border-border cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-[24px] w-[24px] text-text" />
              <p className="text-sm font-medium text-text">Logout</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
