"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/PomodoroSlice/PomodoroSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PomodoroModal() {
  const dispatch = useDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const onClose = () => {
    dispatch(toggleTask());
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full md:h-screen flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="relative w-full h-full md:w-[50%] md:h-fit bg-white dark:bg-primary px-16 py-16 rounded-main flex flex-col gap-16 justify-between md:justify-center z-50">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-lg font-medium text-primary dark:text-input-bg">
            Time Tracker
          </h1>
          <ButtonWithIcon
            icon={
              <XMarkIcon className="h-24 w-24 text-primary dark:text-input-bg" />
            }
            onClick={onClose}
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="h-[250px] w-[250px] flex items-center justify-center relative">
            <div className="absolute w-full h-full border-[12px] border-input-bg dark:border-dark-input-border rounded-full">
              <div className="absolute top-0 left-0 w-full h-full border-8 rounded-full"></div>
            </div>
            <h1 className="text-4xl">00:00</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
