import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function ActivityChart({ data }) {
  const [tooltip, setTooltip] = useState({
    show: false,
    x: 0,
    y: 0,
    content: null,
  });
  const chartRef = useRef(null);

  const weeks = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div
      className="w-full h-full flex flex-row gap-4 relative z-40"
      ref={chartRef}
    >
      {tooltip.show && (
        <div
          className="absolute bg-elevation border border-border rounded-md p-8 pointer-events-none shadow-lg z-50 flex flex-row gap-12 w-fit h-fit min-w-fit min-h-fit"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(-50%, -100%)",
            marginTop: "-8px",
          }}
        >
          <div className="min-w-[5px] w-[6px] h-[24px] min-h-full bg-primary-600 rounded-md"></div>

          <div className="flex flex-col gap-2 items-start">
            <h1 className="text-xs text-text leading-none whitespace-nowrap">
              Date: {tooltip.content.date}
            </h1>
            <p className="text-xs font-medium text-light leading-none whitespace-nowrap">
              Completed Tasks: {tooltip.content.completedTasks}
            </p>
          </div>
        </div>
      )}

      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-2">
          {week.map((day, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`w-16 h-16 rounded-sm transition-colors duration-300 ${
                day.desktop === 1
                  ? "bg-primary-600 hover:bg-primary-500"
                  : "bg-background border border-border hover:bg-elevation"
              }`}
              onMouseEnter={(e) => {
                const rect = e.target.getBoundingClientRect();
                const chartRect = chartRef.current.getBoundingClientRect();
                setTooltip({
                  show: true,
                  x: rect.left - chartRect.left + rect.width / 2,
                  y: rect.top - chartRect.top,
                  content: day,
                });
              }}
              onMouseLeave={() =>
                setTooltip({ show: false, x: 0, y: 0, content: null })
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}
