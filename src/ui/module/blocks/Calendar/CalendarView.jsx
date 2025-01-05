import React from "react";
import dayjs from "dayjs";
import { generateDate, months } from "./Calendar.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CalendarView({
  today,
  setToday,
  selectedDate,
  setSelectedDate,
}) {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const currentDate = dayjs();

  return (
    <div
      className={`z-50 h-[300px] md:h-[350px] w-full sm:w-≈[350px] md:w-[450px] mt-[10px] dark:bg-dark-input-bg bg-input-bg rounded-main border border-input-border dark:border-dark-input-border grid grid-cols-7 grid-rows-7 gap-12 p-12 absolute top-40`}
    >
      <div className="col-span-7 flex flex-row justify-between items-center p-12 row-span-1 text-lg border-b border-input-border dark:border-dark-input-border">
        <button
          className="h-16 w-16 text-light cursor-pointer"
          onClick={() => {
            setToday(today.subtract(1, "month"));
          }}
          type="button"
        >
          <ChevronLeftIcon className="text-light text-lg cursor-pointer" />
        </button>
        <button
          onClick={() => {
            setToday(currentDate);
          }}
          type="button"
        >
          <h1 className="text-lg text-light cursor-pointer">
            {months[today.month()]}, {today.year()}
          </h1>
        </button>

        <button
          className="h-16 w-16 text-light cursor-pointer"
          onClick={() => {
            setToday(today.add(1, "month"));
          }}
          type="button"
        >
          <ChevronRightIcon className="text-light text-lg" />
        </button>
      </div>
      {days.map((day) => (
        <div
          className="col-span-1 text-md flex items-center justify-center text-primary dark:text-input-bg"
          key={day}
        >
          <h1 className="text-primary dark:text-input-bg">{day}</h1>
        </div>
      ))}
      {generateDate(today.month(), today.year()).map(
        ({ date, currentMonth, today }) => (
          <div
            className={`text-md ${
              currentMonth ? "text-primary dark:text-input-bg" : "text-primary dark:text-input-bg"
            } flex items-center justify-center text-md cursor-pointer rounded-full`}
            key={date.toString()}
            onClick={() => setSelectedDate(date)}
          >
            <h1
              className={`h-32 w-32 flex items-center justify-center rounded-full hover:bg-primary hover:text-white ${
                today ? "bg-primary text-white" : "text-primary dark:text-input-bg"
              } ${
                selectedDate.isSame(date, "day") ? "bg-black text-white" : ""
              }`}
            >
              {date.date()}
            </h1>
          </div>
        )
      )}
    </div>
  );
}
