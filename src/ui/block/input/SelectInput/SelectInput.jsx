import React, { useState, useEffect } from "react";
import {
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CustomSelect = ({ onChange, defaultValue, options, variant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || 0);

  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);

  const handleSelectOption = (index) => {
    setSelectedOption(index);
    setIsOpen(false);
  };

  const getBackgroundColor = () => {
    if (variant === "primary") {
      return "bg-input-bg dark:bg-primary";
    } else if (variant === "component") {
      return "bg-input-bg dark:bg-dark-input-bg";
    } else {
      return "bg-input-bg";
    }
  };

  return (
    <motion.div className="flex flex-col gap-8 w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-16 pointer-events-none">
          <InformationCircleIcon className="w-[18px] h-[18px] text-light" />
        </div>
        <motion.div
          className={`border border-input-border dark:border-dark-input-border text-primary dark:text-input-bg text-sm rounded-[10px] focus:ring-primary focus:border-primary focus:outline-none block w-full ps-40 px-16 py-8 cursor-pointer ${getBackgroundColor()}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-sm">{options[selectedOption]}</h1>
          <motion.div className="absolute inset-y-0 z-50 end-0 flex items-center pe-16 pointer-events-none">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
              <ChevronRightIcon className="w-[18px] h-[18px] text-light" />
            </motion.div>
          </motion.div>
        </motion.div>
        {isOpen && (
          <motion.div
            className={`absolute top-[110%] left-0 w-full rounded-[10px] shadow-4 z-50 border border-input-border dark:border-dark-input-border ${getBackgroundColor()}`}
          >
            <div className="relative flex flex-col gap-0">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer text-sm text-primary dark:text-input-bg hover:bg-input-border dark:hover:bg-dark-input-border px-12 py-8"
                  onClick={() => handleSelectOption(index)}
                >
                  <h1 className="text-sm">{option}</h1>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CustomSelect;
