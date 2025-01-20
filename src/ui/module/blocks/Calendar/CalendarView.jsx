import React from "react";
import dayjs from "dayjs";
import { generateDate, months } from "./Calendar.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      className={`z-50 h-[300px] md:h-[350px] w-full sm:w-≈[350px] md:w-[450px] mt-[10px] bg-elevation rounded-md border border-border grid grid-cols-7 grid-rows-7 gap-12 py-8 px-12 absolute top-40`}
    >
      <div className="col-span-7 flex flex-row justify-between items-center row-span-1 text-lg border-b border-border">
        <button
          className="text-light cursor-pointer"
          onClick={() => {
            setToday(today.subtract(1, "month"));
          }}
          type="button"
        >
          <ChevronLeft className="text-light cursor-pointer" size={16} />
        </button>
        <button
          onClick={() => {
            setToday(currentDate);
          }}
          type="button"
        >
          <h1 className="text-md text-light cursor-pointer">
            {months[today.month()]}, {today.year()}
          </h1>
        </button>

        <button
          className="text-light cursor-pointer"
          onClick={() => {
            setToday(today.add(1, "month"));
          }}
          type="button"
        >
          <ChevronRight className="text-light " size={16} />
        </button>
      </div>
      {days.map((day) => (
        <div
          className="col-span-1 text-md flex items-center justify-center text-text"
          key={day}
        >
          <h1 className="text-primary dark:text-input-bg">{day}</h1>
        </div>
      ))}
      {generateDate(today.month(), today.year()).map(
        ({ date, currentMonth, today }) => (
          <div
            className={`text-md ${
              currentMonth ? "text-text" : "text-light"
            } flex items-center justify-center text-md cursor-pointer rounded-full`}
            key={date.toString()}
            onClick={() => setSelectedDate(date)}
          >
            <h1
              className={`h-32 w-32 flex items-center justify-center rounded-full hover:bg-gradient-to-b from-primary-600 to-primary-700 hover:border border-primary-400 hover:text-white ${
                today
                  ? "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white"
                  : "text-text"
              } ${
                selectedDate.isSame(date, "day")
                  ? "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white"
                  : ""
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
