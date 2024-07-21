import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ClockIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function KanbanAiItem({ task }) {
  return (
    <motion.div
      className="flex flex-col gap-16 cursor-pointer relative"
      layoutId={task.id}
      layout
    >
      <div className="flex flex-col gap-8 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 rounded-main z-10 relative">
        <div className="flex flex-row justify-between items-center">
          <motion.div
            className={`flex items-center justify-center border border-input-border dark:border-0 h-[20px] w-[20px] rounded-main cursor-pointer ${
              task.isCompleted ? "bg-primary" : "bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {task.isCompleted && (
              <CheckIcon className="h-[12px] w-[12px] text-white" />
            )}
          </motion.div>
          <div className="rounded-main hover:bg-input-bg p-8 dark:hover:bg-primary">
            <EllipsisHorizontalIcon className="h-[18px] w-[18px] text-primary dark:text-input-bg" />
          </div>
        </div>
        <div className="flex flex-col gap-0 cursor-pointer w-full h-full">
          <h1 className="text-md font-bold text-primary dark:text-input-bg max-w-full line-clamp-3">
            {task.title}
          </h1>
          <p className="text-xs text-light line-clamp-1">{task.description}</p>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <ClockIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-sm text-primary dark:text-input-bg">Activity</p>
          </div>
          <p className="text-sm text-primary dark:text-input-bg">-</p>
          <div
            className={`px-8 py-4 flex items-center justify-center border border-input-border dark:border-dark-input-border rounded-main whitespace-nowrap  bg-${
              task.status === 0
                ? "gray"
                : task.status === 1
                ? "blue"
                : "green"
            }-bg`}
          >
            <p
              className={`text-xs text-${
                task.status === 0
                  ? "gray"
                  : task.status === 1
                  ? "blue"
                  : "green"
              }-text `}
            >
              {task.status == 0
                ? "To do"
                : task.status == 1
                ? "In Progress"
                : "Done"}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <CalendarDaysIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-sm text-primary dark:text-input-bg">Due To</p>
          </div>
          <p className="text-sm text-primary dark:text-input-bg">-</p>
          <p className="text-sm text-light">
            {new Date(task.dueDate).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <BookmarkIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-sm text-primary dark:text-input-bg">Label</p>
          </div>
          <p className="text-sm text-primary dark:text-input-bg">-</p>
          <div className="px-8 py-4 flex items-center justify-center border border-input-border dark:border-dark-input-border dark:bg-primary bg-input-bg rounded-main whitespace-nowrap">
            <p className="text-xs text-primary dark:text-input-bg">
              {task.label}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}