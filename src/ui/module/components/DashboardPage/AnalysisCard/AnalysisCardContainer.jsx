"use client";
import dynamic from "next/dynamic";
import { ClipboardCheck, ClipboardList, ClipboardPenLine } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTasks } from "@/redux/features/TaskSlice/TaskSlice";
import { useAppSelector } from "@/redux/store";

const AnalysisCard = dynamic(() => import("./AnalysisCard"), {
  loading: () => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-elevation border border-border flex flex-col gap-8 items-start w-full rounded-md px-12 py-12 animate-pulse">
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
  const dispatch = useDispatch();
  const { task } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const totalTask = task.total;
  const completedTask = task.completed;
  const pendingTask = task.pending;

  return (
    <div className="grid grid-cols-12 w-full gap-16">
      <AnalysisCard
        title={"Total Task"}
        icon={<ClipboardList className="text-text" size={24} />}
        data={totalTask}
      />
      <AnalysisCard
        title={"Completed Task"}
        icon={<ClipboardCheck className="text-text" size={24} />}
        data={completedTask}
      />
      <AnalysisCard
        title={"Pending Task"}
        icon={<ClipboardPenLine className="text-text" size={24} />}
        data={pendingTask}
      />
    </div>
  );
}
