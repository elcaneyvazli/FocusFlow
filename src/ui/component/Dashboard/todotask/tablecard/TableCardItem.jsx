import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { updateTask, deleteTask } from "@/services/task/task.services";

export default function TableCardItem({ data, onEditTask }) {
  const [showMenu, setShowMenu] = useState(null);

  const handleToggleCompleted = async (task) => {
    task.isCompleted = !task.isCompleted;
    try {
      await updateTask(task.id, task);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleToggleMenu = (taskId) => {
    setShowMenu((prevMenu) => (prevMenu === taskId ? null : taskId));
  };

  return (
    <>
      {data?.map((task) => (
        <div
          className="flex flex-col gap-0 bg-white dark:bg-dark-input-bg w-full relative"
          key={task.id}
        >
          {task?.items
            .filter((task) => !task.isCompleted)
            .map((task) => (
              <div
                className="flex flex-row gap-0 items-center bg-white dark:bg-dark-input-bg relative"
                key={task.id}
              >
                <div className="flex flex-row gap-8 p-16 max-w-[250px] min-w-[250px] border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
                  <motion.div
                    className={`flex items-center justify-center border border-input-border dark:border-dark-input-border min-h-[20px] min-w-[20px] rounded-[5px] cursor-pointer ${
                      task.isCompleted ? "bg-primary" : "bg-white"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleCompleted(task)}
                  >
                    {task.isCompleted && (
                      <CheckIcon className="h-[16px] w-[16px] text-white" />
                    )}
                  </motion.div>
                  <h1 className="text-black dark:text-input-bg text-sm font-medium line-clamp-1">
                    {task.title}
                  </h1>
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
                <div className="flex items-center px-16 justify-center min-w-[150px] max-w-[150px] border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
                  <div
                    className={`flex w-full items-center justify-center py-8 bg-${
                      task.taskPriority === 0
                        ? "red"
                        : task.taskPriority === 1
                        ? "blue"
                        : task.taskPriority === 2
                        ? "green"
                        : "gray"
                    }-bg rounded-main w-full`}
                  >
                    <p
                      className={`text-sm w-fit text-${
                        task.taskPriority === 0
                          ? "red"
                          : task.taskPriority === 1
                          ? "blue"
                          : task.taskPriority === 2
                          ? "green"
                          : "gray"
                      }-text`}
                    >
                      {task.taskPriority === 0
                        ? "Must have"
                        : task.taskPriority === 1
                        ? "Should Have"
                        : task.taskPriority === 2
                        ? "Could Have"
                        : "Won't Have"}
                    </p>
                  </div>
                </div>
                <div className="flex p-16 min-w-[150px] border-r border-b border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg items-center justify-center">
                  <p className="text-sm text-black dark:text-input-bg whitespace-nowrap line-clamp-1">
                    {new Date(task.dueDate).toLocaleDateString("en-UK", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="border-b border-input-border dark:border-dark-input-border h-[53px] flex items-center justify-center min-w-[50px] bg-white dark:bg-dark-input-bg relative">
                  <EllipsisHorizontalIcon
                    className="w-[24px] h-[24px] text-primary dark:text-input-bg mx-12 cursor-pointer"
                    onClick={() => handleToggleMenu(task.id)}
                  />
                  {showMenu === task.id && (
                    <div className="absolute top-12 right-32 flex flex-col bg-input-bg rounded-main border border-input-border z-50 dark:bg-primary dark:border-dark-input-border shadow-sm">
                      <div
                        className="flex flex-row gap-8 items-center py-12 pl-16 pr-80 border-b border-input-border dark:border-dark-input-border cursor-pointer"
                        onClick={() => onEditTask(task)}
                      >
                        <PencilIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                        <h1 className="text-primary dark:text-white text-sm">
                          Edit
                        </h1>
                      </div>
                      <div
                        className="flex flex-row gap-8 items-center py-12 pl-16 pr-80 cursor-pointer"
                        onClick={() => handleDelete(task.id)}
                      >
                        <TrashIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                        <h1 className="text-primary dark:text-white text-sm">
                          Delete
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      ))}
    </>
  );
}
