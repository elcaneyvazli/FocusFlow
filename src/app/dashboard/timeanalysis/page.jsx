"use client";

import ActivityChart from "@/ui/component/Dashboard/timeanalysis/ActivityChart/ActivityChart";
import BarChartUi from "@/ui/component/Dashboard/timeanalysis/BarChart/BarChart";
import ChartComponent from "@/ui/component/Dashboard/timeanalysis/LineChart/ChartComponent";
import Taskcard from "@/ui/component/Dashboard/timeanalysis/TaskCard/taskcard";

export default function TimeAnalysis() {
  return (
    <div className="flex flex-col gap-16">
      <Taskcard />
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-5">
          <ActivityChart />
        </div>
        <div className="col-span-4">
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
