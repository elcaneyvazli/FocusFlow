import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { toggleTask } from "@/redux/features/PomodoroSlice/PomodoroSlice";
import ButtonWithIcon from "@/ui/block/button/ButtonWithIcon/ButtonWithIcon";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import TimeTrackerTimer from "./TimeTrackerTimer";
import TimeTrackerSelectItem from "./TimeTrackerSelectItem";
import PomodoroModal from "@/ui/component/Dashboard/todotask/modul/PomodoroModal";

export default function TimeTrackerContainer({ data }) {
  const dispatch = useDispatch();
  const pomodoro = useAppSelector((state) => state.pomodoro.pomodoro);
  const onClose = () => {
    dispatch(toggleTask());
  };

  const [isWorking, setIsWorking] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTimeRemaining =
        Number(localStorage.getItem("timeRemaining")) || 25 * 60;
      const storedSelectedTask =
        JSON.parse(localStorage.getItem("selectedTask")) || null;

      setTimeRemaining(storedTimeRemaining);
      setSelectedTask(storedSelectedTask);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          const newTime = prevTime - 1;
          if (typeof window !== "undefined") {
            localStorage.setItem("timeRemaining", newTime);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeRemaining === 0) {
      setIsWorking((prevState) => !prevState);
      const newTime = isWorking ? 5 * 60 : 25 * 60;
      setTimeRemaining(newTime);
      if (typeof window !== "undefined") {
        localStorage.setItem("timeRemaining", newTime);
      }
    }
  }, [timeRemaining, isWorking]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
    }
  }, [selectedTask]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };
  const handlePause = () => {
    setIsRunning(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    const newTime = isWorking ? 25 * 60 : 5 * 60;
    setTimeRemaining(newTime);
    if (typeof window !== "undefined") {
      localStorage.setItem("timeRemaining", newTime);
    }
  };

  return (
    <>
      <motion.div className="w-full bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 flex flex-col md:flex-row justify-between rounded-main gap-32 cursor-pointer">
        <div className="flex flex-row items-center gap-16 w-full">
          <ButtonWithIcon
            icon={<ArrowsPointingOutIcon className="w-24 h-24" />}
            className="bg-primary text-white dark:bg-primary dark:text-primary"
            onClick={onClose}
          />
          <TimeTrackerSelectItem
            data={data}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
        <div className="flex flex-col xs:flex-row items-center justify-between md:justify-center gap-8">
          <h1 className="text-primary dark:text-input-bg text-4xl sm:text-3xl font-bold">
            {formatTime(timeRemaining)}
          </h1>
          <TimeTrackerTimer
            isRunning={isRunning}
            handleStart={handleStart}
            handlePause={handlePause}
            handleReset={handleReset}
          />
        </div>
      </motion.div>
      {pomodoro && (
        <PomodoroModal time={formatTime(timeRemaining)} isRunning={isRunning} />
      )}
    </>
  );
}
