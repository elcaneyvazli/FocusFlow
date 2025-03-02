"use client";
import React from "react";
import ActivityChart from "./ActivityChart";
import { ChartBar } from "lucide-react";
import { motion } from "motion/react";
import { useActivity } from "@/services/activity.services";

export default function ActivityChartContainer() {
  const { activities, isLoading } = useActivity();

  const generateLast365Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        taskCount: 0
      });
    }
    return days;
  };

  const processedData = React.useMemo(() => {
    const allDays = generateLast365Days();
    const activityMap = new Map(
      activities?.map(item => [
        item.date.split('T')[0],
        item
      ])
    );

    return allDays.map(day => {
      const activityData = activityMap.get(day.date) || { taskCount: 0 };
      return {
        date: new Date(day.date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }).replace(/\//g, "."),
        desktop: activityData.taskCount > 0 ? 1 : 0,
        completedTasks: activityData.taskCount
      };
    });
  }, [activities]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <ActivityChart data={processedData} />
      </div>
    </motion.div>
  );
}
