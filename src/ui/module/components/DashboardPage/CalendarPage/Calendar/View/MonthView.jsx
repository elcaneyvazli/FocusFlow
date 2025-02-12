import React from "react";
import dayjs from "dayjs";

export default function MonthView({
  selectedDate,
  events,
  handleDateClick,
  monthDays,
}) {
  return (
    <div className="grid grid-cols-7 gap-px bg-background rounded-md border border-border">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div
          key={day}
          className="bg-background p-12 text-center font-medium text-text rounded-t-md border-b  border-border"
        >
          {day}
        </div>
      ))}
      {monthDays().map((day) => (
        <div
          key={day.format("YYYY-MM-DD")}
          className={`bg-background min-h-[100px] text-text border-b border-l border-border p-12 flex flex-col gap-4 ${
            day.isSame(dayjs(), "day") ? "bg-elevation" : ""
          }`}
          onClick={() => handleDateClick(day)}
        >
          <p
            className={`text-right ${
              day.isSame(selectedDate, "day") ? "text-text" : ""
            } ${!day.isSame(selectedDate, "month") ? "text-light" : ""}`}
          >
            {day.format("D")}
          </p>
          <div className="flex flex-row flex-wrap md:flex-nowrap md:flex-col gap-4">
            {events
              .filter((event) => event.start.isSame(day, "day"))
              .map((event) => (
                <div
                  key={event.id}
                  className={`${event.color} w-[12px] h-[12px] md:w-full md:h-full  px-8 py-4 rounded-[2px] md:rounded-md truncate`}
                >
                  <p className="text-xs text-white hidden md:flex">
                    {" "}
                    {event.title}
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
