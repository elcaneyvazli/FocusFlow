"use client";
import WeeklyCalendar from "@/ui/module/blocks/Calendar/WeeklyCalendar";
import React, { useState } from "react";
import dayjs from "dayjs";
import Empty from "@/ui/assets/empty.svg";
import Image from "next/image";
import { useTasks } from "@/services/task.services";
import { motion } from "motion/react";
import { Ellipsis, Clock, Check, CalendarDays, Bookmark } from "lucide-react";

export default function CalendarTaskContainer() {
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { columns, isLoading, isError, mutate } = useTasks();

  const getTasksForSelectedDate = () => {
    const tasks = [];
    columns?.forEach((column) => {
      column.items.forEach((task) => {
        if (
          dayjs(task.dueDate).format("YYYY-MM-DD") ===
          selectedDate.format("YYYY-MM-DD")
        ) {
          tasks.push({
            ...task,
            columnTitle: column.title,
            columnColor: column.color,
          });
        }
      });
    });
    return tasks;
  };

  const tasksForSelectedDate = getTasksForSelectedDate();

  return (
    <div className="col-span-4 bg-elevation border border-border w-full h-full max-h-full text-text rounded-md p-8 overflow-hidden flex flex-col gap-16">
      <WeeklyCalendar
        today={today}
        setToday={setToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {tasksForSelectedDate.length > 0 ? (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-16">
          {tasksForSelectedDate.map((task) => (
            <motion.div className="flex flex-col gap-8 cursor-pointer bg-background border border-border p-16 rounded-md z-10 relative">
              <div className="flex flex-row justify-between items-center">
                <motion.div
                  className={`flex items-center justify-center border border-border h-[20px] w-[20px] rounded-full cursor-pointer ${
                    task.isCompleted ? "bg-primary-600" : "bg-white"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {task.isCompleted && (
                    <Check className={"text-white"} size={12} />
                  )}
                </motion.div>
                <div className="rounded-md hover:bg-elevation p-8">
                  <Ellipsis className="text-text" size={18} />
                </div>
              </div>
              <div className="flex flex-col gap-0 cursor-pointer w-full h-full">
                <h1 className="text-md font-bold text-text max-w-full line-clamp-3">
                  {task.title}
                </h1>
                <p className="text-xs text-light line-clamp-2">
                  {task.description}
                </p>
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row gap-4 items-center">
                  <Clock className="text-text" size={14} />
                  <p className="text-sm text-text">Activity</p>
                </div>
                <p className="text-sm text-text">-</p>
                <div
                  className={`px-8 py-4 flex items-center justify-center border border-border rounded-md whitespace-nowrap ${
                    task.status === 0
                      ? "bg-border"
                      : task.status === 1
                      ? "bg-primary-600 "
                      : task.status === 2
                      ? "bg-success-600"
                      : "border"
                  }`}
                >
                  <p
                    className={`text-xs text-${
                      task.status === 0
                        ? "light"
                        : task.status === 1
                        ? "white"
                        : "white"
                    }`}
                  >
                    {task.status == 0
                      ? "To do"
                      : task.status == 1
                      ? "In Progress"
                      : "Done"}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-8 items-center">
                <div className="flex flex-row gap-4 items-center">
                  <CalendarDays className="text-text" size={14} />
                  <p className="text-sm text-text">Date</p>
                </div>
                <p className="text-sm text-text">-</p>
                <p className="text-sm text-light">
                  {new Date(task.dueDate).toLocaleDateString("en-UK", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex flex-row items-center gap-8">
                <div className="flex flex-row gap-4 items-center">
                  <Bookmark className="text-text" size={14} />
                  <p className="text-sm text-text">Label</p>
                </div>
                <p className="text-sm text-text">-</p>
                <div className="px-8 py-4 flex items-center justify-center border border-border bg-elevation rounded-md whitespace-nowrap">
                  <p className="text-xs text-text">
                    {task.label.toLowerCase()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <Image
            src={Empty}
            alt="Empty"
            width={0}
            height={0}
            className="w-full h-fit"
            draggable={false}
          />
          <h1 className="text-md text-light">
            No tasks for this day. Enjoy your time!
          </h1>
        </div>
      )}
    </div>
  );
}
