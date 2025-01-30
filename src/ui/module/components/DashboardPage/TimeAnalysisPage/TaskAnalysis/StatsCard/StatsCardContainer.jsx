"use client";
import React from "react";
import { ClipboardCheck, ClipboardList, ClipboardPenLine } from "lucide-react";
import { useTasks } from "@/services/task.services";
import StatsCard from "./StatsCard";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import { motion } from "motion/react";

export default function StatsCardContainer() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
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
    );
  }

  const totalTask = tasks.total;
  const completedTask = tasks.completed;
  const pendingTask = tasks.pending;
  const Stats = [
    {
      title: "Total Task",
      percentage: 15,
      status: "success",
      value: totalTask,
      icon: <ClipboardList className="text-text" size={24} />,
    },
    {
      title: "Completed Tasks",
      percentage: 23,
      status: "error",
      value: completedTask,
      icon: <ClipboardCheck className="text-text" size={24} />,
    },
    {
      title: "Pending Task",
      percentage: 32,
      status: "success",
      value: pendingTask,
      icon: <ClipboardPenLine className="text-text" size={24} />,
    },
  ];

  return (
    <motion.div
      className="bg-elevation border border-border rounded-md w-full grid grid-cols-12"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      {Stats.map((task, index) => (
        <StatsCard
          key={index}
          title={task.title}
          percentage={task.percentage}
          type={task.status}
          value={task.value}
          icon={task.icon}
          isLoading={isLoading}
        />
      ))}
    </motion.div>
  );
}
