import React from "react";
import dayjs from "dayjs";
import { generateDate, months } from "./Calendar.jsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function OnlyViewCalendar({
  today,
  setToday,
  selectedDate,
  setSelectedDate,
}) {
  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const currentDate = dayjs();
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="z-50 h-[300px] w-full dark:bg-primary bg-white rounded-main border border-input-border dark:border-dark-input-border grid grid-cols-7 grid-rows-7 gap-12 p-12">
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
          className="col-span-1 text-light text-md flex items-center justify-center"
          key={day}
        >
          <h1>{day}</h1>
        </div>
      ))}
      {generateDate(today.month(), today.year()).map(
        ({ date, currentMonth }) => {
          const isToday = date.isSame(currentDate, "day");
          const isSelected = selectedDate.isSame(date, "day");
          return (
            <div
              className={`text-md ${
                currentMonth ? "text-primary dark:text-input-bg" : "text-light"
              } flex items-center justify-center text-md cursor-pointer rounded-full`}
              key={date.toString()}
              onClick={() => handleDateClick(date)}
            >
              <h1
                className={`h-32 w-32 flex items-center justify-center rounded-full
                  ${isToday ? "bg-dark-input-bg text-white" : ""}
                  ${isSelected && !isToday ? "bg-black text-white" : ""}
                  ${
                    !isToday && !isSelected
                      ? "hover:bg-primary hover:text-white"
                      : ""
                  }
                `}
              >
                {date.date()}
              </h1>
            </div>
          );
        }
      )}
    </div>
  );
}
