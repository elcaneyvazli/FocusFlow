import { ChartPieIcon } from "@heroicons/react/24/outline";
import React from "react";

export default function ProgressChart() {
  const data = [
    {
      id: 1,
      name: "To Do",
      value: 13,
      color: "#9CA3AF",
    },
    {
      id: 2,
      name: "In Progress",
      value: 18,
      color: "#037ef3",
    },
    {
      id: 3,
      name: "Done",
      value: 6,
      color: "#046C4E",
    },
  ];

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  console.log(totalValue);

  return (
    <div className="h-full w-full bg-white border border-input-border dark:bg-dark-input-bg dark:border-dark-input-border rounded-main flex flex-col justify-between gap-16 p-16 overflow-hidden">
      <div className="flex flex-col gap-16">
        <div className="flex flex-row items-center gap-12">
          <div className="p-8 bg-blue-light border border-blue-primary rounded-main">
            <ChartPieIcon className="h-24 w-24 text-blue-primary" />
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="text-xl font-medium text-black dark:text-white">
              Task column
            </h1>
            <p className="text-md font-normal text-light">
              Showing total column task
            </p>
          </div>
        </div>
        <div className="w-full h-32 flex flex-row gap-4 rounded-full bg-input-bg dark:bg-primary border border-input-border dark:border-dark-input-border py-6 px-8">
          {data.map((item) => {
            const widthPercentage = (item.value / totalValue) * 100;
            return (
              <div
                key={item.id}
                className={`h-full rounded-full`}
                style={{
                  width: `${widthPercentage}%`,
                  backgroundColor: item.color,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8 h-full overflow-y-auto">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between gap-4 "
            >
              <div
                className={`flex flex-row items-center gap-4 px-8`}
                style={{ borderLeft: `4px solid ${item.color}` }}
              >
                <p className="text-lg font-normal text-primary dark:text-input-bg">
                  {item.name}:
                </p>
              </div>
              <p className="text-xl font-normal text-primary dark:text-input-bg">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
