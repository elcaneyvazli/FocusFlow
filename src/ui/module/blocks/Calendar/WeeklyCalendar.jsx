"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { generateWeekDates, months } from "./Calendar.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WeeklyCalendar({
  today: propToday,
  setToday,
  selectedDate: propSelectedDate,
  setSelectedDate,
}) {
  const [today, setLocalToday] = useState(dayjs());
  const [selectedDate, setLocalSelectedDate] = useState(dayjs());
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const currentDate = dayjs();

  useEffect(() => {
    if (propToday) {
      setLocalToday(propToday);
    }
  }, [propToday]);

  useEffect(() => {
    if (propSelectedDate) {
      setLocalSelectedDate(propSelectedDate);
    }
  }, [propSelectedDate]);

  return (
    <div className="h-fit w-full bg-background rounded-md border border-border grid grid-cols-7 gap-4 py-16 px-16">
      <div className="col-span-7 flex flex-row justify-between items-center text-lg border-b border-border mb-16 pb-8">
        <button
          className="=text-light cursor-pointer"
          onClick={() => {
            const newDate = today.subtract(1, "week");
            setLocalToday(newDate);
            setToday?.(newDate);
          }}
        >
          <ChevronLeft className="text-light cursor-pointer" size={16} />
        </button>
        <button
          onClick={() => {
            setLocalToday(currentDate);
            setToday?.(currentDate);
          }}
        >
          <h1 className="text-md text-light cursor-pointer">
            {months[today.month()]}, {today.year()}
          </h1>
        </button>
        <button
          className=" text-light cursor-pointer"
          onClick={() => {
            const newDate = today.add(1, "week");
            setLocalToday(newDate);
            setToday?.(newDate);
          }}
        >
          <ChevronRight className="text-light" size={16} />
        </button>
      </div>

      <div className="col-span-7 grid grid-cols-7 gap-12">
        {generateWeekDates(today).map(({ date, today }, index) => (
          <div key={date.toString()} className="text-center cursor-pointer">
            <div className="text-xs text-light mb-1">{days[index]}</div>
            <div
              onClick={() => {
                setLocalSelectedDate(date);
                setSelectedDate?.(date);
              }}
              className={`text-md h-[36px] rounded-md flex items-center justify-center hover:bg-gradient-to-b from-primary-600 to-primary-700 hover:border border-primary-400 hover:text-white transition-all${
                today
                  ? "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white hover:outline outline-2 outline-primary-200 "
                  : "text-text"
              } ${
                selectedDate && date && selectedDate.isSame(date, "day")
                  ? "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white hover:outline outline-2 outline-primary-200"
                  : ""
              }`}
            >
              {date.date()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
