import React from "react";
import TimeGrid from "../components/TimeGrid";

export default function DayView({
  selectedDate,
  renderTimeGrid,
  timeSlots,
  currentTime,
  events,
  day,
  currentView,
}) {
  return (
    <div className="overflow-auto h-[600px] bg-background rounded-md border border-border">
      <div className="relative">
        <div className="absolute -left-20 top-0 bottom-0 w-16 flex flex-col border-r border-border">
          {timeSlots.map((time) => (
            <div
              key={time.format("HH:mm")}
              className={`h-[60px] flex items-center justify-end pr-4 text-sm ${
                time.hour() === currentTime.hour()
                  ? "text-red-500 font-bold"
                  : "text-gray-700"
              }`}
            >
              {time.format("HH:00")}
            </div>
          ))}
        </div>
        <TimeGrid
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          currentTime={currentTime}
          events={events}
          day={selectedDate}
          currentView={currentView}
        />
      </div>
    </div>
  );
}
