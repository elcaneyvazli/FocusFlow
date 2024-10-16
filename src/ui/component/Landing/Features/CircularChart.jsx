import { useAppSelector } from "@/redux/store";
import React, { useEffect, useRef } from "react";

const CircularChart = ({ progress }) => {
  const circleRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset;
  }, [progress]);

  const DarkMode = useAppSelector((state) => state.darkMode);

  console.log(DarkMode);

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg w-full max-w-sm">
      <h2 className="text-xl font-bold">Pomodoro</h2>
      <p className="text-gray-500">Keep track of the number of pomodoro</p>
      <div className="relative w-32 h-32 mt-4">
        <svg className="w-full h-full">
          <circle
            className={`${
              DarkMode ? "text-dark-input-border" : "text-input-border"
            }`}
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
          <circle
            ref={circleRef}
            className="text-blue-500"
            strokeWidth="10"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="52"
            cx="60"
            cy="60"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default CircularChart;
