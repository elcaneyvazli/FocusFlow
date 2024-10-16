import { useAppSelector } from "@/redux/store";
import React from "react";

const CircularProgressBar = ({ progress }) => {
  const radius = 85;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const DarkMode = useAppSelector((state) => state.darkMode.darkMode);

  return (
    <svg height={radius * 2} width={radius * 2} className="rotate-[0deg]">
      <circle
        stroke={DarkMode ? "#ffffff" : "#232426"}
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#184BFE"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ strokeDasharray: circumference, strokeDashoffset }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-xl text-primary dark:text-input-bg font-semibold"
        style={{ fill: DarkMode ? "#ffffff" : "#232426", fontSize: "36px" }}
      >
        {`+${progress}`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
