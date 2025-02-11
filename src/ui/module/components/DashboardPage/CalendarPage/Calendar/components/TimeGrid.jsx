import React from "react";
import { Clock } from "lucide-react";
import dayjs from "dayjs";

const TimeGrid = ({ day, events, currentView, currentTime, timeSlots }) => {
  const getEventStyle = (event, slotHeight = 60) => {
    const start = event.start;
    const end = event.end;
    const top = (start.hour() + start.minute() / 60) * slotHeight;
    const height = (end.diff(start, "minute") / 60) * slotHeight;
    return { top, height };
  };

  return (
    <div className="relative h-full bg-background">
      {timeSlots.map((time) => (
        <div
          key={time.format("HH:mm")}
          className="absolute w-full h-fit border-t border-border"
          style={{ top: `${time.hour() * 60}px` }}
        >
          <span className={`text-xs ${currentView === "day" ? "text-text" : "text-text"} -mt-3 absolute left-8 top-24`}>
            {time.format("HH:00")}
          </span>
        </div>
      ))}
      {events
        .filter((event) => dayjs(event.start).isSame(day, "day"))
        .map((event) => {
          const { top, height } = getEventStyle(event);
          return (
            <div
              key={event.id}
              className={`absolute left-0 right-0 p-2 rounded ${event.color} text-white text-sm flex flex-col gap-0 p-4`}
              style={{ top: `${top}px`, height: `${height}px` }}
            >
              <p className="text-md">{event.title}</p>
              <p className="text-xs">
                {event.start.format("HH:mm")} - {event.end.format("HH:mm")}
              </p>
            </div>
          );
        })}
      {day.isSame(dayjs(), "day") && (
        <div
          className="absolute left-0 right-0 h-0.5 bg-error-500 z-10 flex items-center"
          style={{
            top: `${(currentTime.hour() + currentTime.minute() / 60) * 60}px`,
          }}
        >
          <div
            className={`absolute flex items-center gap-8 bg-gradient-to-b from-error-50 to-error-100 text-white px-12 py-2 text-xs border border-error-500 rounded-full ${
              currentView === "day" ? "-left-0" : "-left-48"
            }`}
          >
            <Clock className="text-error-500" size={12} />
            <p className="text-xs text-error-500 leadind-none">
              {currentTime.format("HH:mm")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeGrid;
