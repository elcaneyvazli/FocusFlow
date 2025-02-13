import dayjs from "dayjs";
import React from "react";
import TimeGrid from "../components/TimeGrid";

export default function WeekView({
  weekDays,
  selectedDate,
  handleDateClick,
  events,
  timeSlots,
  currentTime,
  currentView,
}) {
  return (
    <div className="overflow-auto h-[600px] bg-elevation rounded-md border border-border">
      <div className="flex flex-row gap-[1px] bg-elevation rounded-md">
        {weekDays.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className="bg-background rounded-md min-w-[156px] flex-1"
          >
            <div
              className={`py-8 text-center ${
                day.isSame(dayjs(), "day") ? "bg-elevation" : ""
              }`}
            >
              <div
                className={`text-sm font-medium ${
                  day.isSame(dayjs(), "day") ? "text-text" : "text-text"
                }`}
              >
                {day.format("ddd")}
              </div>
              <div
                className={`text-lg cursor-pointer hover:bg-elevation hover:text-text rounded-full w-32 h-32 flex items-center justify-center mx-auto ${
                  day.isSame(selectedDate, "day")
                    ? "bg-blue-500 text-white"
                    : "text-text"
                }`}
                onClick={() => handleDateClick(day)}
              >
                {day.format("D")}
              </div>
            </div>
            <div className="relative h-[1440px]">
              <TimeGrid
                day={day}
                events={events}
                currentView={currentView}
                currentTime={currentTime}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
