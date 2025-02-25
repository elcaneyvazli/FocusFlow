"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useProjectById } from "@/services/project.services";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import TaskContainer from "./TaskContainer";
import TaskCard from "./TaskCard";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";
import PomodoroContainer from "../../TodotaskPage/Pomodoro/PomodoroContainer";

export default function ProjectPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const groupId = params?.id?.toString();
  const projectId = params?.slug?.[0]?.toString();

  const { project, isLoading, isError, mutate } = useProjectById(
    groupId,
    projectId
  );

  if (!groupId || !projectId) {
    console.error("ProjectPage - Missing IDs:", { groupId, projectId });
    dispatch(
      addToast({
        title: "Error",
        message: "Invalid URL parameters",
        variant: "error",
      })
    );
    return null;
  }

  if (isLoading) return <Spinner />;
  if (isError) {
    dispatch(
      addToast({
        title: "Error",
        message: "Failed to load project data",
        variant: "error",
      })
    );
    return null;
  }

  return (
    <div className="flex flex-col gap-12 px-12 pt-12 pb-72 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background">
      <PomodoroContainer />
      <TaskCard
        project={project.taskInformation}
        isLoading={isLoading}
        isError={isError}
      />
      <TaskContainer
        project={project}
        groupId={groupId}
        projectId={projectId}
        mutate={mutate}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
