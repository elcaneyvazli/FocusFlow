import React from "react";
import Image from "next/image";
import Pomodoro from "@/ui/assert/pomodoro.svg";
import Calendar from "@/ui/assert/calendar.svg";
import Chart from "@/ui/assert/chart.svg";
import Team from "@/ui/assert/team.svg";
import Circle from "@/ui/assert/circle.svg";
import Pomodorodark from "@/ui/assert/pomodorodark.svg";
import Calendardark from "@/ui/assert/calendardark.svg";
import Chartdark from "@/ui/assert/chartdark.svg";
import Teamdark from "@/ui/assert/teamdark.svg";
import Circledark from "@/ui/assert/circledark.svg";
import { useAppSelector } from "@/redux/store";

export default function Features() {
  const darkModeButtonReducer = useAppSelector(
    (state) => state.darkModeReducer.value.darkMode
  );

  console.log(darkModeButtonReducer);

  return (
    <div className="grid grid-cols-12 gap-16 w-full h-full">
      <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-3 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-center relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Pomodoro</h1>
          <p className="text-light text-lg">
            Keep track of the number of pomodoro
          </p>
        </div>
        <div className="absolute bottom-0">
          <Image
            src={darkModeButtonReducer === false ? Pomodoro : Pomodorodark}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden object-cover bg-center "
          />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Calendar</h1>
          <p className="text-light text-lg">Keep track of you day</p>
        </div>
        <div className="absolute bottom-0 right-0">
          <Image
            src={darkModeButtonReducer === false ? Calendar : Calendardark}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden object-cover bg-center"
          />
        </div>
      </div>
      <div className="col-span-4 row-span-2 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main hidden xl:flex flex-col justify-between p-16 items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Team</h1>
          <p className="text-light text-lg">
            Create your team and share your data
          </p>
        </div>
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
            <Image
              src={darkModeButtonReducer === false ? Team : Teamdark}
              alt="pomodoro"
              width={0}
              height={0}
              draggable="false"
              className="overflow-hidden w-full object-cover bg-center"
            />
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-7 xl:col-span-5 border-input-border dark:border-dark-input-border bg-input-bg dark:bg-dark-input-bg border rounded-main flex flex-col justify-between p-16 h-[270px] items-end relative">
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
        <div className="absolute bottom-12 right-12 ">
          <Image
            src={darkModeButtonReducer === false ? Circle : Circledark}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden object-cover bg-center"
          />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-5 xl:col-span-3  border-input-border dark:border-dark-input-border border bg-input-bg dark:bg-dark-input-bg rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black dark:text-input-bg text-2xl">Statistics</h1>
          <p className="text-light text-lg">Keep track of your statistic</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full">
          <Image
            src={darkModeButtonReducer === false ? Chart : Chartdark}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden w-full object-cover bg-center"
          />
        </div>
      </div>
    </div>
  );
}
