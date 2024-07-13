import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const CircleGaugeChart = () => {
  const data = {
    datasets: [
      {
        data: [160, 262 - 160],
        backgroundColor: ["#184BFE", "#f9fafb"],
        borderWidth: 0,
        borderColor: "#1a1a1a",
        cutout: "85%",
        rotation: 0,
        circumference: 360,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: 0,
    circumference: 360,
  };

  return (
    <div className="relative flex items-center justify-center w-[250px] h-[250px] rounded-main">
      <Doughnut data={data} options={options} />
      <div className="absolute flex flex-col gap-0 items-center justify-center">
        <h1 className="text-4xl font-bold text-primary dark:text-input-bg">
          +56
        </h1>
      </div>
    </div>
  );
};

export default CircleGaugeChart;
