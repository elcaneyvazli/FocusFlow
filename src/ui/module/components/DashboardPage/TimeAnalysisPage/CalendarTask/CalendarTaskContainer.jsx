"use client";
import WeeklyCalendar from "@/ui/module/blocks/Calendar/WeeklyCalendar";
import React, { useState } from "react";
import dayjs from "dayjs";
import Empty from "@/ui/assets/empty.svg";
import Image from "next/image";

export default function CalendarTaskContainer() {
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div className="col-span-4 bg-elevation border border-border w-full h-full min-h-full max-h-full text-text rounded-md p-8 overflow-hidden">
      <WeeklyCalendar
        today={today}
        setToday={setToday}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="h-full w-full flex flex-col gap-16 overflow-y-auto">
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={Empty}
            alt="Empty"
            width={0}
            height={0}
            layout="responsive"
            className="w-full h-fit"
          />
        </div>
      </div>
    </div>
  );
}
