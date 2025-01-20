import React from "react";
import CalendarTaskContainer from "./CalendarTask/CalendarTaskContainer";
import TaskAnalysisContainer from "./TaskAnalysis/TaskAnalysisContainer";

export default function TimeAnalysisPage() {
  return (
    <div className="p-12 grid grid-cols-12 gap-16 h-full max-h-full min-h-full overflow-hidden">
      <TaskAnalysisContainer />
      <CalendarTaskContainer />
    </div>
  );
}
