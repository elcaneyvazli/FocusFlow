import React from "react";
import Image from "next/image";
import Pomodoro from "@/ui/assert/pomodoro.svg";
import Calendar from "@/ui/assert/calendar.svg";
import Chart from "@/ui/assert/chart.svg";
import Team from "@/ui/assert/team.svg";
import Circle from "@/ui/assert/circle.svg";

export default function Features() {
  return (
    <div className="grid grid-cols-12 gap-16 w-full h-full">
      <div className="col-span-3 bg-input-bg border border-input-border rounded-main flex flex-col gap-40 p-16 h-[270px] items-center relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black text-2xl">Pomodoro</h1>
          <p className="text-light text-lg">
            Keep track of the number of pomodoro
          </p>
        </div>
        <div className="absolute bottom-0">
          <Image
            src={Pomodoro}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden object-cover bg-center "
          />
        </div>
      </div>
      <div className="col-span-5 bg-input-bg border border-input-border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black text-2xl">Pomodoro</h1>
          <p className="text-light text-lg">
            Keep track of the number of pomodoro
          </p>
        </div>
        <div className="absolute bottom-0 right-0">
          <Image
            src={Calendar}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden object-cover bg-center"
          />
        </div>
      </div>
      <div className="col-span-4 row-span-2 bg-input-bg border border-input-border rounded-main flex flex-col justify-between p-16 items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black text-2xl">Team</h1>
          <p className="text-light text-lg">
            Create your team and share your data
          </p>
        </div>
        <div className="w-full h-full relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden">
            <Image
              src={Team}
              alt="pomodoro"
              width={0}
              height={0}
              draggable="false"
              className="overflow-hidden w-full object-cover bg-center"
            />
          </div>
        </div>
      </div>

      <div className="col-span-5 bg-input-bg border border-input-border rounded-main flex flex-col justify-between p-16 h-[270px] items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black text-2xl">Tasks</h1>
          <p className="text-light text-lg">
            Keep track of the number of tasks
          </p>
        </div>
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black font-bold text-4xl">262</h1>
          <p className="text-light text-lg">from the last month</p>
        </div>
        <div className="absolute bottom-12 right-12 ">
          <Image
            src={Circle}
            alt="pomodoro"
            width={0}
            height={0}
            draggable="false"
            className="overflow-hidden object-cover bg-center"
          />
        </div>
      </div>
      <div className="col-span-3 bg-input-bg border border-input-border rounded-main flex flex-col gap-40 p-16 h-[270px] items-end relative">
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <h1 className="text-black text-2xl">Statistics</h1>
          <p className="text-light text-lg">Keep track of your statistic</p>
        </div>
        <div className="absolute bottom-0 right-0 w-full">
          <Image
            src={Chart}
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
