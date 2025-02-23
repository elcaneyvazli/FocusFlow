"use client";
import { togglePomodoroTask, toggleSelectTask } from "@/redux/features/TimerSlice/TimerSlice";
import { useAppSelector } from "@/redux/store";
import { motion } from "motion/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useTasks } from "@/services/task.services";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";

export default function AddTask() {
  const dispatch = useDispatch();
  const taskValue = useAppSelector((state) => state.timer.pomodoroTask);
  const { columns, mutate } = useTasks();

  const onClose = () => {
    dispatch(togglePomodoroTask());
    mutate();
  };

  const isMobile = useScreenWidth(768);
  const formMotionProps = isMobile
    ? {
        initial: { y: "100%", opacity: 0 },
        animate: { y: "0%", opacity: 1 },
        exit: { y: "100%", opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { scale: 0, rotate: "8.5deg" },
        animate: { scale: 1, rotate: "0deg" },
        exit: { scale: 0, rotate: "0deg" },
      };

  return (
    taskValue && (
      <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-[100]">
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        ></motion.div>
        <motion.div
          className="fixed top-[40%] md:top-64 w-[100%] md:w-[90%] lg:w-[65%] h-[60%] bg-background z-50 rounded-t-md md:rounded-md border border-border shadow-lg flex flex-col md:justify-normal justify-between"
          initial={{ scale: 0, rotate: "8.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
        >
          <div className="h-full overflow-y-auto p-16">
            {columns.map((column) => (
              <div key={column.id} className="mb-16 last:mb-0">
                <h3 className="text-text font-medium mb-8">{column.title}</h3>
                <div className="flex flex-col gap-8">
                  {column.items.map((task) => (
                    <motion.div
                      key={task.id}
                      className="p-8 bg-elevation border border-border rounded-md cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        dispatch(toggleSelectTask(task));
                        onClose();
                      }}
                    >
                      <p className="text-sm text-text font-medium">
                        {task.title}
                      </p>
                      <p className="text-xs text-light truncate">
                        {task.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
            {columns.every((column) => column.items.length === 0) && (
              <div className="p-12 text-center text-light">
                No tasks available
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  );
}
