import React from "react";

const HalfCircularProgressBar = ({
  progress,
  strokeColor = "#184BFE",
  trailColor = "#9CA3AF",
}) => {
  const radius = 140;
  const stroke = 20;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * Math.PI;
  const strokeDashoffset = circumference - (57 / 100) * circumference;

  return (
    <svg
        // height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius}`}
      className="rotate-[0deg]"
    >
      <path
        d={`M${stroke},${radius} A${normalizedRadius},${normalizedRadius} 0 1,1 ${
          radius * 2 - stroke
        },${radius}`}
        fill="none"
        stroke={trailColor}
        strokeWidth={stroke}
      />
      <path
        d={`M${stroke},${radius} A${normalizedRadius},${normalizedRadius} 0 1,1 ${
          radius * 2 - stroke
        },${radius}`}
        fill="none"
        stroke={strokeColor}
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
      />
      <text
        x="50%"
        y="70%"
        textAnchor="middle"
        dy=".3em"
        className="text-xl text-gray-700 font-semibold"
        style={{ fill: "#184BFE", fontSize: "36px" }}
      >
        {progress}
      </text>
    </svg>
  );
};

export default HalfCircularProgressBar;
