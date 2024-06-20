"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/PomodoroSlice/PomodoroSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FlipClock from "@/ui/component/Dashboard/todotask/TimeTracker/FlipClock";

export default function PomodoroModal({ time }) {
  const dispatch = useDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const onClose = () => {
    dispatch(toggleTask());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex flex-col p-32 z-50 bg-input-bg dark:bg-dark-input-bg justify-between">
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="text-lg font-medium text-primary dark:text-input-bg">
          Pomodoro Timer
        </h1>
        <ButtonWithIcon
          icon={
            <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
          }
          onClick={onClose}
        />
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <FlipClock
          time={
            parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1])
          }
        />
      </div>
    </div>
  );
}
