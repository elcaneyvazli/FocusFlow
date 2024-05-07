import React from "react";
import AboutImg from "@/ui/assert/about.jpg";
import Image from "next/image";
import {
  ClockIcon,
  NoSymbolIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function About() {
  return (
    <div className="grid grid-cols-3 gap-16">
      <div className="row-span-2">
        <Image
          src={AboutImg}
          alt="about"
          width={0}
          height={0}
          draggable = "false"
          className="w-full h-full object-cover bg-center rounded-main"
        />
      </div>
      <div className="flex flex-col gap-16 items-start border border-input-border bg-input-bg rounded-main p-16">
        <div className="rounded-main p-12 bg-black text-white">
          <ClockIcon className="h-[30px] w-[30px] text-white" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-black text-2xl">Master Your Time</h1>
          <p className="text-light text-lg">
            Plan your schedule, break down tasks, and leverage the Pomodoro
            Technique to work in focused bursts.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-16 items-start border border-input-border bg-input-bg rounded-main p-16">
        <div className="rounded-main p-12 bg-black text-white">
          <PresentationChartBarIcon className="h-[30px] w-[30px] text-white" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-black text-2xl">Unlock Data-Driven Insights</h1>
          <p className="text-light text-lg">
            Analyze your work patterns, pinpoint areas for improvement, and
            watch your productivity skyrocket.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-16 items-start border border-input-border bg-input-bg rounded-main p-16">
        <div className="rounded-main p-12 bg-black text-white">
          <UserGroupIcon className="h-[30px] w-[30px] text-white" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-black text-2xl">Ignite Your Focus Flame</h1>
          <p className="text-light text-lg">
            Join a supportive community, participate in friendly challenges, and
            stay motivated on your journey to peak performance.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-16 items-start border border-input-border bg-input-bg rounded-main p-16">
        <div className="rounded-main p-12 bg-black text-white">
          <NoSymbolIcon className="h-[30px] w-[30px] text-white" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-black text-2xl">Eliminate Distractions</h1>
          <p className="text-light text-lg">
            Block distractions, track your deep work sessions, and collaborate
            with a focus on accountability.
          </p>
        </div>
      </div>
    </div>
  );
}
