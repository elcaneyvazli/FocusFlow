import React from "react";

const ActivityChart = () => {
  const getRandomProgress = () => Math.random() >= 0.5;

  const daysArray = Array.from({ length: 28 }, (_, index) => ({
    date: index + 1,
    progress: getRandomProgress(),
  }));

  return (
    <div className="grid grid-cols-7 gap-12 flex-wrap bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border p-16 rounded-main">
      {daysArray.map((day) => (
        <div
          key={day.date}
          className={`w-[50px] h-[50px] ${
            day.progress ? "bg-[#CB8BD0]" : "bg-input-border"
          } border border-input-border dark:border-dark-input-border hover:bg-primary hover:border-primary rounded-main flex items-center justify-center col-span-1`}
        ></div>
      ))}
    </div>
  );
};

export default ActivityChart;
