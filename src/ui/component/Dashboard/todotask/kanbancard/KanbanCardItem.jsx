import React from "react";
import { motion } from "framer-motion";
import {
  ClockIcon,
  BookmarkIcon,
  EllipsisHorizontalIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function KanbanCardItem({ task, onDragStart, columnId }) {
  return (
    <motion.div
      className="flex flex-col gap-16 cursor-pointer"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      layoutId={task.id}
      layout
    >
      <div className="flex flex-col gap-8 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 rounded-main">
        <div className="flex flex-row justify-between items-center">
          <motion.div
            className={`flex items-center justify-center border border-input-border dark:border-0 h-[20px] w-[20px] rounded-main cursor-pointer ${
              task.status ? "bg-primary" : "bg-white"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {task.status && (
              <CheckIcon className="h-[12px] w-[12px] text-white" />
            )}
          </motion.div>
          <EllipsisHorizontalIcon className="h-[20px] w-[20px] text-primary dark:text-input-bg" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-md font-bold text-primary dark:text-input-bg">
            {task.title}
          </h1>
          <p className="text-xs text-light line-clamp-1">{task.description}</p>
        </div>
        <div className="flex flex-row gap-8 items-center">
          <div className="flex flex-row gap-2 items-center">
            <ClockIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
            <p className="text-sm text-primary dark:text-input-bg">Due To</p>
          </div>
          <p className="text-sm text-primary dark:text-input-bg">-</p>
          <p className="text-sm text-light">{task.timeline}</p>
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