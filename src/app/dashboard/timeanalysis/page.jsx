"use client";
import ActivityChart from "@/ui/component/Dashboard/timeanalysis/ActivityChart/ActivityChart";
import LineChart from "@/ui/component/Dashboard/timeanalysis/LineChart/LineChart";
import ProgressChart from "@/ui/component/Dashboard/timeanalysis/ProgressChart/ProgressChart";
import TaskCalendar from "@/ui/component/Dashboard/timeanalysis/TaskCalendar/TaskCalendar";
import Taskcard from "@/ui/component/Dashboard/timeanalysis/TaskCard/taskcard";

export default function TimeAnalysis() {
  return (
    <div className="min-h-full h-full max-h-full grid grid-cols-12 gap-16 overflow-hidden">
      <div className="col-span-8 grid grid-cols-12 gap-16 overflow-y-auto h-[calc(100vh-112px)]">
        <div className="col-span-12 h-fit">
          <Taskcard />
        </div>
        <div className="col-span-12 h-[500px]">
          <LineChart />
        </div>
        <div className="col-span-6  h-[300px]">
          <ProgressChart />
        </div>
        <div className="col-span-6  h-[300px]">
          <ActivityChart />
        </div>
      </div>
      <div
        className="col-span-4 sticky top-0 right-0"
        style={{
          height: "calc(100vh - 112px)",
        }}
      >
        <TaskCalendar />
      </div>
    </div>
  );
}
