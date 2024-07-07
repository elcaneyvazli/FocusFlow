import React, { useState, useEffect } from "react";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import CalendarView from "./CalendarView";
import dayjs from "dayjs";

const DateInput = ({ onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs(defaultValue));

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedDate);
    }
  }, [selectedDate, onSelect]);

  const handleDateSelect = (date) => {
    const selectedDayjsDate = dayjs(date);
    setSelectedDate(selectedDayjsDate);
    setIsOpen(false);
    if (onSelect) {
      onSelect(selectedDayjsDate);
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
          <CalendarIcon className="w-[18px] h-[18px] text-light" />
        </div>
        <motion.div
          className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedDate ? (
            <h1 className="text-sm">{selectedDate.format("DD MMMM YYYY")}</h1>
          ) : (
            <h1 className="text-sm text-light">Select Date</h1>
          )}
          <motion.div className="absolute inset-y-0 z-50 end-0 flex items-center pe-16 pointer-events-none">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              <ChevronRightIcon className="w-[18px] h-[18px] text-light" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DateInput;
