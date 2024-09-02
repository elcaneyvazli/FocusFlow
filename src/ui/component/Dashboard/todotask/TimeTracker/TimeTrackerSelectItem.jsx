import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { motion } from "framer-motion";

const colorClasses = {
  red: {
    bg: "bg-red-bg",
    text: "text-red-text",
  },
  blue: {
    bg: "bg-blue-bg",
    text: "text-blue-text",
  },
  green: {
    bg: "bg-green-bg",
    text: "text-green-text",
  },
  gray: {
    bg: "bg-gray-bg",
    text: "text-gray-text",
  },
};

export default function TimeTrackerSelectItem({
  data,
  selectedTask,
  setSelectedTask,
  isOpen,
  setIsOpen,
}) {
  return (
    <motion.div className="relative w-full">
      <motion.button
        className="flex flex-row items-center justify-between gap-8 w-full bg-white dark:bg-dark-input-bg px-12 py-8 rounded-main border border-input-border dark:border-dark-input-border"
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1 className="text-primary dark:text-input-bg text-md font-bold">
          {selectedTask ? selectedTask.title : "Select Task"}
        </h1>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
          <ChevronRightIcon className="w-[18px] h-[18px] text-light" />
        </motion.div>
      </motion.button>
      {isOpen && (
        <motion.div
          className="absolute top-[110%] left-0 w-full h-auto max-h-[350px] rounded-[10px] shadow-4 z-50 border border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg overflow-y-scroll"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="relative flex flex-col gap-4">
            {data?.map((category) => {
              const columnColor =
                category.id === 0
                  ? colorClasses.red
                  : category.id === 1
                  ? colorClasses.blue
                  : category.id === 2
                  ? colorClasses.green
                  : category.id === 3
                  ? colorClasses.gray
                  : null;
              return (
                <div
                  key={category.id}
                  className="px-8 py-8 flex flex-col gap-4"
                >
                  <div
                    className={`flex px-8 py-4 ${columnColor.bg} rounded-main`}
                  >
                    <h2 className={`${columnColor.text}`}>{category.title}</h2>
                  </div>
                  <div className="relative flex flex-col gap-4">
                    {category.items.map((task) => {
                      if (!task.isCompleted) {
                        return (
                          <div
                            key={task.id}
                            className="cursor-pointer text-sm text-primary dark:text-input-bg hover:bg-input-border dark:hover:bg-dark-input-border rounded-main px-12 py-4"
                            onClick={() => {
                              setSelectedTask(task);
                              setIsOpen(false);
                            }}
                          >
                            <h1 className="text-sm text-primary dark:text-input-bg">
                              {task.title}
                            </h1>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
