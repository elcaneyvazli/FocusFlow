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
import { deleteTask, updateTask } from "@/services/task/task.services";
import { useDispatch } from "react-redux";

export default function KanbanCardItem({
  task,
  onDragStart,
  columnId,
  setEditTask,
}) {
  const dispatch = useDispatch();

  const handleEditTask = () => {
    dispatch(toggleEditTask());
    setEditTask(task);
    toggleMenu();
  };

  const [editTask, setEditTaskState] = useState(false);

  const handleDelete = async () => {
    await deleteTask(task.id);
    toggleMenu();
  };

  const handleToggleCompleted = async (task) => {
    task.isCompleted = !task.isCompleted;
    try {
      await updateTask(task.id, task);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const toggleMenu = () => {
    setEditTaskState(!editTask);
  };

  const toggleSelect = () => {
    dispatch(toggleTaskModul(task));
  };

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <>
      <motion.div
        className="flex flex-col gap-16 cursor-pointer relative"
        draggable
        onDragStart={(e) => onDragStart(e, task.id, columnId, task)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.95 }}
        layoutId={task.id}
        layout
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-8 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 rounded-main z-10 relative">
          <div className="flex flex-row justify-between items-center">
            <motion.div
              className={`flex items-center justify-center border border-input-border dark:border-0 h-[20px] w-[20px] rounded-main cursor-pointer ${
                task.isCompleted ? "bg-primary" : "bg-white"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleToggleCompleted(task)}
            >
              {task.isCompleted && (
                <CheckIcon className="h-[12px] w-[12px] text-white" />
              )}
            </motion.div>
            <div
              className="rounded-main hover:bg-input-bg p-8 dark:hover:bg-primary"
              onClick={toggleMenu}
            >
              <EllipsisHorizontalIcon className="h-[18px] w-[18px] text-primary dark:text-input-bg" />
            </div>
          </div>
          <div
            className="flex flex-col gap-0 cursor-pointer w-full h-full"
            onClick={toggleSelect}
          >
            <h1 className="text-md font-bold text-primary dark:text-input-bg max-w-full line-clamp-3">
              {task.title}
            </h1>
            <p className="text-xs text-light line-clamp-1">
              {task.description}
            </p>
          </div>
          <div className="flex flex-row gap-8 items-center">
            <div className="flex flex-row gap-2 items-center">
              <ClockIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
              <p className="text-sm text-primary dark:text-input-bg">
                Activity
              </p>
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
        {editTask && (
          <div className="absolute top-40 right-40 flex flex-col bg-input-bg rounded-main border border-input-border z-50 dark:bg-primary dark:border-dark-input-border shadow-sm">
            <div
              className="flex flex-row gap-8 items-center py-12 pl-16 pr-80 border-b border-input-border dark:border-dark-input-border"
              onClick={handleEditTask}
            >
              <PencilIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
              <h1 className="text-primary dark:text-white text-sm">Edit</h1>
            </div>

            <div
              className="flex flex-row gap-8 items-center py-12 pl-16 pr-80"
              onClick={handleDelete}
            >
              <TrashIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
              <h1 className="text-primary dark:text-white text-sm">Delete</h1>
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
