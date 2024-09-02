"use client";

import ActivityChart from "@/ui/component/Dashboard/timeanalysis/ActivityChart/ActivityChart";
import BarChartUi from "@/ui/component/Dashboard/timeanalysis/BarChart/BarChart";
import ChartComponent from "@/ui/component/Dashboard/timeanalysis/LineChart/ChartComponent";
import PiePriChart from "@/ui/component/Dashboard/timeanalysis/PiePriChart/PiePriChart";
import Taskcard from "@/ui/component/Dashboard/timeanalysis/TaskCard/taskcard";
import { Pie } from "react-chartjs-2";

export default function TimeAnalysis() {
  return (
    <div className="flex flex-col gap-16 z-30">
      <Taskcard />
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-7">
          <ActivityChart />
        </div>
        <div className="col-span-5 bg-white dark:bg-dark-input-bg border border-input-border dark:border-dark-input-border rounded-main">
          <PiePriChart />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-7">
          <ChartComponent />
        </div>
        <div className="col-span-5">
          <BarChartUi />
        </div>
      </div>
    </div>
  );
}
