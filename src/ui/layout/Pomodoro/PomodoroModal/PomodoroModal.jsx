"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/PomodoroSlice/PomodoroSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FlipClock from "@/ui/component/Dashboard/todotask/TimeTracker/FlipClock";
import dynamic from "next/dynamic";

const Bg = dynamic(
  () => import("@/ui/component/Dashboard/todotask/TimeTracker/Bg"),
  {
    loading: () => <div>loading...</div>,
    ssr: true,
  }
);


export default function PomodoroModal({ time }) {
  const dispatch = useDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const onClose = () => {
    dispatch(toggleTask());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 bg-[#000000]">
      <div className="w-full h-full flex flex-col justify-between relative p-32">
        <div className="flex flex-row justify-between items-center w-full z-50">
          <h1 className="text-lg font-medium text-input-bg">
            Pomodoro Timer
          </h1>
          <ButtonWithIcon
            icon={
              <XMarkIcon className="h-24 w-24 dark:text-input-bg text-primary" />
            }
            onClick={onClose}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center z-50">
          <FlipClock
            time={
              parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1])
            }
          />
        </div>
      </div>
      <Bg />
    </div>
  );
}
