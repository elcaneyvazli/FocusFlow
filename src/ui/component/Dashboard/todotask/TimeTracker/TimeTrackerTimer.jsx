"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowPathIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";

export default function TimeTrackerTimer({
  isRunning,
  handleStart,
  handlePause,
  handleReset,
}) {
  return (
    <div className="flex flex-row items-center gap-4 relative">
      <motion.button
        className="px-8 bg-green-bg dark:border-dark-input-border border border-input-border rounded-full h-40 w-40 flex items-center justify-center cursor-pointer"
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStart}
      >
        <PlayIcon className="w-24 h-24 text-green-text" />
      </motion.button>
      <motion.button
        className="px-8 bg-gray-bg dark:border-dark-input-border border border-input-border rounded-full h-40 w-40 flex items-center justify-center cursor-pointer"
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePause}
      >
        <PauseIcon className="w-24 h-24 text-gray-text" />
      </motion.button>
      <motion.button
        className="px-8 bg-red-bg dark:border-dark-input-border border border-input-border rounded-full h-40 w-40 flex items-center justify-center cursor-pointer"
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleReset}
      >
        <ArrowPathIcon className="w-24 h-24 text-red-text" />
      </motion.button>
    </div>
  );
}
