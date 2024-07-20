import React from "react";
import dayjs from "dayjs";

const ActivityChart = () => {
  const daysInMonth = 28;
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );
  return (
    <div className="grid grid-cols-7 gap-8 flex-wrap bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 rounded-main">
      {daysArray.map((day) => (
        <div
          key={day}
          className="w-[40px] h-[40px] bg-gray-300 border border-gray-200 hover:bg-primary hover:border-primary rounded-main flex items-center justify-center col-span-1"
        ></div>
      ))}
    </div>
  );
};

export default ActivityChart;
