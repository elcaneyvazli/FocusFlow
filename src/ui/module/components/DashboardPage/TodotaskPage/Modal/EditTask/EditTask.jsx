"use client";
import { toggleEditTask, addEditTask } from "@/redux/features/TaskSlice/TaskSlice";
import { useAppSelector } from "@/redux/store";
import useScreenWidth from "@/ui/module/utils/UseScreenWidth/useScreenWidth";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useDispatch } from "react-redux";
import EditTaskForm from "./EditTaskForm";
import { useTasks } from "@/services/task.services";

export default function EditTask() {
  const dispatch = useDispatch();
  const taskValue = useAppSelector((state) => state.task.editTaskButton);
  const taskToEdit = useAppSelector((state) => state.task.editTask);
  const { mutate } = useTasks();

  if (!taskToEdit && taskValue) {
    return null;
  }

  const onClose = () => {
    dispatch(toggleEditTask());
    dispatch(addEditTask(null));
    mutate();
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
        {taskToEdit && <EditTaskForm onClose={onClose} task={taskToEdit} />}
      </div>
    )
  );
}
