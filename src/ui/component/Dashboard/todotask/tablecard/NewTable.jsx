import {
  CheckIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { deleteTask, updateTask } from "@/services/task/task.services";

export default function NewTable({ data, onEditTask }) {
  const [show, setShow] = useState({});
  const [showMenu, setShowMenu] = useState(null);

  const handleToggle = (id) => {
    setShow((prevShow) => ({
      ...prevShow,
      [id]: !prevShow[id],
    }));
  };

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

  if (!data || data.length === 0) {
    return null; // Or return a placeholder message if needed
  }

  return (
    <div className="flex flex-col gap-16 items-start overflow-x-auto">
      {data.map((tasks) => {
        const isExpanded = show[tasks.id];

        return (
          <div key={tasks.id} className="flex flex-col gap-16 w-full">
            <div className="flex flex-row gap-8 items-center w-full">
              <motion.div
                onClick={() => handleToggle(tasks.id)}
                animate={{ rotate: isExpanded ? 90 : 0 }}
              >
                <ChevronRightIcon
                  className={`h-[24px] w-[24px] text-primary dark:text-white cursor-pointer`}
                />
              </motion.div>
              <div
                className={`flex w-fit items-center justify-center py-4 px-32 bg-${
                  tasks.id === 0
                    ? "red"
                    : tasks.id === 1
                    ? "blue"
                    : tasks.id === 2
                    ? "green"
                    : "gray"
                }-bg rounded-main`}
              >
                <p
                  className={`text-sm w-fit text-${
                    tasks.id === 0
                      ? "red"
                      : tasks.id === 1
                      ? "blue"
                      : tasks.id === 2
                      ? "green"
                      : "gray"
                  }-text`}
                >
                  {tasks.title}
                </p>
              </div>
            </div>

            {isExpanded && tasks.items && tasks.items.length > 0 && (
              <div className="flex flex-col gap-4 w-full rounded-main overflow-x-auto">
                {tasks.items
                  .filter((task) => !task.isCompleted)
                  .map((task) => (
                    <div
                      className="flex flex-col gap-0 bg-white dark:bg-dark-input-bg w-full relative rounded-main border border-input-bg dark:border-dark-input-border"
                      key={task.id}
                    >
                      <div
                        className="flex flex-row gap-0 items-center bg-white dark:bg-dark-input-bg relative w-full rounded-main"
                        key={task.id}
                      >
                        <div className="flex flex-row gap-8 p-16 max-w-[250px] min-w-[250px] border-r border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg rounded-l-main">
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

                        <div className="flex flex-row items-center justify-center gap-8 px-16 min-w-[500px] lg:w-full border-r border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
                          <div className="px-8 py-4 flex items-center justify-center border border-input-border dark:border-dark-input-border dark:bg-primary bg-input-bg rounded-main whitespace-nowrap">
                            <p className="text-xs text-primary dark:text-input-bg">
                              {task.label}
                            </p>
                          </div>
                          <h1 className="text-black dark:text-input-bg text-sm font-medium line-clamp-1 w-full">
                            {task.description}
                          </h1>
                        </div>
                        <div className="flex items-center px-16 justify-center min-w-[150px] max-w-[150px] border-r border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg">
                          <div
                            className={`flex w-full items-center justify-center py-8 bg-${
                              task.status === 0
                                ? "gray"
                                : task.status === 1
                                ? "blue"
                                : "green"
                            }-bg rounded-main w-full`}
                          >
                            <p
                              className={`text-sm w-fit text-${
                                task.status === 0
                                  ? "gray"
                                  : task.status === 1
                                  ? "blue"
                                  : "green"
                              }-text`}
                            >
                              {task.status === 0
                                ? "Todo"
                                : task.status === 1
                                ? "In Progress"
                                : "Done"}
                            </p>
                          </div>
                        </div>
                        <div className="flex p-16 min-w-[150px] border-r border-input-border dark:border-dark-input-border h-[53px] bg-white dark:bg-dark-input-bg items-center justify-center">
                          <p className="text-sm text-black dark:text-input-bg whitespace-nowrap line-clamp-1">
                            {new Date(task.dueDate).toLocaleDateString(
                              "en-UK",
                              {
                                day: "numeric",
                                month: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <motion.button
                          className="border-r border-input-border dark:border-dark-input-border h-[53px] flex items-center justify-center min-w-[50px] bg-white dark:bg-dark-input-bg cursor-pointer"
                          onClick={() => onEditTask(task)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <PencilIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                        </motion.button>
                        <motion.button
                          className="border-input-border dark:border-dark-input-border h-[53px] flex items-center justify-center min-w-[50px] bg-white dark:bg-dark-input-bg rounded-r-main cursor-pointer"
                          onClick={() => handleDelete(task.id)}
                          whileTap={{ scale: 0.9 }}
                        >
                          <TrashIcon className="h-[16px] w-[16px] text-primary dark:text-input-bg" />
                        </motion.button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
