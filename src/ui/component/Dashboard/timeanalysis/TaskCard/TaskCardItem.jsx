import Link from "next/link";
import React from "react";

export default function TaskCardItem({ title, icon, data, activity }) {
  return (
    <div
      className={`bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border flex flex-col gap-8 items-start w-full rounded-main px-12 py-12`}
    >
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-primary dark:text-input-bg text-lg font-medium">
          {title}
        </h1>
        <div className="px-8 py-8 bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg rounded-main">
          {icon}
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <h1 className="font-bold text-4xl text-primary dark:text-input-bg">
          {data}
        </h1>
        {/* <div className="flex flex-row gap-4 items-end">
          <div
            className={`w-[10px] h-[45px] rounded-t-[2px]
              ${activity ? "bg-green-bg" : "bg-red-bg"}
              `}
          ></div>
          <div
            className={`w-[10px] h-[38px] rounded-t-[2px]
              ${activity ? "bg-green-bg" : "bg-red-bg"}
              `}
          ></div>
          <div
            className={`w-[10px] h-[51px] rounded-t-[2px]
              ${activity ? "bg-green-bg" : "bg-red-bg"}
              `}
          ></div>
          <div
            className={`w-[10px] h-[18px] rounded-t-[2px]
              ${activity ? "bg-green-bg" : "bg-red-bg"}
              `}
          ></div>
          <div
            className={`w-[10px] h-[35px] rounded-t-[2px]
              ${activity ? "bg-green-bg" : "bg-red-bg"}
              `}
          ></div>
          <div
            className={`w-[10px] h-[47px] rounded-t-[2px]
              ${activity ? "bg-green-bg" : "bg-red-bg"}
              `}
          ></div>
          <div
            className={`w-[10px] h-[54px] rounded-t-[2px]
              ${activity ? "bg-green-text" : "bg-red-text"}
              `}
          ></div>
        </div> */}
      </div>
      <div className="flex flex-row justify-between w-full pt-8 items-center border-t border-input-border ">
        <h1 className="text-light text-xs">From the last week</h1>
      </div>
    </div>
  );
}
