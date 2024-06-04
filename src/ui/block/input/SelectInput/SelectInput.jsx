import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CustomSelect = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <motion.div className="flex flex-col gap-8 w-full">
      <h1 className="text-sm font-medium">Priority</h1>
      <div className="relative w-full">
        <div className="flex flex-row justify-between items-center px-16">
          <div className="flex flex-row items-center gap-16"></div>
        </div>
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          <InformationCircleIcon className="w-[18px] h-[18px] text-light" />
        </div>
        <motion.div
          className="bg-input-bg dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-12 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption || "Select Priority"}
          <motion.div className="absolute inset-y-0 z-40 end-0 flex items-center pe-16 pointer-events-none">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              <ChevronRightIcon className="w-[18px] h-[18px] text-light" />
            </motion.div>
          </motion.div>
        </motion.div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-[10px] shadow-lg max-h-60 overflow-auto flex flex-col gap-8">
            {options.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer text-sm text-primary dark:text-input-bg hover:bg-input-border dark:hover:bg-dark-input-border px-12 py-8"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomSelect;
