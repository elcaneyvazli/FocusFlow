import React from "react";
import dayjs from "dayjs";
import { generateDate, months } from "./Calendar.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="z-50 h-[350px] w-full bg-background rounded-md border border-border grid grid-cols-7 grid-rows-7 gap-12 px-12 py-8">
      <div className="col-span-7 flex flex-row justify-between items-center text-lg border-b border-border">
        <button
          onClick={() => {
            setToday(today.subtract(1, "month"));
          }}
          type="button"
        >
          <ChevronLeft className="text-light" strokeWidth={2} size={18} />
        </button>
        <h1
          className="text-lg text-light cursor-pointer"
          onClick={() => {
            setToday(currentDate);
          }}
        >
          {months[today.month()]}, {today.year()}
        </h1>
        <button
          onClick={() => {
            setToday(today.add(1, "month"));
          }}
          type="button"
        >
          <ChevronRight className="text-light" strokeWidth={2} size={18} />
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
                currentMonth ? "text-text" : "text-light"
              } flex items-center justify-center text-md cursor-pointer rounded-full`}
              key={date.toString()}
              onClick={() => handleDateClick(date)}
            >
              <h1
                className={`h-32 w-32 flex items-center justify-center rounded-full
                  ${
                    isToday
                      ? "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white"
                      : ""
                  }
                  ${
                    isSelected && !isToday
                      ? "bg-gradient-to-b from-primary-600 to-primary-700 border border-primary-400 text-white"
                      : ""
                  }
                  ${
                    !isToday && !isSelected
                      ? "hover:bg-gradient-to-b from-primary-600 to-primary-700 hover:border border-primary-400 hover:text-white"
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
