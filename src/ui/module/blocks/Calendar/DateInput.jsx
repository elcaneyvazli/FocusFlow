import React, { useState, useEffect } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import CalendarView from "./CalendarView";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DateInput = ({ onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(
    defaultValue ? dayjs(defaultValue) : dayjs()
  );

  const handleDateSelect = (date) => {
    const newDate = dayjs(date);
    setSelectedDate(newDate);
    setIsOpen(false);
    if (onSelect) {
      onSelect(newDate);
    }
  };

  return (
    <motion.div className="flex flex-col gap-8 w-full relative">
      {isOpen && (
        <CalendarView
          today={today}
          setToday={setToday}
          selectedDate={selectedDate}
          setSelectedDate={handleDateSelect}
        />
      )}
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          <Calendar className="w-[18px] h-[18px] text-light" />
        </div>
        <motion.div
          className={`bg-elevation border border-border hover:border-primary-600 text-text text-sm rounded-md block w-full ps-40 px-16 py-8 cursor-pointer h-[36px] transition-all ${
            isOpen
              ? "border-primary-600 outline outline-2 outline-primary-200"
              : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedDate ? (
            <h1 className="text-sm">{selectedDate.format("DD MMMM YYYY")}</h1>
          ) : (
            <h1 className="text-sm text-light">Select Date</h1>
          )}
          <motion.div className="absolute inset-y-0 z-50 end-0 flex items-center pe-16 pointer-events-none">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              <ChevronRight className="w-[18px] h-[18px] text-light" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DateInput;
