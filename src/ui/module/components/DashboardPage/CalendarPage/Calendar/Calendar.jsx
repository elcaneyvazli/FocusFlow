"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/ui/module/blocks/Button/Button";
import DayView from "./View/DayView";
import WeekView from "./View/WeekView";
import MonthView from "./View/MonthView";

const sampleEvents = [
  {
    id: 1,
    title: "Team Meeting",
    start: dayjs().hour(10).minute(0),
    end: dayjs().hour(11).minute(30),
    color: "bg-blue-500",
  },

  {
    id: 2,
    title: "Lunch Break",
    start: dayjs().hour(12).minute(0),
    end: dayjs().hour(13).minute(0),
    color: "bg-green-500",
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [currentView, setCurrentView] = useState("week");
  const [events] = useState(sampleEvents);
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const viewOptions = [
    { id: "day", label: "Day" },
    { id: "week", label: "Week" },
    { id: "month", label: "Month" },
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) =>
    dayjs().startOf("day").add(i, "hour")
  );

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    selectedDate.startOf("week").add(i, "day")
  );

  const monthDays = () => {
    const start = selectedDate.startOf("month").startOf("week");
    const end = selectedDate.endOf("month").endOf("week");
    const days = [];
    let day = start;
    while (day.isBefore(end)) {
      days.push(day);
      day = day.add(1, "day");
    }
    return days;
  };

  const navigate = (direction) => {
    if (currentView === "day") {
      setSelectedDate(selectedDate.add(direction, "day"));
    } else if (currentView === "week") {
      setSelectedDate(selectedDate.add(direction, "week"));
    } else {
      setSelectedDate(selectedDate.add(direction, "month"));
    }
  };

  const goToToday = () => {
    setSelectedDate(dayjs());
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setCurrentView("day");
  };

  const getEventStyle = (event, slotHeight = 60) => {
    const start = event.start;
    const end = event.end;
    const top = (start.hour() + start.minute() / 60) * slotHeight;
    const height = (end.diff(start, "minute") / 60) * slotHeight;
    return { top, height };
  };

  const renderTimeGrid = (day) => (
    <div className="relative h-full bg-background">
      {timeSlots.map((time) => (
        <div
          key={time.format("HH:mm")}
          className="absolute w-full h-fit border-t border-border"
          style={{ top: `${time.hour() * 60}px` }}
        >
          <span
            className={`text-xs ${
              currentView === "day" ? "text-text" : "text-text"
            } -mt-3 absolute left-8 top-24 ${
              currentView === "day" && time.hour() === currentTime.hour()
                ? "text-error-500 font-bold"
                : ""
            }`}
          >
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
              <p className="text-md"> {event.title}</p>
              <p className="text-xs">
                {event.start.format("HH:mm")} - {event.end.format("HH:mm")}
              </p>
            </div>
          );
        })}
      {day.isSame(dayjs(), "day") && (
        <>
          <div
            className="absolute left-0 right-0 h-0.5 bg-error-500 z-10 flex items-center"
            style={{
              top: `${(currentTime.hour() + currentTime.minute() / 60) * 60}px`,
            }}
          >
            <div
              className={`absolute  flex items-center gap-8 bg-gradient-to-b from-error-50 to-error-100 text-white px-12 py-2 text-xs border border-error-500 rounded-full ${
                currentView === "day" ? "-left-0" : "-left-48"
              }`}
            >
              <Clock className="text-error-500" size={12} />
              <p className="text-xs text-error-500 leadind-none">
                {currentTime.format("HH:mm")}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderDayView = () => (
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
        {renderTimeGrid(selectedDate)}
      </div>
    </div>
  );

  const renderWeekView = () => (
    <div className="overflow-auto h-[600px] bg-elevation rounded-md border border-border">
      <div className="grid grid-cols-7 gap-[1px] bg-elevation rounded-md">
        {weekDays.map((day) => (
          <div
            key={day.format("YYYY-MM-DD")}
            className="bg-background rounded-md"
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
            <div className="relative h-[1440px]">{renderTimeGrid(day)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-elevation border border-border rounded-md shadow-lg p-12 flex flex-col gap-12">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center gap-8">
          <h2 className="text-xl font-mediumn text-text"></h2>
          <Button
            onClick={() => navigate(-1)}
            icon={<ChevronLeft className="text-white" size={20} />}
            type="icon-primary"
            size="small"
          />
          <Button
            onClick={goToToday}
            type="primary"
            size="small"
            text={selectedDate.format(
              currentView === "month"
                ? "MMMM YYYY"
                : currentView === "week"
                ? "MMM D - " + selectedDate.endOf("week").format("MMM D, YYYY")
                : "dddd, MMMM D, YYYY"
            )}
          />
          <Button
            onClick={() => navigate(1)}
            icon={<ChevronRight className="text-white" size={20} />}
            type="icon-primary"
            size="small"
          />
        </div>
        <div className="flex bg-background rounded-md p-1">
          {viewOptions.map((view) => (
            <motion.button
              key={view.id}
              className={`relative px-32 py-6 flex flex-row items-center justify-center gap-4 rounded-md cursor-pointer whitespace-nowrap ${
                currentView === view.id ? "text-white" : "text-text"
              }`}
              onClick={() => setCurrentView(view.id)}
              whileTap={{ scale: 0.98 }}
            >
              <h1
                className={`hidden lg:block text-sm font-normal z-20 line-clamp-1  ${
                  currentView === view.id ? "text-white" : "text-text"
                } 
                }`}
              >
                {view.label}
              </h1>
              {currentView === view.id && (
                <motion.div
                  className="absolute inset-0 rounded-md bg-gradient-to-b from-primary-600 to-primary-700 z-10 border border-primary-400 outline outline-2 outline-primary-200"
                  layoutId="activeView"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentView === "day" && <DayView />}
          {currentView === "week" && <WeekView />}
          {currentView === "month" && (
            <MonthView
              selectedDate={selectedDate}
              events={events}
              handleDateClick={handleDateClick}
              monthDays={monthDays}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Calendar;
