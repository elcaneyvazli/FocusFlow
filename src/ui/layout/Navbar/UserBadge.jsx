"use client";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import profile from "@/ui/assert/profile.jpg";
import { motion } from "framer-motion";
import Avvvatars from "avvvatars-react";

export default function UserBadge({ user }) {
  return (
    <motion.div
      className="flex flex-row md:gap-12 gap-4 items-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="h-40 w-40 rounded-full">
        <Avvvatars
          value={user?.username}
          border={false}
          size={40}
          style="shape"
        />
      </div>
      <div className="flex-col gap-0 md:flex hidden">
        <p className="text-xs font-medium text-primary dark:text-input-bg">
          {user?.username}
        </p>
        <p className="text-xs font-normal text-light">{user?.email}</p>
      </div>
      <ChevronDownIcon className="h-[14px] w-[14px] text-primary dark:text-input-bg" />
    </motion.div>
  );
}
