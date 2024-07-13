import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const GaugeChart = () => {
  const data = {
    datasets: [
      {
        data: [180, 240 - 180],
        backgroundColor: ["#184BFE", "#ffffff"],
        borderWidth: 0,
        borderColor: "#E5E6EB",
        cutout: "85%",
        rotation: -90,
        circumference: 180,
      },
    ],
  };

  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: -90,
    circumference: 180,
  };

  return (
    <div className="relative flex items-center justify-center w-full h-fit rounded-main">
      <Doughnut data={data} options={options} />
      <div className="absolute bottom-0 flex flex-col gap-0 h-full items-center justify-center">
        <h1 className="text-[48px] font-bold text-primary dark:text-input-bg">
          18:26
        </h1>
      </div>
    </div>
  );
};

export default GaugeChart;
