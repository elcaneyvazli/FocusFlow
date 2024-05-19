"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { TaskData } from "@/library/taskdata";

export default function TableCardItem() {
  const [check, setcheck] = useState(false);

  return (
    <>
      {TaskData.map((task) => (
        <div
          className="flex flex-row gap-0 items-center bg-white dark:bg-dark-input-bg"
          key={task.id}
        >
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
              {task.title}
            </h1>
          </div>
          <div className="flex items-center justify-center px-16 border-r border-b border-input-border dark:border-dark-input-border h-[53px] min-w-[150px] bg-white dark:bg-dark-input-bg">
            {task.priority === 1 ? (
              <div className="flex items-center justify-center px-16 py-4 bg-red-bg text-red-text rounded-main w-full">
                <p className="text-sm w-fit">Must Have</p>
              </div>
            ) : task.priority === 2 ? (
              <div className="flex items-center justify-center px-16 py-4 bg-blue-bg text-blue-text rounded-main w-full">
                <p className="text-sm w-fit">Should Have</p>
              </div>
            ) : task.priority === 3 ? (
              <div className="flex items-center justify-center px-16 py-4 bg-green-bg text-green-text rounded-main w-full">
                <p className="text-sm w-fit">Could Have</p>
              </div>
            ) : task.priority === 4 ? (
              <div className="flex items-center justify-center px-16 py-4 bg-input-border text-light rounded-main w-full">
                <p className="text-sm w-fit">Won`&apos;`t Have</p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-row items-center justify-center gap-8 px-16 min-w-[500px] lg:w-full border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
            <div className="px-8 py-4 flex items-center justify-center border border-input-border dark:border-dark-input-border dark:bg-primary bg-input-bg rounded-main whitespace-nowrap">
              <p className="text-xs text-primary dark:text-input-bg">
                {task.label}
              </p>
            </div>
            <h1 className="text-black dark:text-input-bg text-sm font-medium line-clamp-1 w-full">
              {task.description}
            </h1>
          </div>
          <div className="flex p-16 min-w-[150px] border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
            <h1 className="text-black dark:text-input-bg text-sm font-medium">
              {task.timeline}
            </h1>
          </div>
          <div className="flex items-center justify-center px-16 h-[53px] min-w-[50px] bg-white dark:bg-dark-input-bg border-b border-input-border dark:border-dark-input-border">
            <EllipsisHorizontalIcon className="h-[24px] w-[24px] text-primary dark:text-input-bg" />
          </div>
        </div>
      ))}
    </>
  );
}
