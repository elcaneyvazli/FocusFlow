"use client";
import { useTasks } from "@/services/task.services";
import React from "react";
import StatsCardContainer from "./StatsCardContainer";

export default function TaskCard() {
  const { tasks, isLoading } = useTasks();

  return <StatsCardContainer tasks={tasks} isLoading={isLoading} />;
}
