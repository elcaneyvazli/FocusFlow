"use client";
import React, { useMemo, useState } from "react";
import LineChart from "./LineChart";
import chartData from "@/library/chartdata";
import SelectInput from "@/ui/module/blocks/Input/SelectInput";
import { ChartLine, Presentation } from "lucide-react";
import { motion } from "motion/react";

export default function LineChartContainer() {
  const rangeOptions = ["Last 7 days", "Last 30 days", "Last 90 days"];
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(1);

  const filteredData = useMemo(() => {
    let daysToShow = 90;

    switch (selectedRangeIndex) {
      case 0:
        daysToShow = 7;
        break;
      case 1:
        daysToShow = 30;
        break;
      default:
        daysToShow = 90;
    }

    return chartData.slice(-daysToShow);
  }, [selectedRangeIndex]);

  const handleRangeChange = (index) => {
    setSelectedRangeIndex(index);
  };

  return (
    <motion.div
      className="min-h-[400px] h-[400px] max-h-[400px] w-full bg-elevation border border-border rounded-md flex flex-col gap-16 p-16"
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-12 lg:gap-0">
        <div className="flex flex-row items-center gap-12 w-full">
          <div className="p-8 bg-primary-100 border border-primary-600 rounded-md">
            <ChartLine className=" text-primary-600" size={24} />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-medium text-text leading-none">
              Pomodoro session time
            </h1>
            <p className="text-md font-normal text-light leading-none">
              Showing total spent time for the{" "}
              {rangeOptions[selectedRangeIndex].toLowerCase()}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-[50%]">
          <SelectInput
            data={rangeOptions}
            value={rangeOptions[selectedRangeIndex]}
            setValue={(value) => {
              const index = rangeOptions.indexOf(value);
              if (index !== -1) {
                setSelectedRangeIndex(index);
              }
            }}
            inputEnabled={false}
            type="solid"
            label="Select Range"
          />
        </div>
      </div>
      <LineChart chartData={filteredData} />
    </motion.div>
  );
}
