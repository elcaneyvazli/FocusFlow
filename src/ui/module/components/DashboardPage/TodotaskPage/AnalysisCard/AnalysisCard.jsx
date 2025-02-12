"use client";
import React from "react";
import StatsCardContainer from "../../TimeAnalysisPage/TaskAnalysis/StatsCard/StatsCardContainer";
import { useTasks } from "@/services/task.services";

export default function AnalysisCard({ tasks, isLoading }) {
  console.log("tasks", tasks);
  return <StatsCardContainer tasks={tasks} isLoading={isLoading} />;
}
