"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/ui/module/blocks/Button/Button";
import DayView from "./View/DayView";
import WeekView from "./View/WeekView";
import MonthView from "./View/MonthView";
import ViewSelector from "./components/ViewSelector";
import CalendarHeader from "./components/CalendarHeader";

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

  return (
    <div className="bg-elevation border border-border rounded-md shadow-lg p-12 flex flex-col gap-12">
      <div className="flex flex-col gap-12 md:flex-row justify-between items-center w-full">
        <CalendarHeader
          selectedDate={selectedDate}
          currentView={currentView}
          navigate={navigate}
          goToToday={goToToday}
        />
        <ViewSelector
          currentView={currentView}
          setCurrentView={setCurrentView}
          viewOptions={viewOptions}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          {currentView === "day" && (
            <DayView
              selectedDate={selectedDate}
              events={events}
              timeSlots={timeSlots}
              currentTime={currentTime}
              day={selectedDate}
              currentView={currentView}
            />
          )}
          {currentView === "week" && (
            <WeekView
              weekDays={weekDays}
              selectedDate={selectedDate}
              handleDateClick={handleDateClick}
              events={events}
              timeSlots={timeSlots}
              currentTime={currentTime}
              day={selectedDate}
              currentView={currentView}
            />
          )}
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
