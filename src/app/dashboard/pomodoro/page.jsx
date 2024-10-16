"use client";
import { ChevronDown, PauseIcon, PlayIcon } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import TextInput from "@/ui/block/input/TextInput/TextInput";
import TimeTrackerSelectItem from "@/ui/component/Dashboard/todotask/TimeTracker/TimeTrackerSelectItem";
import PomodoroTimer from "@/ui/component/Dashboard/Pomodoro/PomodoroTimer";

export default function page() {
  return (
    <div className="flex flex-col justify-between items-center min-h-full w-full">
      {/* <div className="w-[30%]">
        <TimeTrackerSelectItem />
      </div> */}
      <PomodoroTimer />
      {/* <div className="flex flex-col gap-16 items-center justify-center">
        <div className="w-[300px] h-[300px] bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-full flex items-center justify-center">
          <div className="w-[250px] h-[250px] bg-[#037ef3] border border-input-border dark:border-dark-input-border rounded-full flex items-center justify-center"></div>
        </div>
        <div className="flex flex-row gap-16 items-center justify-center">
          <div className="flex items-center justify-center h-40 w-40 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-full whitespace-normal">
            <p className="text-md font-semibold text-primary dark:text-white whitespace-normal">
              -5
            </p>
          </div>
          <p className="text-4xl font-semibold text-primary dark:text-white whitespace-normal">
            25:00
          </p>
          <div className="flex items-center justify-center h-40 w-40 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-full whitespace-normal">
            <p className="text-md font-semibold text-primary dark:text-white whitespace-normal">
              +5
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-16">
        <motion.button
          className="px-8 bg-red-bg dark:border-dark-input-border border border-input-border rounded-full h-48 w-48 flex items-center justify-center cursor-pointer"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowPathIcon className="w-40 h-40 text-red-text" />
        </motion.button>
        <motion.button
          className="px-8 bg-green-bg dark:border-dark-input-border border border-input-border rounded-full h-64 w-64 flex items-center justify-center cursor-pointer"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlayIcon className="w-40 h-40 text-green-text" />
        </motion.button>
        <motion.button
          className="px-8 bg-gray-bg dark:border-dark-input-border border border-input-border rounded-full h-48 w-48 flex items-center justify-center cursor-pointer"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PauseIcon className="w-40 h-40 text-gray-text" />
        </motion.button>
      </div> */}
    </div>
  );
}
