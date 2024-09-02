"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/TaskSlice/TaskSlice";

export default function NewTaskButton() {
  const dispatch = useDispatch();
  return (
    <motion.button
      className="bg-primary dark:bg-dark-input-bg dark:border dark:border-dark-input-border opacity-100 hover:opacity-95 text-bg text-sm font-bold rounded-[10px] overflow-hidden sm:w-fit w-full h-[40px] flex flex-row items-center justify-center px-32 whitespace-nowrap"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => dispatch(toggleTask())}
    >
      <p className="text-white text-sm font-medium">New Task</p>
    </motion.button>
  );
}
