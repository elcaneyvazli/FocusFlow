"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AddTaskButton() {
  return (
    <motion.button
      className="bg-primary opacity-100 hover:opacity-95 text-bg text-sm font-bold rounded-[10px] px-16 py-12 w-full relative overflow-hidden"
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-white text-sm font-medium">Add Task</p>
    </motion.button>
  );
}
