"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(dayjs());

  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    dayjs().startOf("day").add(i, "hour").format("HH:mm")
  );

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    currentWeek.startOf("week").add(i, "day")
  );

  const events = [
    {
      title: "Meeting",
      start: dayjs().hour(10),
      end: dayjs().hour(11),
      day: dayjs(),
    },
  ];

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek.subtract(1, "week"));
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek.add(1, "week"));
  };

  return (
    <div className="h-screen flex flex-col p-4">
      {/* Calendar Header */}
      <div className="flex items-center mb-4">
        <button
          onClick={handlePreviousWeek}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="mx-4 text-lg font-semibold">
          {currentWeek.format("MMMM YYYY")}
        </h2>
        <button
          onClick={handleNextWeek}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="flex flex-1 overflow-auto">
        {/* Time Column */}
        <div className="w-16 pt-20">
          {timeSlots.map((time) => (
            <div key={time} className="h-15 border-b border-gray-200">
              <span className="text-xs text-gray-500">{time}</span>
            </div>
          ))}
        </div>

        {/* Days Columns */}
        <div className="flex flex-1">
          {weekDays.map((day) => (
            <div
              key={day.format("YYYY-MM-DD")}
              className="flex-1 border-l border-gray-200"
            >
              {/* Day Header */}
              <div className="h-20 p-2 text-center border-b border-gray-200 sticky top-0 bg-white">
                <p className="text-sm font-medium">{day.format("ddd")}</p>
                <p className="text-lg">{day.format("D")}</p>
              </div>

              {/* Time Slots */}
              <div>
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="h-15 border-b border-gray-200 relative"
                  >
                    {events
                      .filter(
                        (event) =>
                          event.day.format("YYYY-MM-DD") ===
                            day.format("YYYY-MM-DD") &&
                          event.start.format("HH") === time.split(":")[0]
                      )
                      .map((event, index) => (
                        <div
                          key={index}
                          className="absolute w-[95%] bg-blue-100 p-2 rounded-md shadow-sm overflow-hidden"
                          style={{
                            height: `${
                              event.end.diff(event.start, "hour") * 60
                            }px`,
                          }}
                        >
                          <p className="text-xs font-medium text-blue-800">
                            {event.title}
                          </p>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
