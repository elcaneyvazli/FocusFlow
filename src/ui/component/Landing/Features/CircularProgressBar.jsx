import React from "react";

const CircularProgressBar = ({ progress }) => {
  const radius = 85;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="rotate-[0deg]">
      <circle
        stroke="#9CA3AF"
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
        style={{ fill: "#184BFE", fontSize: "36px" }}
      >
        {`+${progress}`}
      </text>
    </svg>
  );
};

export default CircularProgressBar;
