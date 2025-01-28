import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, Ellipsis, Bookmark, CalendarDays } from "lucide-react";
export default function CalendarTaskItem({ task }) {
  return (
    <motion.div className="flex flex-col gap-8 cursor-pointer bg-background border border-border p-16 rounded-md z-10 relative">
      <div className="flex flex-row justify-between items-center">
        <motion.div
          className={`flex items-center justify-center border border-border h-[20px] w-[20px] rounded-full cursor-pointer ${
            task.isCompleted ? "bg-primary-600" : "bg-white"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {task.isCompleted && <Check className={"text-white"} size={12} />}
        </motion.div>
        <div className="rounded-md hover:bg-elevation p-8">
          <Ellipsis className="text-text" size={18} />
        </div>
      </div>
      <div className="flex flex-col gap-0 cursor-pointer w-full h-full">
        <h1 className="text-md font-bold text-text max-w-full line-clamp-3">
          {task.title}
        </h1>
        <p className="text-xs text-light line-clamp-2">{task.description}</p>
      </div>
      <div className="flex flex-row gap-8 items-center">
        <div className="flex flex-row gap-4 items-center">
          <Clock className="text-text" size={14} />
          <p className="text-sm text-text">Activity</p>
        </div>
        <p className="text-sm text-text">-</p>
        <div
          className={`px-8 py-4 flex items-center justify-center border border-border rounded-md whitespace-nowrap ${
            task.status === 0
              ? "bg-border"
              : task.status === 1
              ? "bg-primary-600 "
              : task.status === 2
              ? "bg-success-600"
              : "border"
          }`}
        >
          <p
            className={`text-xs text-${
              task.status === 0
                ? "light"
                : task.status === 1
                ? "white"
                : "white"
            }`}
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
        <div className="flex flex-row gap-4 items-center">
          <CalendarDays className="text-text" size={14} />
          <p className="text-sm text-text">Date</p>
        </div>
        <p className="text-sm text-text">-</p>
        <p className="text-sm text-light">
          {new Date(task.dueDate).toLocaleDateString("en-UK", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-row gap-4 items-center">
          <Bookmark className="text-text" size={14} />
          <p className="text-sm text-text">Label</p>
        </div>
        <p className="text-sm text-text">-</p>
        <div className="px-8 py-4 flex items-center justify-center border border-border bg-elevation rounded-md whitespace-nowrap">
          <p className="text-xs text-text">{task.label.toLowerCase()}</p>
        </div>
      </div>
    </motion.div>
  );
}
