import { ArrowUpIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function TaskCardItem({ title, icon, data, activity, img }) {
  return (
    <div
      className={`bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border flex flex-col gap-8 items-start w-full rounded-main px-8 sm:px-12 py-8 relative overflow-hidden`}
    >
      <div className="flex flex-row items-center justify-between w-full z-50">
        <h1 className="text-primary dark:text-input-bg text-xl font-medium">
          {title}
        </h1>
      </div>
      <div className="flex flex-row items-start justify-between bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border w-full rounded-main px-12 py-8">
        <div className="flex flex-col gap-0">
          <div className="flex flex-row justify-between w-full z-50">
            <h1 className="font-bold text-4xl text-primary dark:text-input-bg">
              {data}
            </h1>
          </div>
          <div className="flex flex-row justify-between w-full items-end z-50 gap-8">
            <div className="hidden xs:flex flex-row items-center gap-4 border border-[#22C55E] bg-[#DCFCE7] p-4 rounded-[5px]">
              <ArrowUpIcon className="h-16 w-16 text-[#22C55E]" />
              <h1 className="text-[#22C55E] text-xs">2.6%</h1>
            </div>
            <h1 className="text-light text-xs">
              From the last week
            </h1>
          </div>
        </div>
        <div className="p-8 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}
