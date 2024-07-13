import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const CircleGaugeChart = () => {
  const data = {
    datasets: [
      {
        data: [160, 262 - 160],
        backgroundColor: ["#184BFE", "#ffffff"],
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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: 0,
    circumference: 360,
  };

  return (
    <div className="absolute bottom-0 flex items-center justify-center">
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
