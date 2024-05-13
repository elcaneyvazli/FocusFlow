"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function TableCardItem() {
  const [check, setcheck] = useState(false);

  return (
    <div className="flex flex-row gap-0 items-center bg-white dark:bg-dark-input-bg">
      <div className="flex flex-row gap-8 p-16 max-w-[250px] min-w-[250px] border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
        <motion.div
          className={`flex items-center justify-center border border-input-border dark:border-dark-input-border min-h-[20px] min-w-[20px] rounded-[5px] cursor-pointer ${
            check ? "bg-primary" : "bg-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setcheck(!check)}
        >
          {check && <CheckIcon className="h-[16px] w-[16px] text-white" />}
        </motion.div>
        <h1 className="text-black dark:text-input-bg text-sm font-medium line-clamp-1">
          Lorem ipsum dolor sit Lorem ipsum dolor sit Lorem ipsum dolor sit
          Lorem ipsum dolor sit
        </h1>
      </div>
      <div className="flex items-center justify-center px-16 border-r border-b border-input-border dark:border-dark-input-border h-[53px] min-w-[150px] bg-white dark:bg-dark-input-bg">
        <div className="flex items-center justify-center px-16 py-4 bg-[#FDE8E8] text-[#9B1C1C] rounded-main">
          <p className="text-sm w-fit">Must have</p>
        </div>
      </div>
      <div className="flex p-16 min-w-[500px] lg:w-full border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
        <h1 className="text-black dark:text-input-bg text-sm font-medium">
          Description
        </h1>
      </div>
      <div className="flex p-16 min-w-[150px] border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
        <h1 className="text-black dark:text-input-bg text-sm font-medium">
          Timeline
        </h1>
      </div>
      <div className="flex items-center justify-center px-16 h-[53px] min-w-[50px] bg-white dark:bg-dark-input-bg border-b border-input-border dark:border-dark-input-border">
        <EllipsisHorizontalIcon className="h-[24px] w-[24px] text-primary dark:text-input-bg" />
      </div>
    </div>
  );
}
