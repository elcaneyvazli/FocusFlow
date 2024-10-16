import { ChartBarIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ActivityChart() {
  const data = [
    { date: "08.11.2024", desktop: 0 },
    { date: "08.12.2024", desktop: 1 },
    { date: "08.13.2024", desktop: 1 },
    { date: "08.14.2024", desktop: 0 },
    { date: "08.15.2024", desktop: 1 },
    { date: "08.16.2024", desktop: 1 },
    { date: "08.17.2024", desktop: 1 },
    { date: "08.18.2024", desktop: 1 },
    { date: "08.19.2024", desktop: 1 },
    { date: "08.20.2024", desktop: 0 },
    { date: "08.21.2024", desktop: 1 },
    { date: "08.22.2024", desktop: 1 },
    { date: "08.23.2024", desktop: 0 },
    { date: "08.24.2024", desktop: 1 },
    { date: "08.25.2024", desktop: 1 },
    { date: "08.26.2024", desktop: 1 },
    { date: "08.27.2024", desktop: 1 },
    { date: "08.28.2024", desktop: 0 },
    { date: "08.29.2024", desktop: 1 },
    { date: "08.30.2024", desktop: 1 },
    { date: "09.01.2024", desktop: 0 },
    { date: "09.02.2024", desktop: 1 },
    { date: "09.03.2024", desktop: 1 },
    { date: "09.04.2024", desktop: 1 },
    { date: "09.05.2024", desktop: 1 },
    { date: "09.06.2024", desktop: 1 },
    { date: "09.07.2024", desktop: 0 },
    { date: "09.08.2024", desktop: 1 },
  ];

  return (
    <div className="h-full w-full bg-white border border-input-border dark:bg-dark-input-bg dark:border-dark-input-border rounded-main flex flex-col justify-between gap-16 p-16 overflow-hidden">
      <div className="flex flex-row items-center gap-12">
        <div className="p-8 bg-blue-light border border-blue-primary rounded-main">
          <ChartBarIcon className="h-24 w-24 text-blue-primary" />
        </div>
        <div className="flex flex-col gap-0">
          <h1 className="text-xl font-medium text-black dark:text-white">
            User Activity
          </h1>
          <p className="text-md font-normal text-gray-500 dark:text-gray-400">
            Showing user activity
          </p>
        </div>
      </div>
      <div className="w-full h-full grid grid-cols-7 gap-4">
        {data.map((item) => (
          <div
            key={item.date}
            className={`col-span-1 rounded-md flex items-center justify-center text-xs font-medium transition-colors duration-300 border ${
              item.desktop === 1
                ? "bg-blue-500 border-blue-primary text-white"
                : "bg-input-bg border-input-border dark:bg-primary dark:border-dark-input-border"
            }`}
          >
            <p
              className={`text-md ${
                item.desktop === 1
                  ? "text-input-bg dark:text-input-bg"
                  : " text-primary dark:text-input-bg"
              }`}
            >
              {item.date.split(".")[1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
