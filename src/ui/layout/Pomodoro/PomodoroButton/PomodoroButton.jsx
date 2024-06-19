"use client";
import React from "react";
import { motion } from "framer-motion";
import { ClockIcon, PauseIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/PomodoroSlice/PomodoroSlice";

export default function PomodoroButton() {
  const dispatch = useDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const onClose = () => {
    dispatch(toggleTask());
  };

  return (
    <motion.button
      className="w-full bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border px-12 py-12 rounded-main flex flex-row justify-between items-center cursor-pointer "
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
    >
      <div className="w-full flex flex-row gap-8 items-center">
        <ClockIcon className="w-24 h-24 text-primary dark:text-input-bg" />
        <div className="flex flex-col gap-0 items-start">
          <p className="text-light text-xs font-light">Time Tracker</p>
          <p className="text-black dark:text-input-bg text-xs font-medium">
            00:01:38
          </p>
        </div>
      </div>
      <div className={`rounded-full px-4 py-4 border border-success-primary`}>
        <PauseIcon className={`w-16 h-16 font-bold text-success-primary`} />
      </div>
    </motion.button>
  );
}