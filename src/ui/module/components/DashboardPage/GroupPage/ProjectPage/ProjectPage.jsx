"use client";
import { useParams } from "next/navigation";
import React from "react";
import { useProjectById } from "@/services/project.services";
import Spinner from "@/ui/module/blocks/Spinner/Spinner";
import TaskContainer from "./TaskContainer";
import TaskCard from "./TaskCard";
import { useDispatch } from "react-redux";
import { addToast } from "@/redux/features/ToastSlice/ToastSlice";

export default function ProjectPage() {
  const params = useParams();
  const dispatch = useDispatch();
  
  const groupId = params?.id?.toString();
  const projectId = params?.slug?.[0]?.toString();

  console.log('ProjectPage - Raw Params:', params);
  console.log('ProjectPage - Extracted IDs:', { groupId, projectId });

  const { project, isLoading, isError, mutate } = useProjectById(groupId, projectId);

  if (!groupId || !projectId) {
    console.error('ProjectPage - Missing IDs:', { groupId, projectId });
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
    <div className="flex flex-col gap-12 p-12 pb-32 md:pb-0 overflow-auto">
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
