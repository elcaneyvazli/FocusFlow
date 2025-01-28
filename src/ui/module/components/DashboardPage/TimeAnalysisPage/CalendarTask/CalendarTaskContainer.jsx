"use client";
import WeeklyCalendar from "@/ui/module/blocks/Calendar/WeeklyCalendar";
import React, { useState } from "react";
import dayjs from "dayjs";
import Empty from "@/ui/assets/empty.svg";
import Image from "next/image";
import { useTasks } from "@/services/task.services";

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
    <div className="col-span-12 lg:col-span-4 bg-elevation border border-border w-full min-h-[800px] lg:min-h-0 h-auto lg:h-full max-h-full text-text rounded-md p-8 overflow-hidden flex flex-col gap-16">
      <WeeklyCalendar
        today={today}
        setToday={setToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {tasksForSelectedDate.length > 0 ? (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-16">
          {tasksForSelectedDate.map((task) => (
            <CalendarTaskContainer key={task.id} task={task} mutate={mutate} />
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
