"use client";
import React from "react";
import ActivityChart from "./ActivityChart";
import { ChartBar } from "lucide-react";
import { motion } from "motion/react";

const generateActivityData = () => {
  const data = [];
  const today = new Date();

  // Adjust to 364 days to get exactly 52 weeks
  for (let i = 364; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    data.push({
      date: date
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "."),
      desktop: Math.round(Math.random()),
      completedTasks: Math.floor(Math.random() * 10),
    });
  }

  return data;
};

export default function ActivityChartContainer() {
  const data = generateActivityData();

  return (
    <motion.div
      className="relative h-fit w-full bg-elevation border border-border rounded-md flex flex-col justify-between gap-16 p-16 z-40"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-row items-center gap-12 z-40">
        <div className="p-8 bg-primary-100 border border-primary-600 rounded-md">
          <ChartBar className="text-primary-600" size={24} />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-medium text-text leading-none">
            User Activity
          </h1>
          <p className="text-md font-normal text-light leading-none">
            Showing user activity
          </p>
        </div>
      </div>
      <div className="w-full h-full overflow-x-auto overflow-y-hidden pb-4 pr-4">
        <ActivityChart data={data} />
      </div>
    </motion.div>
  );
}
