import React from "react";
import CalendarTaskContainer from "./CalendarTask/CalendarTaskContainer";
import TaskAnalysisContainer from "./TaskAnalysis/TaskAnalysisContainer";

export default function TimeAnalysisPage() {
  return (
    <div className="p-12 flex flex-col lg:grid grid-cols-12 gap-16 h-full max-h-full min-h-full overflow-y-auto lg:overflow-hidden pb-64 lg:pb-12">
      <TaskAnalysisContainer />
      <CalendarTaskContainer />
    </div>
  );
}
