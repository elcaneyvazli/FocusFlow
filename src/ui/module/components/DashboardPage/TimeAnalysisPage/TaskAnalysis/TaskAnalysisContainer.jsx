import React from "react";
import dynamic from "next/dynamic";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";

const TaskCard = dynamic(() => import("./StatsCard/TaskCard"), {
  loading: () => (
    <div className="animate-pulse bg-elevation border border-border rounded-md w-full p-12 grid grid-cols-12 gap-16">
      {[...Array(3)].map((_, index) => (
        <div
          className="col-span-12 md:col-span-6 xl:col-span-4 flex flex-col gap-16 w-full"
          key={index}
        >
          <div className="flex flex-row items-start justify-between w-full">
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-64 h-24 rounded-md"></div>
            <div className="animate-pulse bg-gray-300 dark:bg-gray-700 w-32 h-32 rounded-md"></div>
          </div>
          <div className="flex flex-row items-start justify-between w-full">
            <Spinner />
            <div className="w-64 h-64 animate-pulse bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  ),
});
const LineChartContainer = dynamic(
  () => import("./LineChart/LineChartContainer"),
  {
    loading: () => <Spinner />,
  }
);
const ActivityChartContainer = dynamic(
  () => import("./ActivityChart/ActivityChartContainer"),
  {
    loading: () => <Spinner />,
  }
);

export default function TaskAnalysisContainer() {
  return (
    <div className="col-span-12 lg:col-span-8 w-full h-auto lg:h-full flex flex-col gap-16 lg:overflow-y-auto">
      <TaskCard />
      <LineChartContainer />
      <div className="flex flex-row gap-12 w-full h-full">
        <ActivityChartContainer />
      </div>
    </div>
  );
}
