import React, { useEffect, useState } from "react";
import Image from "next/image";
import Chart from "@/ui/assert/chart.svg";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import OnlyViewCalendar from "@/ui/block/input/Dueto/OnlyviewCalendar";
import TeamFeatures from "./TeamFeatures";
import { motion } from "framer-motion";
import CircularProgressBar from "./CircularProgressBar";
import HalfCircularProgressBar from "./HalfCircularProgressBar";
import { useAppSelector } from "@/redux/store";

export default function Features() {
  const isDarkMode = useAppSelector((state) => state.darkMode);

  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateSelect = (date) => {
    const selectedDayjsDate = dayjs(date);
    setSelectedDate(selectedDayjsDate);
    setIsCalendarOpen(false);
  };
  return (
    <div className="grid grid-cols-12 gap-16 w-full h-full">
      <motion.div
        className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-center relative overflow-hidden"
        whileHover={{ rotate: -2 }}
      >
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Pomodoro</h1>
          <p className="text-light text-lg">
            Keep track of the number of pomodoro
          </p>
        </div>
        <div className="absolute bottom-0">
          <HalfCircularProgressBar progress={"18:46"} />
        </div>
      </motion.div>
      <motion.div
        className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-16 p-16 h-[270px] overflow-hidden"
        whileHover={{ rotate: 2, scale: 1.01 }}
      >
        <div className="flex flex-col gap-0 w-full items-start justify-start h-fit">
          <h1 className="text-black dark:text-input-bg text-2xl">Calendar</h1>
          <p className="text-light text-lg">Keep track of you day</p>
        </div>
        <div className="w-full h-full relative">
          <div className="absolute top-0 right-0 w-full h-full">
            <OnlyViewCalendar
              today={today}
              setToday={setToday}
              selectedDate={selectedDate}
              setSelectedDate={handleDateSelect}
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 row-span-2 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col justify-between p-16 items-end relative min-h-[450px]"
        whileHover={{ rotate: 2 }}
      >
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Team</h1>
          <p className="text-light text-lg">
            Create your team and share your data
          </p>
        </div>
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
            <TeamFeatures />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col justify-between p-16 h-[270px] items-end relative overflow-hidden"
        whileHover={{ rotate: 2 }}
      >
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Tasks</h1>
          <p className="text-light text-lg">
            Keep track of the number of tasks
          </p>
        </div>
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg font-bold text-4xl">
            262
          </h1>
          <p className="text-light text-lg">from the last month</p>
        </div>
        <div className="absolute bottom-0 right-0">
          <CircularProgressBar progress={64} />
        </div>
      </motion.div>
      <motion.div
        className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative"
        whileHover={{ rotate: 2 }}
      >
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Statistics</h1>
          <p className="text-light text-lg">Keep track of your statistic</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full">
          <Image
            src={Chart}
            alt="chart"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden w-full object-cover bg-center"
          />
        </div>
      </motion.div>
    </div>
  );
}
