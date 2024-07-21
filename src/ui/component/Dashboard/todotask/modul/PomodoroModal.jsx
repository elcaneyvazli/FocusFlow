"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/PomodoroSlice/PomodoroSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import TimeTrackerFull from "@/ui/component/Dashboard/todotask/TimeTracker/TimeTrackerFull";
import Vowfm from "@/ui/component/Dashboard/todotask/TimeTracker/Vowfm";

const Bg = dynamic(
  () => import("@/ui/component/Dashboard/todotask/TimeTracker/Bg"),
  {
    loading: () => <div>loading...</div>,
    ssr: true,
  }
);

export default function PomodoroModal({ time, isRunning }) {
  const dispatch = useDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const onClose = () => {
    dispatch(toggleTask());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-[#000000]">
      <div className="w-full h-screen flex flex-col justify-between relative p-32">
        <div className="flex flex-row justify-between items-center w-full z-50">
          <h1 className="text-lg font-medium text-input-bg">Pomodoro Timer</h1>
          <ButtonWithIcon
            icon={
              <XMarkIcon className="h-24 w-24 dark:text-input-bg text-primary" />
            }
            onClick={onClose}
          />
        </div>
        <div className="h-full w-full z-50 flex items-center justify-center">
          <TimeTrackerFull time={time} isRunning={isRunning} />
        </div>
        {/* <Vowfm time={time}/> */}
      </div>
      <div className="w-full h-full">
        <Bg />
      </div>
    </div>
  );
}
