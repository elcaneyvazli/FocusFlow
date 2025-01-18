"use client";
import dynamic from "next/dynamic";
import { ClipboardCheck, ClipboardList, ClipboardPenLine } from "lucide-react";
import React from "react";
import { useTasks } from "@/services/task.services";

const AnalysisCard = dynamic(() => import("./AnalysisCard"), {
  loading: () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-elevation border border-border flex flex-col items-start justify-between w-full rounded-md px-12 py-12 animate-pulse h-[168px]">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="h-12 w-80 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="px-8 py-8 bg-background border border-border text-text rounded-md">
          <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700 rounded-md" />
        </div>
      </div>
      <div>
        <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
      <div className="flex flex-row justify-between w-full pt-8 items-center border-t border-border">
        <div className="h-12 w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
        <div className="h-12 w-64 bg-gray-300 dark:bg-gray-700 rounded-md" />
      </div>
    </div>
  ),
});

export default function AnalysisCardContainer() {
  const { tasks, isLoading } = useTasks();

  const totalTask = tasks.total;
  const completedTask = tasks.completed;
  const pendingTask = tasks.pending;

  return (
    <div className="grid grid-cols-12 w-full gap-16">
      <AnalysisCard
        title={"Total Task"}
        icon={<ClipboardList className="text-text" size={24} />}
        data={totalTask}
        isLoading={isLoading}
      />
      <AnalysisCard
        title={"Completed Task"}
        icon={<ClipboardCheck className="text-text" size={24} />}
        data={completedTask}
        isLoading={isLoading}
      />
      <AnalysisCard
        title={"Pending Task"}
        icon={<ClipboardPenLine className="text-text" size={24} />}
        data={pendingTask}
        isLoading={isLoading}
      />
    </div>
  );
}
