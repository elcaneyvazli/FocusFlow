import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTaskModul } from "@/redux/features/TaskSlice/TaskSlice";
import { AnimatePresence, motion } from "framer-motion";
import useScreenWidth from "@/utils/useScreenWidth";

export default function SelectedTaskModul() {
  const dispatch = useDispatch();

  const selectedTaskValue = useAppSelector(
    (state) => state.selectedTaskReducer.value.modul
  );
  const fullScreen = useAppSelector(
    (state) => state.selectedTaskReducer.value.fullscreen
  );
  const selectedTask = useAppSelector(
    (state) => state.selectedTaskReducer.value.selectedTask
  );

  const toggleSelect = () => {
    dispatch(toggleTaskModul());
  };

  console.log(selectedTask);

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

  return selectedTaskValue ? (
    <AnimatePresence>
      <div className="fixed top-0 left-0 w-full h-full md:h-screen flex justify-center z-50">
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-40 z-40"
          onClick={toggleSelect}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ></motion.div>
        <motion.div
          className="fixed top-[40%] md:top-64 w-[100%] md:w-[70%] xl:w-[50%] h-[60%] md:h-fit bg-input-bg dark:bg-primary z-50 rounded-t-main md:rounded-main border border-input-border dark:border-dark-input-border shadow-lg flex flex-col p-16 gap-16"
          {...formMotionProps}
        >
          <div className="flex flex-col gap-0 ">
            <h1 className="text-primary dark:text-input-bg text-3xl font-bold">
              {selectedTask.title}
            </h1>
            <p className="text-primary dark:text-input-bg text-md">
              {selectedTask.description}
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-16 items-center justify-between">
            <div
              className={`px-8 py-8 flex items-center justify-center border border-input-border dark:border-dark-input-border rounded-main whitespace-nowrap w-full bg-${
                selectedTask.priority === 0
                  ? "red"
                  : selectedTask.priority === 1
                  ? "blue"
                  : selectedTask.priority === 2
                  ? "green"
                  : "gray"
              }-bg`}
            >
              <p
                className={`text-xs text-${
                  selectedTask.priority === 0
                    ? "red"
                    : selectedTask.priority === 1
                    ? "blue"
                    : selectedTask.priority === 2
                    ? "green"
                    : "gray"
                }-text`}
              >
                {selectedTask.priority === 0
                  ? "Must"
                  : selectedTask.priority === 1
                  ? "Should"
                  : selectedTask.priority === 2
                  ? "Could"
                  : "Won't"}
              </p>
            </div>
            <div
              className={`px-8 py-8 flex items-center justify-center border border-input-border dark:border-dark-input-border rounded-main whitespace-nowrap w-full bg-${
                selectedTask.status === 0
                  ? "gray"
                  : selectedTask.status === 1
                  ? "blue"
                  : "green"
              }-bg`}
            >
              <p
                className={`text-xs text-${
                  selectedTask.status === 0
                    ? "gray"
                    : selectedTask.status === 1
                    ? "blue"
                    : "green"
                }-text`}
              >
                {selectedTask.status == 0
                  ? "To do"
                  : selectedTask.status == 1
                  ? "In Progress"
                  : "Done"}
              </p>
            </div>
            <div
              className={`px-8 py-8 flex items-center justify-center border border-input-border dark:border-dark-input-border rounded-main whitespace-nowrap w-full bg-input-bg dark:bg-dark-input-bg`}
            >
              <p className={`text-xs text-primary dark:text-input-bg`}>
                {selectedTask.label}
              </p>
            </div>
            <div
              className={`px-8 py-8 flex items-center justify-center border border-input-border dark:border-dark-input-border rounded-main whitespace-nowrap w-full bg-input-bg dark:bg-dark-input-bg`}
            >
              <p className={`text-xs text-primary dark:text-input-bg`}>
                {new Date(selectedTask.dueDate).toLocaleDateString("en-UK", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  ) : null;
}
