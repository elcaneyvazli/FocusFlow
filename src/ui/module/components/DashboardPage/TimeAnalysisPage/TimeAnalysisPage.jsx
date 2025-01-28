import React from "react";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import dynamic from "next/dynamic";
import TaskAnalysisContainer from "./TaskAnalysis/TaskAnalysisContainer";
const CalendarTaskContainer = dynamic(
  () => import("./CalendarTask/CalendarTaskContainer"),
  {
    loading: () => <Spinner />,
  }
);

export default function TimeAnalysisPage() {
  return (
    <div className="p-12 flex flex-col lg:grid grid-cols-12 gap-16 h-full max-h-full min-h-full overflow-y-auto lg:overflow-hidden pb-64 lg:pb-12">
      <TaskAnalysisContainer />
      <CalendarTaskContainer />
    </div>
  );
}
