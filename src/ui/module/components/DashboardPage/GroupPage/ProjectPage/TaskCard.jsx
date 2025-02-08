import React from "react";
import StatsCardContainer from "../../TimeAnalysisPage/TaskAnalysis/StatsCard/StatsCardContainer";

export default function TaskCard({ tasks, isLoading }) {
  return <StatsCardContainer tasks={tasks} isLoading={isLoading} />;
}
