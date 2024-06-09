"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AddTaskButton({ onClick }) {
  return (
    <motion.button
      className="bg-primary dark:bg-dark-input-bg dark:border-dark-input-border opacity-100 hover:opacity-95 text-bg text-sm font-bold rounded-[10px] px-16 py-12 w-full relative overflow-hidden"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
    >
      <p className="text-white text-sm font-medium">Add Task</p>
    </motion.button>
  );
}
